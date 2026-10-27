import { Plus, Trash2 } from "lucide-react";
import { Chip, ColorStopField, Group, SelectField, SliderField, TextField, ToggleRow } from "@/components/kiln/controls";
import { PRESETS, matchingPreset } from "@/lib/hypr/presets";
import { useKiln } from "@/lib/hypr/store";
import { BIND_KINDS, defaultArg, kindNeedsArg, type BindKind, type ModKey, type Tri } from "@/lib/hypr/types";

const MODS: ModKey[] = ["SUPER", "SHIFT", "CTRL", "ALT"];

const LAYOUTS = [
  { id: "us", label: "English (US)", layout: "us", variant: "" },
  { id: "dvorak", label: "US Dvorak", layout: "us", variant: "dvorak" },
  { id: "colemak", label: "US Colemak", layout: "us", variant: "colemak" },
  { id: "gb", label: "English (UK)", layout: "gb", variant: "" },
  { id: "de", label: "German", layout: "de", variant: "" },
  { id: "fr", label: "French", layout: "fr", variant: "" },
  { id: "es", label: "Spanish", layout: "es", variant: "" },
  { id: "br", label: "Portuguese (Brazil)", layout: "br", variant: "" },
  { id: "jp", label: "Japanese", layout: "jp", variant: "" },
  { id: "ru", label: "Russian", layout: "ru", variant: "" },
  { id: "custom", label: "Custom", layout: "", variant: "" },
];

function layoutId(layout: string, variant: string): string {
  const hit = LAYOUTS.find((item) => item.id !== "custom" && item.layout === layout && item.variant === variant);
  return hit?.id ?? "custom";
}

function TriSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Tri;
  onChange: (value: Tri) => void;
}) {
  return (
    <SelectField
      label={label}
      value={value}
      onChange={(next) => {
        if (next === "" || next === "true" || next === "false") onChange(next);
      }}
      options={[
        { value: "", label: "Unset" },
        { value: "true", label: "True" },
        { value: "false", label: "False" },
      ]}
    />
  );
}

