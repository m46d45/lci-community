import { twMerge } from "tailwind-merge";

export function cn(
  ...inputs: Array<string | undefined | null | false | 0>
): string {
  return twMerge(inputs.filter(Boolean).join(" "));
}
