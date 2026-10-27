import { A_AA, A_EE, stop } from "./color";
import type { HyprConfig } from "./types";

export type RicePreset = {
  id: string;
  name: string;
  note: string;
  swatch: [string, string];
  apply: (config: HyprConfig) => HyprConfig;
};

function paint(
  config: HyprConfig,
  look: {
    gapsIn: number;
    gapsOut: number;
    border: number;
    rounding: number;
    power: number;
    active: [string, string];
    inactive: string;
    angle?: number;
    blur: boolean;
    blurSize?: number;
    blurPasses?: number;
    shadow: boolean;
    shadowHex?: string;
    activeOpacity?: number;
    inactiveOpacity?: number;
  },
): HyprConfig {
  return {
    ...config,
    general: {
      ...config.general,
      gapsIn: look.gapsIn,
      gapsOut: look.gapsOut,
      borderSize: look.border,
      active: [stop(look.active[0], A_EE), stop(look.active[1], A_EE)],
      activeAngle: look.angle ?? 45,
      inactive: stop(look.inactive, A_AA),
    },
    decoration: {
      ...config.decoration,
      rounding: look.rounding,
      roundingPower: look.power,
      blurEnabled: look.blur,
      blurSize: look.blurSize ?? (look.blur ? 4 : config.decoration.blurSize),
      blurPasses: look.blurPasses ?? (look.blur ? 2 : 1),
      shadowEnabled: look.shadow,
      shadow: stop(look.shadowHex ?? "#1a1a1a", A_EE),
      activeOpacity: look.activeOpacity ?? 1,
      inactiveOpacity: look.inactiveOpacity ?? 1,
    },
  };
}

export const PRESETS: RicePreset[] = [
  {
    id: "default",
    name: "Hyprland",
    note: "Example cyan / mint",
    swatch: ["#33ccff", "#00ff99"],
    apply: (c) =>
      paint(c, {
        gapsIn: 5,
        gapsOut: 20,
        border: 2,
        rounding: 10,
        power: 2,
        active: ["#33ccff", "#00ff99"],
        inactive: "#595959",
        blur: true,
        blurSize: 3,
        blurPasses: 1,
        shadow: true,
      }),
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    note: "Mocha mauve",
    swatch: ["#f5e0dc", "#cba6f7"],
    apply: (c) =>
      paint(c, {
        gapsIn: 6,
        gapsOut: 16,
        border: 2,
        rounding: 12,
        power: 2,
        active: ["#f5e0dc", "#cba6f7"],
        inactive: "#6c7086",
        blur: true,
        blurSize: 6,
        blurPasses: 2,
        shadow: true,
        shadowHex: "#11111b",
        activeOpacity: 1,
        inactiveOpacity: 0.92,
      }),
  },
  {
    id: "tokyo",
    name: "Tokyo Night",
    note: "Storm blue",
    swatch: ["#7aa2f7", "#bb9af7"],
    apply: (c) =>
      paint(c, {
        gapsIn: 4,
        gapsOut: 12,
        border: 2,
        rounding: 8,
        power: 2,
        active: ["#7aa2f7", "#bb9af7"],
        inactive: "#3b4261",
        blur: true,
        blurSize: 5,
        blurPasses: 2,
        shadow: true,
        shadowHex: "#1a1b26",
        inactiveOpacity: 0.94,
      }),
  },
  {
    id: "nord",
    name: "Nord",
    note: "Frost",
    swatch: ["#88c0d0", "#81a1c1"],
    apply: (c) =>
      paint(c, {
        gapsIn: 4,
        gapsOut: 14,
        border: 2,
        rounding: 6,
        power: 2,
        active: ["#88c0d0", "#81a1c1"],
        inactive: "#4c566a",
        blur: true,
        blurSize: 4,
        blurPasses: 1,
        shadow: true,
        shadowHex: "#2e3440",
      }),
  },
  {
    id: "rose",
    name: "Rosé Pine",
    note: "Dawn iris",
    swatch: ["#ebbcba", "#c4a7e7"],
    apply: (c) =>
      paint(c, {
        gapsIn: 6,
        gapsOut: 18,
        border: 2,
        rounding: 10,
        power: 2.4,
        active: ["#ebbcba", "#c4a7e7"],
        inactive: "#6e6a86",
        blur: true,
        blurSize: 5,
        blurPasses: 2,
        shadow: true,
        shadowHex: "#191724",
        inactiveOpacity: 0.9,
      }),
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    note: "Hard edges",
    swatch: ["#fabd2f", "#fe8019"],
    apply: (c) =>
      paint(c, {
        gapsIn: 3,
        gapsOut: 8,
        border: 3,
        rounding: 0,
        power: 2,
        active: ["#fabd2f", "#fe8019"],
        inactive: "#665c54",
        angle: 90,
        blur: false,
        shadow: true,
        shadowHex: "#1d2021",
      }),
  },
];

export function applyPreset(config: HyprConfig, id: string): HyprConfig {
  const preset = PRESETS.find((item) => item.id === id);
  return preset ? preset.apply(config) : config;
}

export function matchingPreset(config: HyprConfig): string | null {
  const [a, b] = config.general.active;
  const hit = PRESETS.find(
    (preset) =>
      preset.swatch[0].toLowerCase() === a.hex.toLowerCase() &&
      preset.swatch[1].toLowerCase() === b.hex.toLowerCase(),
  );
  return hit?.id ?? null;
}