export function LookPanel() {
  const config = useKiln((state) => state.config);
  const patch = useKiln((state) => state.patch);
  const applyLook = useKiln((state) => state.applyLook);
  const active = matchingPreset(config);
  const g = config.general;
  const d = config.decoration;

  return (
    <div className="space-y-8">
      <Group title="Rices" hint="Swaps color, gaps, radius, blur, and shadow. Binds stay.">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyLook(preset.id)}
              className={`flex h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-sm ${
                active === preset.id ? "border-accent text-fg" : "border-line text-muted"
              }`}
            >
              <span className="flex overflow-hidden rounded-sm">
                <span className="h-4 w-2" style={{ background: preset.swatch[0] }} />
                <span className="h-4 w-2" style={{ background: preset.swatch[1] }} />
              </span>
              {preset.name}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Layout">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Algorithm"
            value={g.layout}
            onChange={(value) =>
              patch((draft) => {
                if (value === "dwindle" || value === "master" || value === "scrolling" || value === "monocle") {
                  draft.general.layout = value;
                }
              })
            }
            options={[
              { value: "dwindle", label: "Dwindle" },
              { value: "master", label: "Master" },
              { value: "scrolling", label: "Scrolling" },
              { value: "monocle", label: "Monocle" },
            ]}
          />
          {g.layout === "dwindle" ? (
            <div className="flex items-end">
              <ToggleRow
                label="Preserve split"
                hint="Remember dwindle split direction."
                checked={config.dwindlePreserveSplit}
                onChange={(checked) => patch((draft) => { draft.dwindlePreserveSplit = checked; })}
              />
            </div>
          ) : null}
          {g.layout === "master" ? (
            <SelectField
              label="New window"
              value={config.masterNewStatus}
              onChange={(value) =>
                patch((draft) => {
                  if (value === "master" || value === "slave" || value === "inherit") draft.masterNewStatus = value;
                })
              }
              options={[
                { value: "master", label: "Open as master" },
                { value: "slave", label: "Open as stack" },
                { value: "inherit", label: "Inherit" },
              ]}
            />
          ) : null}
          {g.layout === "scrolling" ? (
            <div className="flex items-end">
              <ToggleRow
                label="Fullscreen one column"
                checked={config.scrollingFullscreenOne}
                onChange={(checked) => patch((draft) => { draft.scrollingFullscreenOne = checked; })}
              />
            </div>
          ) : null}
        </div>
      </Group>

      <Group title="Gaps and border">
        <div className="grid gap-x-6 sm:grid-cols-2">
          <SliderField label="Inner gaps" value={g.gapsIn} min={0} max={80} step={1} format={(n) => `${n}px`} onChange={(value) => patch((draft) => { draft.general.gapsIn = value; })} />
          <SliderField label="Outer gaps" value={g.gapsOut} min={0} max={80} step={1} format={(n) => `${n}px`} onChange={(value) => patch((draft) => { draft.general.gapsOut = value; })} />
          <SliderField label="Border" value={g.borderSize} min={0} max={12} step={1} format={(n) => `${n}px`} onChange={(value) => patch((draft) => { draft.general.borderSize = value; })} />
          <SliderField label="Gradient angle" value={g.activeAngle} min={0} max={360} step={1} format={(n) => `${n}°`} onChange={(value) => patch((draft) => { draft.general.activeAngle = value; })} />
        </div>
        <ToggleRow label="Resize on border" hint="Drag borders and gaps to resize." checked={g.resizeOnBorder} onChange={(checked) => patch((draft) => { draft.general.resizeOnBorder = checked; })} />
        <ToggleRow label="Allow tearing" hint="Read the tearing wiki page before enabling this on a real machine." checked={g.allowTearing} onChange={(checked) => patch((draft) => { draft.general.allowTearing = checked; })} />
      </Group>

      <Group title="Border color" hint="Active border is a two-stop gradient. Alpha is 0–100.">
        <div className="grid gap-4 sm:grid-cols-2">
          <ColorStopField label="Active start" value={g.active[0]} onChange={(value) => patch((draft) => { draft.general.active[0] = value; })} />
          <ColorStopField label="Active end" value={g.active[1]} onChange={(value) => patch((draft) => { draft.general.active[1] = value; })} />
          <ColorStopField label="Inactive" value={g.inactive} onChange={(value) => patch((draft) => { draft.general.inactive = value; })} />
          <ColorStopField label="Shadow" value={d.shadow} onChange={(value) => patch((draft) => { draft.decoration.shadow = value; })} />
        </div>
      </Group>

      <Group title="Decoration">
        <div className="grid gap-x-6 sm:grid-cols-2">
          <SliderField label="Rounding" value={d.rounding} min={0} max={40} step={1} format={(n) => `${n}px`} onChange={(value) => patch((draft) => { draft.decoration.rounding = value; })} />
          <SliderField label="Corner curve" value={d.roundingPower} min={1} max={8} step={0.1} format={(n) => n.toFixed(1)} onChange={(value) => patch((draft) => { draft.decoration.roundingPower = Math.round(value * 10) / 10; })} />
          <SliderField label="Active opacity" value={d.activeOpacity} min={0.2} max={1} step={0.05} format={(n) => n.toFixed(2)} onChange={(value) => patch((draft) => { draft.decoration.activeOpacity = Math.round(value * 100) / 100; })} />
          <SliderField label="Inactive opacity" value={d.inactiveOpacity} min={0.2} max={1} step={0.05} format={(n) => n.toFixed(2)} onChange={(value) => patch((draft) => { draft.decoration.inactiveOpacity = Math.round(value * 100) / 100; })} />
        </div>
        <ToggleRow label="Shadow" checked={d.shadowEnabled} onChange={(checked) => patch((draft) => { draft.decoration.shadowEnabled = checked; })} />
        {d.shadowEnabled ? (
          <div className="grid gap-x-6 sm:grid-cols-2">
            <SliderField label="Shadow range" value={d.shadowRange} min={1} max={30} step={1} onChange={(value) => patch((draft) => { draft.decoration.shadowRange = value; })} />
            <SliderField label="Shadow power" value={d.shadowPower} min={1} max={8} step={1} onChange={(value) => patch((draft) => { draft.decoration.shadowPower = value; })} />
          </div>
        ) : null}
        <ToggleRow label="Blur" checked={d.blurEnabled} onChange={(checked) => patch((draft) => { draft.decoration.blurEnabled = checked; })} />
        {d.blurEnabled ? (
          <div className="grid gap-x-6 sm:grid-cols-2">
            <SliderField label="Blur size" value={d.blurSize} min={1} max={16} step={1} onChange={(value) => patch((draft) => { draft.decoration.blurSize = value; })} />
            <SliderField label="Blur passes" value={d.blurPasses} min={1} max={6} step={1} onChange={(value) => patch((draft) => { draft.decoration.blurPasses = value; })} />
            <SliderField label="Vibrancy" value={d.blurVibrancy} min={0} max={1} step={0.01} format={(n) => n.toFixed(2)} onChange={(value) => patch((draft) => { draft.decoration.blurVibrancy = Math.round(value * 100) / 100; })} />
          </div>
        ) : null}
      </Group>

      <Group title="Motion">
        <ToggleRow label="Animations" checked={config.animationsEnabled} onChange={(checked) => patch((draft) => { draft.animationsEnabled = checked; })} />
        <ToggleRow
          label="Stock curves"
          hint="Emit the example bezier and spring block."
          checked={config.stockCurves}
          onChange={(checked) => patch((draft) => { draft.stockCurves = checked; })}
        />
      </Group>
    </div>
  );
}

