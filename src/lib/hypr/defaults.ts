import { A_AA, A_EE, stop } from "./color";
import type { Bind, HyprConfig, WindowRule } from "./types";

function bind(
  id: string,
  mods: Bind["mods"],
  key: string,
  kind: Bind["kind"],
  arg = "",
  extra: Partial<Pick<Bind, "mouse" | "locked" | "repeating" | "release" | "description">> = {},
): Bind {
  return {
    id,
    mods,
    key,
    kind,
    arg,
    mouse: extra.mouse ?? false,
    locked: extra.locked ?? false,
    repeating: extra.repeating ?? false,
    release: extra.release ?? false,
    description: extra.description ?? "",
  };
}

function rule(partial: WindowRule): WindowRule {
  return partial;
}

export function defaultConfig(): HyprConfig {
  return {
    riceName: "kiln",
    mainMod: "SUPER",
    programs: {
      terminal: "kitty",
      fileManager: "dolphin",
      menu: "hyprlauncher",
    },
    monitors: [
      { id: "m1", output: "", mode: "preferred", position: "auto", scale: "auto" },
    ],
    autostart: [],
    autostartOn: false,
    env: [
      { id: "e1", key: "XCURSOR_SIZE", value: "24" },
      { id: "e2", key: "HYPRCURSOR_SIZE", value: "24" },
    ],
    general: {
      gapsIn: 5,
      gapsOut: 20,
      borderSize: 2,
      resizeOnBorder: false,
      allowTearing: false,
      layout: "dwindle",
      active: [stop("#33ccff", A_EE), stop("#00ff99", A_EE)],
      activeAngle: 45,
      inactive: stop("#595959", A_AA),
    },
    decoration: {
      rounding: 10,
      roundingPower: 2,
      activeOpacity: 1,
      inactiveOpacity: 1,
      shadowEnabled: true,
      shadowRange: 4,
      shadowPower: 3,
      shadow: stop("#1a1a1a", A_EE),
      blurEnabled: true,
      blurSize: 3,
      blurPasses: 1,
      blurVibrancy: 0.1696,
    },
    animationsEnabled: true,
    stockCurves: true,
    dwindlePreserveSplit: true,
    masterNewStatus: "master",
    scrollingFullscreenOne: true,
    smartGaps: false,
    input: {
      kbLayout: "us",
      kbVariant: "",
      followMouse: 1,
      sensitivity: 0,
      naturalScroll: false,
    },
    gestures: [{ id: "g1", fingers: 3, direction: "horizontal", action: "workspace" }],
    miscForceWallpaper: -1,
    disableLogo: false,
    allowNewLayers: true,
    binds: [
      bind("b1", ["SUPER"], "Q", "exec", "kitty", { description: "Open terminal" }),
      bind("b2", ["SUPER"], "C", "close"),
      bind("b3", ["SUPER"], "M", "exit"),
      bind("b4", ["SUPER"], "E", "exec", "dolphin", { description: "Open file manager" }),
      bind("b5", ["SUPER"], "V", "float"),
      bind("b6", ["SUPER"], "R", "exec", "hyprlauncher", { description: "Open launcher" }),
      bind("b7", ["SUPER"], "P", "pseudo"),
      bind("b8", ["SUPER"], "J", "togglesplit"),
      bind("b9", ["SUPER"], "left", "focus-dir", "left"),
      bind("b10", ["SUPER"], "right", "focus-dir", "right"),
      bind("b11", ["SUPER"], "up", "focus-dir", "up"),
      bind("b12", ["SUPER"], "down", "focus-dir", "down"),
      bind("b13", ["SUPER"], "S", "special"),
      bind("b14", ["SUPER", "SHIFT"], "S", "move-special"),
    ],
    workspaceDigits: true,
    mouseModDrag: true,
    mediaKeys: true,
    scrollWorkspaces: true,
    specialName: "magic",
    rules: [
      rule({
        id: "r1",
        name: "suppress-maximize-events",
        classMatch: ".*",
        titleMatch: "",
        matchXwayland: "",
        matchFloat: "",
        matchFullscreen: "",
        matchPin: "",
        floatSet: "",
        pinSet: "",
        noFocus: false,
        opacity: "",
        size: "",
        move: "",
        workspace: "",
        rounding: "",
        borderSize: "",
        suppressEvent: "maximize",
      }),
      rule({
        id: "r2",
        name: "fix-xwayland-drags",
        classMatch: "^$",
        titleMatch: "^$",
        matchXwayland: "true",
        matchFloat: "true",
        matchFullscreen: "false",
        matchPin: "false",
        floatSet: "",
        pinSet: "",
        noFocus: true,
        opacity: "",
        size: "",
        move: "",
        workspace: "",
        rounding: "",
        borderSize: "",
        suppressEvent: "",
      }),
      rule({
        id: "r3",
        name: "move-hyprland-run",
        classMatch: "hyprland-run",
        titleMatch: "",
        matchXwayland: "",
        matchFloat: "",
        matchFullscreen: "",
        matchPin: "",
        floatSet: "true",
        pinSet: "",
        noFocus: false,
        opacity: "",
        size: "",
        move: "20 monitor_h-120",
        workspace: "",
        rounding: "",
        borderSize: "",
        suppressEvent: "",
      }),
    ],
    includePermissionNotes: true,
    extraLua: "",
  };
}

export function blankRule(): WindowRule {
  return {
    id: uid(),
    name: "new-rule",
    classMatch: "",
    titleMatch: "",
    matchXwayland: "",
    matchFloat: "",
    matchFullscreen: "",
    matchPin: "",
    floatSet: "",
    pinSet: "",
    noFocus: false,
    opacity: "",
    size: "",
    move: "",
    workspace: "",
    rounding: "",
    borderSize: "",
    suppressEvent: "",
  };
}

export function blankBind(): Bind {
  return bind(uid(), ["SUPER"], "Return", "exec", "");
}

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2, 10);
}
