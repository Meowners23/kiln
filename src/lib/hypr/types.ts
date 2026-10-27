export type LayoutName = "dwindle" | "master" | "scrolling" | "monocle";
export type MainMod = "SUPER" | "ALT" | "CTRL";
export type ModKey = "SUPER" | "SHIFT" | "CTRL" | "ALT";

export type ColorStop = { hex: string; alpha: number };

export type BindKind =
  | "exec"
  | "close"
  | "float"
  | "fullscreen"
  | "pseudo"
  | "togglesplit"
  | "focus-dir"
  | "focus-ws"
  | "move-ws"
  | "special"
  | "move-special"
  | "drag"
  | "resize"
  | "exit"
  | "cycle"
  | "pin"
  | "center"
  | "kill"
  | "raw";

export type Bind = {
  id: string;
  mods: ModKey[];
  key: string;
  kind: BindKind;
  arg: string;
  mouse: boolean;
  locked: boolean;
  repeating: boolean;
  release: boolean;
  description: string;
};

export type Tri = "" | "true" | "false";

export type WindowRule = {
  id: string;
  name: string;
  classMatch: string;
  titleMatch: string;
  matchXwayland: Tri;
  matchFloat: Tri;
  matchFullscreen: Tri;
  matchPin: Tri;
  floatSet: Tri;
  pinSet: Tri;
  noFocus: boolean;
  opacity: string;
  size: string;
  move: string;
  workspace: string;
  rounding: string;
  borderSize: string;
  suppressEvent: string;
};

export type Monitor = {
  id: string;
  output: string;
  mode: string;
  position: string;
  scale: string;
};

export type EnvVar = { id: string; key: string; value: string };

export type Gesture = {
  id: string;
  fingers: number;
  direction: string;
  action: string;
};

export type HyprConfig = {
  riceName: string;
  mainMod: MainMod;
  programs: { terminal: string; fileManager: string; menu: string };
  monitors: Monitor[];
  autostart: string[];
  autostartOn: boolean;
  env: EnvVar[];
  general: {
    gapsIn: number;
    gapsOut: number;
    borderSize: number;
    resizeOnBorder: boolean;
    allowTearing: boolean;
    layout: LayoutName;
    active: [ColorStop, ColorStop];
    activeAngle: number;
    inactive: ColorStop;
  };
  decoration: {
    rounding: number;
    roundingPower: number;
    activeOpacity: number;
    inactiveOpacity: number;
    shadowEnabled: boolean;
    shadowRange: number;
    shadowPower: number;
    shadow: ColorStop;
    blurEnabled: boolean;
    blurSize: number;
    blurPasses: number;
    blurVibrancy: number;
  };
  animationsEnabled: boolean;
  stockCurves: boolean;
  dwindlePreserveSplit: boolean;
  masterNewStatus: "master" | "slave" | "inherit";
  scrollingFullscreenOne: boolean;
  smartGaps: boolean;
  input: {
    kbLayout: string;
    kbVariant: string;
    followMouse: 0 | 1 | 2 | 3;
    sensitivity: number;
    naturalScroll: boolean;
  };
  gestures: Gesture[];
  miscForceWallpaper: -1 | 0 | 1;
  disableLogo: boolean;
  allowNewLayers: boolean;
  binds: Bind[];
  workspaceDigits: boolean;
  mouseModDrag: boolean;
  mediaKeys: boolean;
  scrollWorkspaces: boolean;
  specialName: string;
  rules: WindowRule[];
  includePermissionNotes: boolean;
  extraLua: string;
};

export type SectionId = "look" | "input" | "binds" | "rules" | "startup" | "system";

export const BIND_KINDS: { id: BindKind; label: string }[] = [
  { id: "exec", label: "Run command" },
  { id: "close", label: "Close window" },
  { id: "kill", label: "Kill window" },
  { id: "float", label: "Toggle float" },
  { id: "fullscreen", label: "Fullscreen" },
  { id: "pseudo", label: "Pseudotile" },
  { id: "togglesplit", label: "Toggle split" },
  { id: "focus-dir", label: "Focus direction" },
  { id: "focus-ws", label: "Focus workspace" },
  { id: "move-ws", label: "Move to workspace" },
  { id: "special", label: "Toggle special" },
  { id: "move-special", label: "Move to special" },
  { id: "cycle", label: "Cycle windows" },
  { id: "pin", label: "Pin window" },
  { id: "center", label: "Center window" },
  { id: "drag", label: "Drag window" },
  { id: "resize", label: "Resize window" },
  { id: "exit", label: "Exit Hyprland" },
  { id: "raw", label: "Raw dispatcher" },
];

export function kindNeedsArg(kind: BindKind): boolean {
  return kind === "exec" || kind === "focus-dir" || kind === "focus-ws" || kind === "move-ws" || kind === "raw";
}

export function defaultArg(kind: BindKind): string {
  switch (kind) {
    case "exec":
      return "kitty";
    case "focus-dir":
      return "left";
    case "focus-ws":
    case "move-ws":
      return "1";
    case "raw":
      return "hl.dsp.window.center()";
    default:
      return "";
  }
}