export function InputPanel() {
  const config = useKiln((state) => state.config);
  const patch = useKiln((state) => state.patch);
  const addGesture = useKiln((state) => state.addGesture);
  const current = layoutId(config.input.kbLayout, config.input.kbVariant);

  return (
    <div className="space-y-8">
      <Group title="Keyboard" hint="Layout names are xkb. Variant is optional (dvorak, colemak).">
        <SelectField
          label="Layout"
          value={current}
          onChange={(value) => {
            const chosen = LAYOUTS.find((item) => item.id === value);
            if (!chosen || chosen.id === "custom") return;
            patch((draft) => {
              draft.input.kbLayout = chosen.layout;
              draft.input.kbVariant = chosen.variant;
            });
          }}
          options={LAYOUTS.map((item) => ({ value: item.id, label: item.label }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="kb_layout" mono value={config.input.kbLayout} onChange={(value) => patch((draft) => { draft.input.kbLayout = value; })} />
          <TextField label="kb_variant" mono value={config.input.kbVariant} placeholder="empty" onChange={(value) => patch((draft) => { draft.input.kbVariant = value; })} />
        </div>
      </Group>
      <Group title="Pointer">
        <SelectField
          label="Follow mouse"
          value={String(config.input.followMouse)}
          onChange={(value) =>
            patch((draft) => {
              const next = Number(value);
              if (next === 0 || next === 1 || next === 2 || next === 3) draft.input.followMouse = next;
            })
          }
          options={[
            { value: "0", label: "0 — don't follow" },
            { value: "1", label: "1 — always" },
            { value: "2", label: "2 — loose" },
            { value: "3", label: "3 — detached" },
          ]}
        />
        <SliderField
          label="Sensitivity"
          value={config.input.sensitivity}
          min={-1}
          max={1}
          step={0.05}
          format={(n) => n.toFixed(2)}
          onChange={(value) => patch((draft) => { draft.input.sensitivity = Math.round(value * 100) / 100; })}
        />
        <ToggleRow label="Natural scroll" hint="Touchpad content tracks the fingers." checked={config.input.naturalScroll} onChange={(checked) => patch((draft) => { draft.input.naturalScroll = checked; })} />
      </Group>
      <Group title="Gestures" hint="Emitted as hl.gesture. Direction and action are passed through as written.">
        <div className="space-y-3">
          {config.gestures.map((gesture) => (
            <div key={gesture.id} className="grid gap-3 rounded-md border border-line bg-surface p-3 sm:grid-cols-[5rem_1fr_1fr_auto]">
              <TextField
                label="Fingers"
                mono
                value={String(gesture.fingers)}
                onChange={(value) =>
                  patch((draft) => {
                    const item = draft.gestures.find((entry) => entry.id === gesture.id);
                    const next = Number(value);
                    if (item && Number.isFinite(next)) item.fingers = Math.min(5, Math.max(1, Math.round(next)));
                  })
                }
              />
              <TextField label="Direction" mono value={gesture.direction} onChange={(value) => patch((draft) => { const item = draft.gestures.find((entry) => entry.id === gesture.id); if (item) item.direction = value; })} />
              <TextField label="Action" mono value={gesture.action} onChange={(value) => patch((draft) => { const item = draft.gestures.find((entry) => entry.id === gesture.id); if (item) item.action = value; })} />
              <div className="flex items-end">
                <button
                  type="button"
                  aria-label="Remove gesture"
                  className="inline-flex size-11 items-center justify-center rounded-md border border-line text-muted"
                  onClick={() => patch((draft) => { draft.gestures = draft.gestures.filter((entry) => entry.id !== gesture.id); })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addGesture} className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-fg">
          <Plus className="size-4" />
          Add gesture
        </button>
      </Group>
    </div>
  );
}

export function BindsPanel() {
  const config = useKiln((state) => state.config);
  const patch = useKiln((state) => state.patch);
  const addBind = useKiln((state) => state.addBind);
  const setMainMod = useKiln((state) => state.setMainMod);

  return (
    <div className="space-y-8">
      <Group title="Main mod" hint="Changing this rewrites binds that used the previous mod. Digit row and mouse drag follow it.">
        <div className="flex flex-wrap gap-2">
          {(["SUPER", "ALT", "CTRL"] as const).map((mod) => (
            <Chip key={mod} pressed={config.mainMod === mod} onClick={() => setMainMod(mod)}>
              {mod}
            </Chip>
          ))}
        </div>
        <TextField label="Special workspace" mono value={config.specialName} onChange={(value) => patch((draft) => { draft.specialName = value; })} />
      </Group>
      <Group title="Generated blocks">
        <ToggleRow label="Number row" hint={`${config.mainMod} + 1…0 focuses a workspace. Shift moves the window.`} checked={config.workspaceDigits} onChange={(checked) => patch((draft) => { draft.workspaceDigits = checked; })} />
        <ToggleRow label="Scroll workspaces" hint="Main mod + mouse wheel." checked={config.scrollWorkspaces} onChange={(checked) => patch((draft) => { draft.scrollWorkspaces = checked; })} />
        <ToggleRow label="Drag and resize" hint="Main mod + left / right mouse." checked={config.mouseModDrag} onChange={(checked) => patch((draft) => { draft.mouseModDrag = checked; })} />
        <ToggleRow label="Laptop media keys" hint="Volume, mic, brightness, playerctl." checked={config.mediaKeys} onChange={(checked) => patch((draft) => { draft.mediaKeys = checked; })} />
      </Group>
      <Group title="Binds" hint="Keysyms: Q, left, Return, mouse:272, XF86AudioPlay. The segment after XKB_KEY_.">
        <div className="space-y-3">
          {config.binds.map((bind, index) => (
            <div key={bind.id} className="space-y-3 rounded-md border border-line bg-surface p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-6 font-mono text-xs text-faint">{index + 1}</span>
                {MODS.map((mod) => (
                  <Chip
                    key={mod}
                    pressed={bind.mods.includes(mod)}
                    onClick={() =>
                      patch((draft) => {
                        const item = draft.binds.find((entry) => entry.id === bind.id);
                        if (!item) return;
                        item.mods = item.mods.includes(mod) ? item.mods.filter((entry) => entry !== mod) : [...item.mods, mod];
                      })
                    }
                  >
                    {mod}
                  </Chip>
                ))}
                <button
                  type="button"
                  aria-label={`Remove bind ${index + 1}`}
                  className="ml-auto inline-flex size-11 items-center justify-center rounded-md border border-line text-muted"
                  onClick={() => patch((draft) => { draft.binds = draft.binds.filter((entry) => entry.id !== bind.id); })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField
                  label="Key"
                  mono
                  value={bind.key}
                  onChange={(value) => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.key = value; })}
                />
                <SelectField
                  label="Action"
                  value={bind.kind}
                  onChange={(value) =>
                    patch((draft) => {
                      const item = draft.binds.find((entry) => entry.id === bind.id);
                      if (!item) return;
                      item.kind = value as BindKind;
                      item.arg = defaultArg(item.kind);
                    })
                  }
                  options={BIND_KINDS.map((kind) => ({ value: kind.id, label: kind.label }))}
                />
                {bind.kind === "focus-dir" ? (
                  <SelectField
                    label="Direction"
                    value={bind.arg || "left"}
                    onChange={(value) => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.arg = value; })}
                    options={["left", "right", "up", "down"].map((dir) => ({ value: dir, label: dir }))}
                  />
                ) : null}
                {bind.kind !== "focus-dir" && kindNeedsArg(bind.kind) ? (
                  <TextField
                    label={bind.kind === "raw" ? "Dispatcher" : bind.kind === "exec" ? "Command" : "Workspace"}
                    mono
                    value={bind.arg}
                    placeholder={bind.kind === "exec" ? config.programs.terminal : ""}
                    onChange={(value) => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.arg = value; })}
                  />
                ) : null}
              </div>
              <details>
                <summary className="text-xs text-muted">Flags and description</summary>
                <div className="mt-3 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Chip pressed={bind.mouse} onClick={() => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.mouse = !item.mouse; })}>mouse</Chip>
                    <Chip pressed={bind.locked} onClick={() => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.locked = !item.locked; })}>locked</Chip>
                    <Chip pressed={bind.repeating} onClick={() => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.repeating = !item.repeating; })}>repeating</Chip>
                    <Chip pressed={bind.release} onClick={() => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.release = !item.release; })}>release</Chip>
                  </div>
                  <TextField label="Description" value={bind.description} onChange={(value) => patch((draft) => { const item = draft.binds.find((entry) => entry.id === bind.id); if (item) item.description = value; })} />
                </div>
              </details>
            </div>
          ))}
        </div>
        <button type="button" onClick={addBind} className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink">
          <Plus className="size-4" />
          Add bind
        </button>
      </Group>
    </div>
  );
}

