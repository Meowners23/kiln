import { stopToCss } from "@/lib/hypr/color";
import type { HyprConfig } from "@/lib/hypr/types";

function Win({
  title,
  active,
  config,
}: {
  title: string;
  active?: boolean;
  config: HyprConfig;
}) {
  const { general: g, decoration: d } = config;
  const gradient = `linear-gradient(${g.activeAngle}deg, ${stopToCss(g.active[0])}, ${stopToCss(g.active[1])})`;
  const inactive = stopToCss(g.inactive);
  const fill = "linear-gradient(var(--color-elevated), var(--color-elevated)) padding-box";
  const edge = active ? gradient : `linear-gradient(${inactive}, ${inactive})`;
  const shadow = d.shadowEnabled
    ? `0 ${Math.max(6, d.shadowRange)}px ${Math.max(10, d.shadowRange * 3)}px ${stopToCss(d.shadow)}`
    : "none";

  return (
    <div
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
      style={{
        borderRadius: d.rounding,
        opacity: active ? d.activeOpacity : d.inactiveOpacity,
        boxShadow: shadow,
        border: `${g.borderSize}px solid transparent`,
        background: `${fill}, ${edge} border-box`,
      }}
    >
      <div
        className="flex h-6 shrink-0 items-center gap-1.5 px-2"
        style={{ background: "color-mix(in oklab, var(--color-fg) 6%, transparent)" }}
      >
        <span
          className="size-1.5 shrink-0 rounded-full"
          style={{ background: active ? stopToCss(g.active[0]) : "var(--color-faint)" }}
        />
        <span className="truncate font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="flex flex-1 items-end p-2">
        <span className="font-mono text-xs text-faint">{active ? "focused" : "idle"}</span>
      </div>
    </div>
  );
}

export function DesktopPreview({ config }: { config: HyprConfig }) {
  const { general: g, decoration: d, programs } = config;
  const wallpaper = {
    backgroundColor: "var(--color-inset)",
    backgroundImage: `radial-gradient(120% 90% at 0% 0%, ${stopToCss(g.active[0], 0.55)}, transparent 58%), radial-gradient(90% 80% at 100% 100%, ${stopToCss(g.active[1], 0.4)}, transparent 52%)`,
  };
  const pad = Math.min(16, Math.round(g.gapsOut * 0.6));
  const gap = Math.min(12, Math.round(g.gapsIn * 0.7));
  const term = programs.terminal || "terminal";
  const files = programs.fileManager || "files";

  return (
    <div className="p-4 pb-2">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-fg">Desktop</p>
        <p className="font-mono text-xs text-faint">
          {g.layout} · {g.gapsIn}/{g.gapsOut}
        </p>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-line" style={wallpaper}>
        <div
          className="flex h-8 items-center justify-between px-2"
          style={{ background: "color-mix(in oklab, var(--color-bg) 70%, transparent)" }}
        >
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((workspace) => (
              <span
                key={workspace}
                className={`grid size-5 place-items-center rounded-sm font-mono text-xs ${
                  workspace === 1 ? "bg-accent text-accent-ink" : "text-muted"
                }`}
              >
                {workspace}
              </span>
            ))}
          </div>
          <span className="truncate font-mono text-xs text-muted">{config.riceName || "kiln"}</span>
        </div>
        <div className="h-48 overflow-hidden sm:h-64" style={{ padding: pad }}>
          {g.layout === "master" ? (
            <div className="grid h-full grid-cols-5" style={{ gap }}>
              <div className="col-span-3 flex min-w-0">
                <Win active title={term} config={config} />
              </div>
              <div className="col-span-2 flex min-w-0 flex-col" style={{ gap }}>
                <Win title="Firefox" config={config} />
                <Win title={files} config={config} />
              </div>
            </div>
          ) : null}
          {g.layout === "scrolling" ? (
            <div className="grid h-full grid-cols-3" style={{ gap }}>
              <Win active title={term} config={config} />
              <Win title="Firefox" config={config} />
              <Win title={files} config={config} />
            </div>
          ) : null}
          {g.layout === "monocle" ? (
            <div className="flex h-full">
              <Win active title={term} config={config} />
            </div>
          ) : null}
          {g.layout === "dwindle" ? (
            <div className="grid h-full grid-cols-5" style={{ gap }}>
              <div className="col-span-3 flex min-w-0">
                <Win active title={term} config={config} />
              </div>
              <div className="col-span-2 flex min-w-0 flex-col" style={{ gap }}>
                <Win title="Firefox" config={config} />
                <Win title={files} config={config} />
              </div>
            </div>
          ) : null}
        </div>
        {d.blurEnabled ? (
          <div
            className="absolute right-3 bottom-3 max-w-44 border border-line px-3 py-2"
            style={{
              borderRadius: Math.max(4, Math.min(d.rounding, 16)),
              background: "color-mix(in oklab, var(--color-inset) 42%, transparent)",
              backdropFilter: `blur(${Math.max(4, d.blurSize * Math.max(1, d.blurPasses) * 2)}px)`,
            }}
          >
            <p className="text-xs text-fg">notification</p>
            <p className="font-mono text-xs text-muted">
              blur {d.blurSize} × {d.blurPasses}
            </p>
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-faint">
        Preview only — gaps, radius, border, opacity, and blur. Not a running compositor.
      </p>
    </div>
  );
}
