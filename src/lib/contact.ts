import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { KIND_LABEL, type ContactPayload } from "./proposals";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  organisation: z.string().trim().max(200).default(""),
  kind: z.enum([
    "new-country",
    "update-representative",
    "update-organisation",
    "other",
  ]),
  change: z.string().trim().min(1).max(5000),
  reach: z
    .string()
    .trim()
    .max(320)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "Invalid email",
    })
    .default(""),
});

function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

async function deliver(payload: ContactPayload): Promise<{ channel: string }> {
  const webhook = env("CONTACT_WEBHOOK_URL");
  const coordinator = env("COORDINATOR_EMAIL");
  const resendKey = env("RESEND_API_KEY");

  const body = {
    ...payload,
    kindLabel: KIND_LABEL[payload.kind],
    submittedAt: new Date().toISOString(),
    source: "lci-community-contact",
  };

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Webhook responded ${res.status}`);
    }
    return { channel: "webhook" };
  }

  if (resendKey && coordinator) {
    const from =
      env("CONTACT_FROM_EMAIL") ?? "LCI Community <onboarding@resend.dev>";
    const text = [
      `Kind: ${KIND_LABEL[payload.kind]}`,
      `From: ${payload.name}`,
      payload.organisation ? `Organisation: ${payload.organisation}` : null,
      payload.reach ? `Reply-to: ${payload.reach}` : null,
      "",
      payload.change,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [coordinator],
        reply_to: payload.reach || undefined,
        subject: `[LCI Community] ${KIND_LABEL[payload.kind]} — ${payload.name}`,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Resend responded ${res.status}${detail ? `: ${detail}` : ""}`,
      );
    }
    return { channel: "email" };
  }

  const { appendFile, mkdir } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    join(dir, "contact-submissions.jsonl"),
    `${JSON.stringify(body)}\n`,
    "utf8",
  );
  console.info(
    "[contact] stored locally (.data/contact-submissions.jsonl). Set CONTACT_WEBHOOK_URL or RESEND_API_KEY + COORDINATOR_EMAIL to deliver.",
  );
  return { channel: "local" };
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<{ ok: true; channel: string }> => {
    const channel = await deliver(data);
    return { ok: true, ...channel };
  });

/** Public coordinator address for a mailto fallback (optional). */
export const getCoordinatorEmail = createServerFn({ method: "GET" }).handler(
  async (): Promise<string | null> => env("COORDINATOR_EMAIL") ?? null,
);