export function RulesPanel() {
  const rules = useKiln((state) => state.config.rules);
  const patch = useKiln((state) => state.patch);
  const addRule = useKiln((state) => state.addRule);

  return (
    <div className="space-y-4">
      <Group title="Window rules" hint="Match fields select windows. The other fields are what Hyprland applies. Class is a regex.">
        <div className="space-y-3">
          {rules.map((rule) => (
            <details key={rule.id} className="rounded-md border border-line bg-surface">
              <summary className="flex min-h-11 items-center justify-between gap-3 px-3">
                <span className="truncate font-mono text-sm text-fg">{rule.name || "unnamed"}</span>
                <span className="shrink-0 font-mono text-xs text-faint">{rule.classMatch || "any class"}</span>
              </summary>
              <div className="space-y-4 px-3 pb-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Name" mono value={rule.name} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.name = value; })} />
                  <TextField label="Class match" mono value={rule.classMatch} placeholder=".*" onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.classMatch = value; })} />
                  <TextField label="Title match" mono value={rule.titleMatch} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.titleMatch = value; })} />
                  <TextField label="Opacity" mono value={rule.opacity} placeholder="0.9 override" onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.opacity = value; })} />
                  <TextField label="Move" mono value={rule.move} placeholder="20 20" onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.move = value; })} />
                  <TextField label="Size" mono value={rule.size} placeholder="800 600" onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.size = value; })} />
                  <TextField label="Workspace" mono value={rule.workspace} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.workspace = value; })} />
                  <TextField label="Suppress event" mono value={rule.suppressEvent} placeholder="maximize" onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.suppressEvent = value; })} />
                  <TextField label="Rounding" mono value={rule.rounding} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.rounding = value; })} />
                  <TextField label="Border size" mono value={rule.borderSize} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.borderSize = value; })} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TriSelect label="Set float" value={rule.floatSet} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.floatSet = value; })} />
                  <TriSelect label="Set pin" value={rule.pinSet} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.pinSet = value; })} />
                  <TriSelect label="Match float" value={rule.matchFloat} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.matchFloat = value; })} />
                  <TriSelect label="Match fullscreen" value={rule.matchFullscreen} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.matchFullscreen = value; })} />
                  <TriSelect label="Match xwayland" value={rule.matchXwayland} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.matchXwayland = value; })} />
                  <TriSelect label="Match pin" value={rule.matchPin} onChange={(value) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.matchPin = value; })} />
                </div>
                <ToggleRow label="No focus" checked={rule.noFocus} onChange={(checked) => patch((draft) => { const item = draft.rules.find((entry) => entry.id === rule.id); if (item) item.noFocus = checked; })} />
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 text-sm text-danger"
                  onClick={() => patch((draft) => { draft.rules = draft.rules.filter((entry) => entry.id !== rule.id); })}
                >
                  <Trash2 className="size-4" />
                  Remove rule
                </button>
              </div>
            </details>
          ))}
        </div>
        <button type="button" onClick={addRule} className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink">
          <Plus className="size-4" />
          Add rule
        </button>
      </Group>
    </div>
  );
}

