import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { blankBind, blankRule, defaultConfig, uid } from "./defaults";
import { applyPreset } from "./presets";
import type { Bind, HyprConfig, MainMod, ModKey, SectionId, WindowRule } from "./types";

type KilnState = {
  config: HyprConfig;
  section: SectionId;
  setSection: (section: SectionId) => void;
  patch: (recipe: (config: HyprConfig) => void) => void;
  applyLook: (id: string) => void;
  reset: () => void;
  setMainMod: (next: MainMod) => void;
  addBind: () => void;
  addRule: () => void;
  addMonitor: () => void;
  addEnv: () => void;
  addGesture: () => void;
  addAutostart: () => void;
};

const memory = new Map<string, string>();

const memoryStorage = {
  getItem: (name: string) => memory.get(name) ?? null,
  setItem: (name: string, value: string) => {
    memory.set(name, value);
  },
  removeItem: (name: string) => {
    memory.delete(name);
  },
};

type PersistedKiln = { config: HyprConfig };

function mergeConfig(saved: unknown): HyprConfig {
  const base = defaultConfig();
  if (!saved || typeof saved !== "object") return base;
  const raw = saved as Partial<HyprConfig>;
  return {
    ...base,
    ...raw,
    programs: { ...base.programs, ...raw.programs },
    general: {
      ...base.general,
      ...raw.general,
      active:
        raw.general?.active?.length === 2 ? raw.general.active : base.general.active,
    },
    decoration: { ...base.decoration, ...raw.decoration },
    input: { ...base.input, ...raw.input },
    monitors: Array.isArray(raw.monitors) && raw.monitors.length ? raw.monitors : base.monitors,
    env: Array.isArray(raw.env) ? raw.env : base.env,
    binds: Array.isArray(raw.binds) ? raw.binds : base.binds,
    rules: Array.isArray(raw.rules) ? raw.rules : base.rules,
    gestures: Array.isArray(raw.gestures) ? raw.gestures : base.gestures,
    autostart: Array.isArray(raw.autostart) ? raw.autostart : base.autostart,
  };
}

function dedupeMods(mods: ModKey[]): ModKey[] {
  const seen = new Set<ModKey>();
  const next: ModKey[] = [];
  for (const mod of mods) {
    if (seen.has(mod)) continue;
    seen.add(mod);
    next.push(mod);
  }
  return next;
}

export const useKiln = create<KilnState>()(
  persist<KilnState, [], [], PersistedKiln>(
    (set) => ({
      config: defaultConfig(),
      section: "look",
      setSection: (section) => set({ section }),
      patch: (recipe) =>
        set((state) => {
          const next = structuredClone(state.config);
          recipe(next);
          return { config: next };
        }),
      applyLook: (id) => set((state) => ({ config: applyPreset(state.config, id) })),
      reset: () => set({ config: defaultConfig(), section: "look" }),
      setMainMod: (next) =>
        set((state) => {
          const prev = state.config.mainMod;
          const config = structuredClone(state.config);
          config.mainMod = next;
          config.binds = config.binds.map((bind) => ({
            ...bind,
            mods: dedupeMods(bind.mods.map((mod) => (mod === prev ? next : mod))),
          }));
          return { config };
        }),
      addBind: () =>
        set((state) => {
          const config = structuredClone(state.config);
          const created: Bind = { ...blankBind(), mods: [config.mainMod] };
          config.binds.push(created);
          return { config };
        }),
      addRule: () =>
        set((state) => {
          const config = structuredClone(state.config);
          const created: WindowRule = blankRule();
          config.rules.push(created);
          return { config };
        }),
      addMonitor: () =>
        set((state) => {
          const config = structuredClone(state.config);
          config.monitors.push({
            id: uid(),
            output: "DP-2",
            mode: "preferred",
            position: "auto",
            scale: "1",
          });
          return { config };
        }),
      addEnv: () =>
        set((state) => {
          const config = structuredClone(state.config);
          config.env.push({ id: uid(), key: "", value: "" });
          return { config };
        }),
      addGesture: () =>
        set((state) => {
          const config = structuredClone(state.config);
          config.gestures.push({ id: uid(), fingers: 3, direction: "vertical", action: "special" });
          return { config };
        }),
      addAutostart: () =>
        set((state) => {
          const config = structuredClone(state.config);
          config.autostart.push("");
          config.autostartOn = true;
          return { config };
        }),
    }),
    {
      name: "kiln-hyprland-v1",
      skipHydration: true,
      storage: createJSONStorage<PersistedKiln>(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      partialize: (state) => ({ config: state.config }),
      merge: (persisted, current) => {
        const saved = persisted as PersistedKiln | undefined;
        return { ...current, config: mergeConfig(saved?.config) };
      },
    },
  ),
);
