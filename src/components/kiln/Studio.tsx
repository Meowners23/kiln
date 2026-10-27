import { useEffect, useMemo, useState } from "react";
import {
  AppWindow,
  Copy,
  Download,
  Keyboard,
  KeyRound,
  Power,
  Settings2,
  SwatchBook,
} from "lucide-react";
import { DesktopPreview } from "@/components/kiln/DesktopPreview";
import { LuaView } from "@/components/kiln/LuaView";
import { BindsPanel, InputPanel, LookPanel, RulesPanel, StartupPanel, SystemPanel } from "@/components/kiln/panels";
import { emitLua } from "@/lib/hypr/emit";
import { useKiln } from "@/lib/hypr/store";
import type { SectionId } from "@/lib/hypr/types";

const SECTIONS: { id: SectionId; label: string; hint: string; icon: typeof SwatchBook }[] = [
  { id: "look", label: "Look", hint: "Gaps, color, blur", icon: SwatchBook },
  { id: "input", label: "Input", hint: "Keys, mouse, gestures", icon: Keyboard },
  { id: "binds", label: "Binds", hint: "Mods and dispatchers", icon: KeyRound },
  { id: "rules", label: "Rules", hint: "Window matchers", icon: AppWindow },
  { id: "startup", label: "Startup", hint: "Monitors and apps", icon: Power },
  { id: "system", label: "System", hint: "Misc and extra Lua", icon: Settings2 },
];

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function Studio() {
  const config = useKiln((state) => state.config);
  const section = useKiln((state) => state.section);
  const setSection = useKiln((state) => state.setSection);
  const patch = useKiln((state) => state.patch);
  const [notice, setNotice] = useState("");
  const lua = useMemo(() => emitLua(config), [config]);

  useEffect(() => {
    void useKiln.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 1600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  async function copyLua() {
    const ok = await writeClipboard(lua);
    setNotice(ok ? "Copied" : "Copy blocked");
  }

  function downloadLua() {
    const blob = new Blob([lua], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hyprland.lua";
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Downloaded");
  }

  return (
    <div className="kiln flex min-h-screen flex-col bg-bg text-fg lg:h-screen">
      <header className="flex shrink-0 flex-wrap items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md bg-accent font-mono text-sm font-semibold text-accent-ink" aria-hidden="true">
            K
          </span>
          <div>
            <h1 className="text-base font-semibold tracking-tight">Kiln</h1>
            <p className="font-mono text-xs text-faint">hyprland.lua · 0.55+</p>
          </div>
        </div>
        <label className="min-w-0 flex-1 sm:max-w-xs">
          <span className="sr-only">Rice name</span>
          <input
            className="h-11 w-full rounded-md border border-line bg-inset px-3 text-sm outline-none focus-visible:border-accent"
            value={config.riceName}
            aria-label="Rice name"
            onChange={(event) => patch((draft) => { draft.riceName = event.target.value; })}
          />
        </label>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-xs text-accent sm:inline" aria-live="polite">
            {notice}
          </span>
          <button type="button" onClick={() => void copyLua()} className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink">
            <Copy className="size-4" />
            <span className="sm:hidden">{notice || "Copy"}</span>
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button type="button" onClick={downloadLua} className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-elevated px-3 text-sm">
            <Download className="size-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto border-b border-line px-4 py-2 lg:hidden">
        {SECTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm ${
              section === item.id ? "bg-accent text-accent-ink" : "bg-elevated text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-12">
        <nav className="col-span-2 hidden flex-col border-r border-line lg:flex" aria-label="Config sections">
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            const current = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex min-h-14 items-center gap-3 px-4 text-left ${current ? "bg-elevated text-fg" : "text-muted"}`}
              >
                <Icon className={`size-4 shrink-0 ${current ? "text-accent" : ""}`} />
                <span className="min-w-0">
                  <span className="block text-sm">{item.label}</span>
                  <span className="block truncate text-xs text-faint">{item.hint}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <aside className="order-1 col-span-4 flex min-h-0 flex-col border-b border-line lg:order-none lg:col-start-9 lg:border-b-0 lg:border-l">
          <DesktopPreview config={config} />
          <LuaView source={lua} />
        </aside>

        <main className="order-2 col-span-6 min-w-0 px-4 py-5 sm:px-6 lg:overflow-y-auto lg:col-start-3 lg:row-start-1">
          {section === "look" ? <LookPanel /> : null}
          {section === "input" ? <InputPanel /> : null}
          {section === "binds" ? <BindsPanel /> : null}
          {section === "rules" ? <RulesPanel /> : null}
          {section === "startup" ? <StartupPanel /> : null}
          {section === "system" ? <SystemPanel /> : null}
          <p className="mt-8 text-xs text-faint">
            Save the file to ~/.config/hypr/hyprland.lua, then reload with hyprctl reload. Legacy hyprland.conf is not generated.
          </p>
        </main>
      </div>
    </div>
  );
}