export function StartupPanel() {
  const config = useKiln((state) => state.config);
  const patch = useKiln((state) => state.patch);
  const addMonitor = useKiln((state) => state.addMonitor);
  const addEnv = useKiln((state) => state.addEnv);
  const addAutostart = useKiln((state) => state.addAutostart);

  const renameProgram = (key: "terminal" | "fileManager" | "menu", value: string) => {
    patch((draft) => {
      const previous = draft.programs[key];
      draft.programs[key] = value;
      for (const bind of draft.binds) {
        if (bind.kind === "exec" && bind.arg === previous) bind.arg = value;
      }
    });
  };

  return (
    <div className="space-y-8">
      <Group title="Programs" hint="Referenced from binds as terminal, fileManager, and menu.">
        <div className="grid gap-3">
          <TextField label="Terminal" mono value={config.programs.terminal} onChange={(value) => renameProgram("terminal", value)} />
          <TextField label="File manager" mono value={config.programs.fileManager} onChange={(value) => renameProgram("fileManager", value)} />
          <TextField label="Launcher" mono value={config.programs.menu} onChange={(value) => renameProgram("menu", value)} />
        </div>
      </Group>
      <Group title="Monitors" hint="Empty output means every monitor. Mode examples: preferred, highrr, 2560x1440@144.">
        <div className="space-y-3">
          {config.monitors.map((monitor, index) => (
            <div key={monitor.id} className="space-y-3 rounded-md border border-line bg-surface p-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted">monitor {index + 1}</p>
                <button
                  type="button"
                  aria-label={`Remove monitor ${index + 1}`}
                  disabled={config.monitors.length < 2}
                  className="inline-flex size-11 items-center justify-center rounded-md border border-line text-muted disabled:opacity-40"
                  onClick={() => patch((draft) => { if (draft.monitors.length > 1) draft.monitors = draft.monitors.filter((entry) => entry.id !== monitor.id); })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="Output" mono value={monitor.output} placeholder="eDP-1" onChange={(value) => patch((draft) => { const item = draft.monitors.find((entry) => entry.id === monitor.id); if (item) item.output = value; })} />
                <TextField label="Mode" mono value={monitor.mode} onChange={(value) => patch((draft) => { const item = draft.monitors.find((entry) => entry.id === monitor.id); if (item) item.mode = value; })} />
                <TextField label="Position" mono value={monitor.position} onChange={(value) => patch((draft) => { const item = draft.monitors.find((entry) => entry.id === monitor.id); if (item) item.position = value; })} />
                <TextField label="Scale" mono value={monitor.scale} onChange={(value) => patch((draft) => { const item = draft.monitors.find((entry) => entry.id === monitor.id); if (item) item.scale = value; })} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addMonitor} className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm">
          <Plus className="size-4" />
          Add monitor
        </button>
      </Group>
      <Group title="Autostart" hint="Runs once on hyprland.start. Leave off and the block stays commented.">
        <ToggleRow label="Run on start" checked={config.autostartOn} onChange={(checked) => patch((draft) => { draft.autostartOn = checked; })} />
        <div className="space-y-2">
          {config.autostart.map((command, index) => (
            <div key={index} className="flex gap-2">
              <label className="min-w-0 flex-1">
                <span className="sr-only">Autostart command {index + 1}</span>
                <input
                  className="h-11 w-full rounded-md border border-line bg-inset px-3 font-mono text-sm text-fg outline-none focus-visible:border-accent"
                  value={command}
                  placeholder="waybar"
                  onChange={(event) => patch((draft) => { draft.autostart[index] = event.target.value; })}
                />
              </label>
              <button
                type="button"
                aria-label={`Remove autostart ${index + 1}`}
                className="inline-flex size-11 items-center justify-center rounded-md border border-line text-muted"
                onClick={() => patch((draft) => { draft.autostart.splice(index, 1); })}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addAutostart} className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm">
          <Plus className="size-4" />
          Add command
        </button>
      </Group>
      <Group title="Environment">
        <div className="space-y-2">
          {config.env.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input aria-label="Variable" className="h-11 min-w-0 rounded-md border border-line bg-inset px-3 font-mono text-sm outline-none focus-visible:border-accent" value={item.key} placeholder="KEY" onChange={(event) => patch((draft) => { const env = draft.env.find((entry) => entry.id === item.id); if (env) env.key = event.target.value; })} />
              <input aria-label="Value" className="h-11 min-w-0 rounded-md border border-line bg-inset px-3 font-mono text-sm outline-none focus-visible:border-accent" value={item.value} placeholder="value" onChange={(event) => patch((draft) => { const env = draft.env.find((entry) => entry.id === item.id); if (env) env.value = event.target.value; })} />
              <button type="button" aria-label={`Remove ${item.key || "variable"}`} className="inline-flex size-11 items-center justify-center rounded-md border border-line text-muted" onClick={() => patch((draft) => { draft.env = draft.env.filter((entry) => entry.id !== item.id); })}>
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addEnv} className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm">
          <Plus className="size-4" />
          Add variable
        </button>
      </Group>
    </div>
  );
}

export function SystemPanel() {
  const config = useKiln((state) => state.config);
  const patch = useKiln((state) => state.patch);
  const reset = useKiln((state) => state.reset);

  return (
    <div className="space-y-8">
      <Group title="Misc">
        <SelectField
          label="Default wallpaper"
          value={String(config.miscForceWallpaper)}
          onChange={(value) =>
            patch((draft) => {
              const next = Number(value);
              if (next === -1 || next === 0 || next === 1) draft.miscForceWallpaper = next;
            })
          }
          options={[
            { value: "-1", label: "−1 — anime mascot (default)" },
            { value: "0", label: "0 — disable" },
            { value: "1", label: "1 — disable" },
          ]}
        />
        <ToggleRow label="Disable Hyprland logo" checked={config.disableLogo} onChange={(checked) => patch((draft) => { draft.disableLogo = checked; })} />
        <ToggleRow
          label="New top layers over fullscreen"
          hint="layers.allow_new_top_layers_over_existing_fullscreen"
          checked={config.allowNewLayers}
          onChange={(checked) => patch((draft) => { draft.allowNewLayers = checked; })}
        />
        <ToggleRow
          label="Smart gaps"
          hint="Zero gaps and borders when a workspace has a single tiled window."
          checked={config.smartGaps}
          onChange={(checked) => patch((draft) => { draft.smartGaps = checked; })}
        />
        <ToggleRow
          label="Permission examples"
          hint="Commented hl.permission lines. They need a restart, not a reload."
          checked={config.includePermissionNotes}
          onChange={(checked) => patch((draft) => { draft.includePermissionNotes = checked; })}
        />
      </Group>
      <Group title="Extra Lua" hint="Appended as-is. Use it for plugins, devices, or anything Kiln does not model.">
        <textarea
          className="min-h-40 w-full rounded-md border border-line bg-inset p-3 font-mono text-xs leading-5 text-fg outline-none focus-visible:border-accent"
          spellCheck={false}
          value={config.extraLua}
          placeholder={'hl.device({\n    name = "epic-mouse-v1",\n    sensitivity = -0.5,\n})'}
          onChange={(event) => patch((draft) => { draft.extraLua = event.target.value; })}
        />
      </Group>
      <Group title="Reset" hint="Restores the Hyprland example rice. This browser keeps a copy until you reset.">
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm text-danger"
          onClick={() => {
            if (window.confirm("Reset this rice to the Hyprland example?")) reset();
          }}
        >
          Reset config
        </button>
      </Group>
    </div>
  );
}
