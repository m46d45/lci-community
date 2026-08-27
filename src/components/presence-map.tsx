import { Minus, Plus, RotateCcw } from "lucide-react";
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import worldSvg from "@/assets/world.svg?raw";
import { COUNTRIES, type CountryRow } from "@/lib/directory";

type Props = {
  selectedIso?: string | null;
  onSelect?: (row: CountryRow) => void;
};

const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso.toLowerCase(), c]));

const WORLD_SVG = worldSvg
  .replace(/<title>[\s\S]*?<\/title>/i, "")
  .replace(/<desc>[\s\S]*?<\/desc>/i, "");

function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function countryId(el: Element): string {
  return (el.id || el.closest("g[id]")?.id || "").toLowerCase();
}

function nodesFor(svg: SVGSVGElement, iso: string): NodeListOf<Element> {
  const id = iso.toLowerCase();
  return svg.querySelectorAll(`path#${id}, g#${id} path, g[id="${id}"] path`);
}

function paint(svg: SVGSVGElement, selectedIso?: string | null) {
  const land = token("--color-surface") || "#ffffff";
  const listed = token("--color-accent-2") || "#2b63a6";
  const gap = token("--color-mark") || "#7d8fa3";
  const stroke = token("--color-line-strong") || "#b4c1d1";

  svg.querySelectorAll("path").forEach((node) => {
    const el = node as SVGPathElement;
    el.style.fill = land;
    el.style.fillOpacity = "0.95";
    el.style.stroke = stroke;
    el.style.strokeWidth = "0.5";
    el.style.strokeOpacity = "0.7";
    el.classList.remove("on");
    el.removeAttribute("data-listed");
    el.removeAttribute("data-gap");
  });

  BY_ISO.forEach((row, id) => {
    const isGap = row.status === "gap" || row.status === "incomplete";
    nodesFor(svg, id).forEach((node) => {
      const el = node as SVGPathElement;
      el.style.fill = isGap ? gap : listed;
      el.style.fillOpacity = isGap ? "0.78" : "0.92";
      el.style.cursor = "pointer";
      if (isGap) el.setAttribute("data-gap", "");
      else el.setAttribute("data-listed", "");
      if (!el.querySelector("title")) {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "title");
        t.textContent =
          row.organisation === "—"
            ? row.country
            : `${row.country} · ${row.organisation}`;
        el.insertBefore(t, el.firstChild);
      }
    });
  });

  if (selectedIso) {
    nodesFor(svg, selectedIso).forEach((p) => p.classList.add("on"));
  }
}

export function PresenceMap({ selectedIso, onSelect }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [ready, setReady] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<CountryRow | null>(null);

  const shown = selectedIso
    ? (BY_ISO.get(selectedIso.toLowerCase()) ?? active)
    : active;

  const caption = useMemo(() => {
    if (!shown) return null;
    return shown.organisation === "—"
      ? shown.country
      : `${shown.country} · ${shown.organisation}`;
  }, [shown]);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    box.innerHTML = WORLD_SVG;
    const svg = box.querySelector("svg");
    if (!svg) {
      box.textContent = "Map could not be loaded.";
      return;
    }

    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("aria-label", "World map of national institutes");
    svgRef.current = svg;
    paint(svg, null);

    const onClick = (e: Event) => {
      const path = (e.target as Element).closest("path");
      if (!path) return;
      const row = BY_ISO.get(countryId(path));
      if (!row) return;
      setActive(row);
      onSelectRef.current?.(row);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) =>
        e.deltaY < 0
          ? Math.min(4, z * 1.12)
          : Math.max(1, z / 1.12),
      );
    };

    svg.addEventListener("click", onClick);
    box.addEventListener("wheel", onWheel, { passive: false });
    setReady(true);

    return () => {
      svg.removeEventListener("click", onClick);
      box.removeEventListener("wheel", onWheel);
      svgRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!ready || !svgRef.current) return;
    paint(svgRef.current, selectedIso ?? shown?.iso ?? null);
  }, [selectedIso, shown?.iso, ready]);

  useLayoutEffect(() => {
    if (svgRef.current) svgRef.current.style.transform = `scale(${zoom})`;
  }, [zoom, ready]);

  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex items-end justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <p className="font-display text-lg text-ink sm:text-xl">Institutes</p>
        {caption ? (
          <p className="truncate text-xs text-muted sm:text-sm">{caption}</p>
        ) : (
          <p className="hidden text-xs text-muted sm:block">
            Click a highlighted country
          </p>
        )}
      </div>

      <div className="world-map-frame mx-4 mt-3 sm:mx-5">
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <ZoomBtn
            label="Zoom in"
            onClick={() => setZoom((z) => Math.min(4, z * 1.35))}
          >
            <Plus className="size-4" />
          </ZoomBtn>
          <ZoomBtn
            label="Zoom out"
            onClick={() => setZoom((z) => Math.max(1, z / 1.35))}
          >
            <Minus className="size-4" />
          </ZoomBtn>
          <ZoomBtn label="Reset" onClick={() => setZoom(1)}>
            <RotateCcw className="size-3.5" />
          </ZoomBtn>
        </div>
        <div ref={boxRef} className="world-map-svg" />
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-xs text-muted sm:px-5">
        <li className="flex items-center gap-2">
          <i className="size-2.5 rounded-full bg-accent-2" />
          On the directory
        </li>
        <li className="flex items-center gap-2">
          <i className="size-2.5 rounded-full bg-mark" />
          To be confirmed
        </li>
      </ul>
    </div>
  );
}

function ZoomBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-sm bg-surface text-ink shadow-[0_0_0_1px_var(--color-line)] hover:bg-surface-2"
    >
      {children}
    </button>
  );
}
