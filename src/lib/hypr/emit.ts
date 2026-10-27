import { rgbaLiteral, shadowLiteral } from "./color";
import type { Bind, HyprConfig, Tri, WindowRule } from "./types";

function luaString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n")}"`;
}

function luaNum(value: number): string {
  if (!Number.isFinite(value)) return "0";
  const rounded = Math.round(value * 10000) / 10000;
  if (Number.isInteger(rounded)) return String(rounded);
  return String(rounded);
}

function commentSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim() || "kiln";
}

function execExpr(cmd: string, programs: HyprConfig["programs"]): string {
  if (cmd === programs.terminal) return "hl.dsp.exec_cmd(terminal)";
  if (cmd === programs.fileManager) return "hl.dsp.exec_cmd(fileManager)";
  if (cmd === programs.menu) return "hl.dsp.exec_cmd(menu)";
  return `hl.dsp.exec_cmd(${luaString(cmd)})`;
}

const MOD_ORDER: Bind["mods"][number][] = ["SUPER", "ALT", "CTRL", "SHIFT"];

function keyExpr(bind: Bind, mainMod: HyprConfig["mainMod"]): string {
  const mods = MOD_ORDER.filter((mod) => bind.mods.includes(mod));
  const usesMain = mods.includes(mainMod);
  if (usesMain) {
    const rest = mods.filter((mod) => mod !== mainMod);
    const tail = [...rest, bind.key].filter(Boolean);
    return tail.length ? `mainMod .. " + ${tail.join(" + ")}"` : "mainMod";
  }
  const literal = [...mods, bind.key].filter(Boolean).join(" + ");
  return luaString(literal);
}

function dispatcher(bind: Bind, config: HyprConfig): string {
  const special = config.specialName.trim() || "magic";
  switch (bind.kind) {
    case "exec":
      return execExpr(bind.arg.trim(), config.programs);
    case "close":
      return "hl.dsp.window.close()";
    case "kill":
      return "hl.dsp.window.kill()";
    case "float":
      return "hl.dsp.window.float()";
    case "fullscreen":
      return "hl.dsp.window.fullscreen()";
    case "pseudo":
      return "hl.dsp.window.pseudo()";
    case "togglesplit":
      return 'hl.dsp.layout("togglesplit")';
    case "focus-dir":
      return `hl.dsp.focus({ direction = ${luaString(bind.arg.trim() || "left")} })`;
    case "focus-ws":
      return workspaceCall("hl.dsp.focus", bind.arg);
    case "move-ws":
      return workspaceCall("hl.dsp.window.move", bind.arg);
    case "special":
      return `hl.dsp.workspace.toggle_special(${luaString(special)})`;
    case "move-special":
      return `hl.dsp.window.move({ workspace = ${luaString(`special:${special}`)} })`;
    case "drag":
      return "hl.dsp.window.drag()";
    case "resize":
      return "hl.dsp.window.resize()";
    case "exit":
      return `hl.dsp.exec_cmd(${luaString("command -v hyprshutdown >/dev/null 2>&1 && hyprshutdown || hyprctl dispatch 'hl.dsp.exit()'")})`;
    case "cycle":
      return "hl.dsp.window.cycle_next()";
    case "pin":
      return "hl.dsp.window.pin()";
    case "center":
      return "hl.dsp.window.center()";
    case "raw":
      return bind.arg.replace(/\s+/g, " ").trim() || "hl.dsp.window.close()";
    default:
      return "hl.dsp.window.close()";
  }
}

function workspaceCall(fn: string, arg: string): string {
  const trimmed = arg.trim();
  if (/^-?\d+$/.test(trimmed)) return `${fn}({ workspace = ${trimmed} })`;
  return `${fn}({ workspace = ${luaString(trimmed || "1")} })`;
}

function flagsOf(bind: Bind): string | null {
  const mouse = bind.mouse || /mouse/i.test(bind.key);
  const parts: string[] = [];
  if (mouse) parts.push("mouse = true");
  if (bind.locked) parts.push("locked = true");
  if (bind.repeating) parts.push("repeating = true");
  if (bind.release) parts.push("release = true");
  if (bind.description.trim()) parts.push(`description = ${luaString(bind.description.trim())}`);
  if (!parts.length) return null;
  return `{ ${parts.join(", ")} }`;
}

function emitBind(bind: Bind, config: HyprConfig): string | null {
  if (!bind.key.trim() && bind.kind !== "raw") return null;
  const flags = flagsOf(bind);
  const call = `hl.bind(${keyExpr(bind, config.mainMod)}, ${dispatcher(bind, config)}${flags ? `, ${flags}` : ""})`;
  return call;
}

function triBool(value: Tri): string | null {
  if (value === "true") return "true";
  if (value === "false") return "false";
  return null;
}

function emitRule(rule: WindowRule): string {
  const match: string[] = [];
  if (rule.classMatch.trim()) match.push(`class = ${luaString(rule.classMatch.trim())}`);
  if (rule.titleMatch.trim()) match.push(`title = ${luaString(rule.titleMatch.trim())}`);
  const xw = triBool(rule.matchXwayland);
  const mf = triBool(rule.matchFloat);
  const fs = triBool(rule.matchFullscreen);
  const mp = triBool(rule.matchPin);
  if (xw) match.push(`xwayland = ${xw}`);
  if (mf) match.push(`float = ${mf}`);
  if (fs) match.push(`fullscreen = ${fs}`);
  if (mp) match.push(`pin = ${mp}`);

  const body: string[] = [];
  body.push(`    name  = ${luaString(rule.name.trim() || "rule")},`);
  if (match.length === 1 && !match[0]?.includes("\n")) {
    body.push(`    match = { ${match[0]} },`);
  } else if (match.length > 1) {
    body.push("    match = {");
    for (const entry of match) body.push(`        ${entry},`);
    body.push("    },");
  } else {
    body.push("    match = {},");
  }

  const floatSet = triBool(rule.floatSet);
  const pinSet = triBool(rule.pinSet);
  if (floatSet) body.push(`    float = ${floatSet},`);
  if (pinSet) body.push(`    pin = ${pinSet},`);
  if (rule.noFocus) body.push("    no_focus = true,");
  if (rule.opacity.trim()) body.push(`    opacity = ${luaString(rule.opacity.trim())},`);
  if (rule.size.trim()) body.push(`    size = ${luaString(rule.size.trim())},`);
  if (rule.move.trim()) body.push(`    move = ${luaString(rule.move.trim())},`);
  if (rule.workspace.trim()) body.push(`    workspace = ${luaString(rule.workspace.trim())},`);
  if (rule.rounding.trim() && /^-?\d+(\.\d+)?$/.test(rule.rounding.trim())) {
    body.push(`    rounding = ${rule.rounding.trim()},`);
  }
  if (rule.borderSize.trim() && /^-?\d+(\.\d+)?$/.test(rule.borderSize.trim())) {
    body.push(`    border_size = ${rule.borderSize.trim()},`);
  }
  if (rule.suppressEvent.trim()) body.push(`    suppress_event = ${luaString(rule.suppressEvent.trim())},`);

  return `hl.window_rule({\n${body.join("\n")}\n})`;
}

const STOCK_CURVES = `hl.curve("easeOutQuint",   { type = "bezier", points = { {0.23, 1},    {0.32, 1}    } })
hl.curve("easeInOutCubic", { type = "bezier", points = { {0.65, 0.05}, {0.36, 1}    } })
hl.curve("linear",         { type = "bezier", points = { {0, 0},       {1, 1}       } })
hl.curve("almostLinear",   { type = "bezier", points = { {0.5, 0.5},   {0.75, 1}    } })
hl.curve("quick",          { type = "bezier", points = { {0.15, 0},    {0.1, 1}     } })

hl.curve("easy",           { type = "spring", mass = 1, stiffness = 238.1191, damping = 24.21279333 })

hl.animation({ leaf = "global",        enabled = true,  speed = 10,   bezier = "default" })
hl.animation({ leaf = "border",        enabled = true,  speed = 5.39, bezier = "easeOutQuint" })
hl.animation({ leaf = "windows",       enabled = true,  speed = 4.79, spring = "easy" })
hl.animation({ leaf = "windowsIn",     enabled = true,  speed = 4.1,  spring = "easy",         style = "popin 87%" })
hl.animation({ leaf = "windowsOut",    enabled = true,  speed = 1.49, bezier = "linear",       style = "popin 87%" })
hl.animation({ leaf = "fadeIn",        enabled = true,  speed = 1.73, bezier = "almostLinear" })
hl.animation({ leaf = "fadeOut",       enabled = true,  speed = 1.46, bezier = "almostLinear" })
hl.animation({ leaf = "fade",          enabled = true,  speed = 3.03, bezier = "quick" })
hl.animation({ leaf = "layers",        enabled = true,  speed = 3.81, bezier = "easeOutQuint" })
hl.animation({ leaf = "layersIn",      enabled = true,  speed = 4,    bezier = "easeOutQuint", style = "fade" })
hl.animation({ leaf = "layersOut",     enabled = true,  speed = 1.5,  bezier = "linear",       style = "fade" })
hl.animation({ leaf = "fadeLayersIn",  enabled = true,  speed = 1.79, bezier = "almostLinear" })
hl.animation({ leaf = "fadeLayersOut", enabled = true,  speed = 1.39, bezier = "almostLinear" })
hl.animation({ leaf = "workspaces",    enabled = true,  speed = 1.94, bezier = "almostLinear", style = "fade" })
hl.animation({ leaf = "workspacesIn",  enabled = true,  speed = 1.21, bezier = "almostLinear", style = "fade" })
hl.animation({ leaf = "workspacesOut", enabled = true,  speed = 1.94, bezier = "almostLinear", style = "fade" })
hl.animation({ leaf = "zoomFactor",    enabled = true,  speed = 7,    bezier = "quick" })`;

export function emitLua(config: HyprConfig): string {
  const g = config.general;
  const d = config.decoration;
  const lines: string[] = [];

  lines.push(`-- ${commentSafe(config.riceName)}`);
  lines.push("-- Hyprland 0.55+ Lua config, written with Kiln.");
  lines.push("-- https://wiki.hypr.land/configuring/");
  lines.push("-- Save as ~/.config/hypr/hyprland.lua and run: hyprctl reload");
  lines.push("");
  lines.push("------------------");
  lines.push("---- MONITORS ----");
  lines.push("------------------");
  lines.push("");
  for (const monitor of config.monitors) {
    lines.push("hl.monitor({");
    lines.push(`    output   = ${luaString(monitor.output)},`);
    lines.push(`    mode     = ${luaString(monitor.mode || "preferred")},`);
    lines.push(`    position = ${luaString(monitor.position || "auto")},`);
    lines.push(`    scale    = ${luaString(monitor.scale || "auto")},`);
    lines.push("})");
    lines.push("");
  }

  lines.push("---------------------");
  lines.push("---- MY PROGRAMS ----");
  lines.push("---------------------");
  lines.push("");
  lines.push(`local terminal    = ${luaString(config.programs.terminal || "kitty")}`);
  lines.push(`local fileManager = ${luaString(config.programs.fileManager || "dolphin")}`);
  lines.push(`local menu        = ${luaString(config.programs.menu || "hyprlauncher")}`);
  lines.push("");

  lines.push("-------------------");
  lines.push("---- AUTOSTART ----");
  lines.push("-------------------");
  lines.push("");
  const commands = config.autostart.map((item) => item.trim()).filter(Boolean);
  if (config.autostartOn && commands.length) {
    lines.push('hl.on("hyprland.start", function ()');
    for (const command of commands) lines.push(`    hl.exec_cmd(${luaString(command)})`);
    lines.push("end)");
  } else {
    lines.push("-- hl.on(\"hyprland.start\", function ()");
    if (commands.length) {
      for (const command of commands) lines.push(`--     hl.exec_cmd(${luaString(command)})`);
    } else {
      lines.push("--     hl.exec_cmd(terminal)");
      lines.push('--     hl.exec_cmd("waybar")');
    }
    lines.push("-- end)");
  }
  lines.push("");

  lines.push("-------------------------------");
  lines.push("---- ENVIRONMENT VARIABLES ----");
  lines.push("-------------------------------");
  lines.push("");
  const env = config.env.filter((item) => item.key.trim());
  if (!env.length) lines.push('-- hl.env("XCURSOR_SIZE", "24")');
  for (const item of env) lines.push(`hl.env(${luaString(item.key.trim())}, ${luaString(item.value)})`);
  lines.push("");

  if (config.includePermissionNotes) {
    lines.push("-----------------------");
    lines.push("----- PERMISSIONS -----");
    lines.push("-----------------------");
    lines.push("");
    lines.push("-- Permission changes require a Hyprland restart.");
    lines.push("-- hl.config({ ecosystem = { enforce_permissions = true } })");
    lines.push('-- hl.permission("/usr/(bin|local/bin)/grim", "screencopy", "allow")');
    lines.push('-- hl.permission("/usr/(lib|libexec|lib64)/xdg-desktop-portal-hyprland", "screencopy", "allow")');
    lines.push("");
  }

  lines.push("-----------------------");
  lines.push("---- LOOK AND FEEL ----");
  lines.push("-----------------------");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    general = {");
  lines.push(`        gaps_in = ${luaNum(g.gapsIn)},`);
  lines.push(`        gaps_out = ${luaNum(g.gapsOut)},`);
  lines.push(`        border_size = ${luaNum(g.borderSize)},`);
  lines.push("        col = {");
  lines.push(
    `            active_border = { colors = {${luaString(rgbaLiteral(g.active[0]))}, ${luaString(rgbaLiteral(g.active[1]))}}, angle = ${luaNum(g.activeAngle)} },`,
  );
  lines.push(`            inactive_border = ${luaString(rgbaLiteral(g.inactive))},`);
  lines.push("        },");
  lines.push(`        resize_on_border = ${g.resizeOnBorder ? "true" : "false"},`);
  lines.push(`        allow_tearing = ${g.allowTearing ? "true" : "false"},`);
  lines.push(`        layout = ${luaString(g.layout)},`);
  lines.push("    },");
  lines.push("    decoration = {");
  lines.push(`        rounding = ${luaNum(d.rounding)},`);
  lines.push(`        rounding_power = ${luaNum(d.roundingPower)},`);
  lines.push(`        active_opacity = ${luaNum(d.activeOpacity)},`);
  lines.push(`        inactive_opacity = ${luaNum(d.inactiveOpacity)},`);
  lines.push("        shadow = {");
  lines.push(`            enabled = ${d.shadowEnabled ? "true" : "false"},`);
  lines.push(`            range = ${luaNum(d.shadowRange)},`);
  lines.push(`            render_power = ${luaNum(d.shadowPower)},`);
  lines.push(`            color = ${shadowLiteral(d.shadow)},`);
  lines.push("        },");
  lines.push("        blur = {");
  lines.push(`            enabled = ${d.blurEnabled ? "true" : "false"},`);
  lines.push(`            size = ${luaNum(d.blurSize)},`);
  lines.push(`            passes = ${luaNum(d.blurPasses)},`);
  lines.push(`            vibrancy = ${luaNum(d.blurVibrancy)},`);
  lines.push("        },");
  lines.push("    },");
  lines.push("    animations = {");
  lines.push(`        enabled = ${config.animationsEnabled ? "true" : "false"},`);
  lines.push("    },");
  lines.push("})");
  lines.push("");

  if (config.stockCurves) {
    lines.push("-- Default curves. https://wiki.hypr.land/configuring/core/animations/");
    lines.push(STOCK_CURVES);
    lines.push("");
  }

  if (config.smartGaps) {
    lines.push('-- Smart gaps: no gaps on the only tiled window / fullscreen.');
    lines.push('hl.workspace_rule({ workspace = "w[tv1]", gaps_out = 0, gaps_in = 0 })');
    lines.push('hl.workspace_rule({ workspace = "f[1]", gaps_out = 0, gaps_in = 0 })');
    lines.push("hl.window_rule({");
    lines.push('    name = "no-gaps-wtv1",');
    lines.push('    match = { float = false, workspace = "w[tv1]" },');
    lines.push("    border_size = 0,");
    lines.push("    rounding = 0,");
    lines.push("})");
    lines.push("hl.window_rule({");
    lines.push('    name = "no-gaps-f1",');
    lines.push('    match = { float = false, workspace = "f[1]" },');
    lines.push("    border_size = 0,");
    lines.push("    rounding = 0,");
    lines.push("})");
    lines.push("");
  }

  lines.push("hl.config({");
  lines.push("    dwindle = {");
  lines.push(`        preserve_split = ${config.dwindlePreserveSplit ? "true" : "false"},`);
  lines.push("    },");
  lines.push("})");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    master = {");
  lines.push(`        new_status = ${luaString(config.masterNewStatus)},`);
  lines.push("    },");
  lines.push("})");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    scrolling = {");
  lines.push(`        fullscreen_on_one_column = ${config.scrollingFullscreenOne ? "true" : "false"},`);
  lines.push("    },");
  lines.push("})");
  lines.push("");

  lines.push("----------------");
  lines.push("----  MISC  ----");
  lines.push("----------------");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    misc = {");
  lines.push(`        force_default_wallpaper = ${luaNum(config.miscForceWallpaper)},`);
  lines.push(`        disable_hyprland_logo = ${config.disableLogo ? "true" : "false"},`);
  lines.push("    },");
  lines.push("})");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    layers = {");
  lines.push(
    `        allow_new_top_layers_over_existing_fullscreen = ${config.allowNewLayers ? "true" : "false"},`,
  );
  lines.push("    },");
  lines.push("})");
  lines.push("");

  lines.push("---------------");
  lines.push("---- INPUT ----");
  lines.push("---------------");
  lines.push("");
  lines.push("hl.config({");
  lines.push("    input = {");
  lines.push(`        kb_layout = ${luaString(config.input.kbLayout || "us")},`);
  if (config.input.kbVariant.trim()) {
    lines.push(`        kb_variant = ${luaString(config.input.kbVariant.trim())},`);
  }
  lines.push(`        follow_mouse = ${luaNum(config.input.followMouse)},`);
  lines.push(`        sensitivity = ${luaNum(config.input.sensitivity)},`);
  lines.push("        touchpad = {");
  lines.push(`            natural_scroll = ${config.input.naturalScroll ? "true" : "false"},`);
  lines.push("        },");
  lines.push("    },");
  lines.push("})");
  lines.push("");
  for (const gesture of config.gestures) {
    if (!gesture.direction.trim() || !gesture.action.trim()) continue;
    lines.push("hl.gesture({");
    lines.push(`    fingers = ${luaNum(gesture.fingers)},`);
    lines.push(`    direction = ${luaString(gesture.direction.trim())},`);
    lines.push(`    action = ${luaString(gesture.action.trim())},`);
    lines.push("})");
    lines.push("");
  }

  lines.push("---------------------");
  lines.push("---- KEYBINDINGS ----");
  lines.push("---------------------");
  lines.push("");
  lines.push(`local mainMod = ${luaString(config.mainMod)}`);
  lines.push("");
  for (const bind of config.binds) {
    const line = emitBind(bind, config);
    if (line) lines.push(line);
  }
  lines.push("");

  if (config.workspaceDigits) {
    lines.push("for i = 1, 10 do");
    lines.push("    local key = i % 10");
    lines.push('    hl.bind(mainMod .. " + " .. key, hl.dsp.focus({ workspace = i }))');
    lines.push('    hl.bind(mainMod .. " + SHIFT + " .. key, hl.dsp.window.move({ workspace = i }))');
    lines.push("end");
    lines.push("");
  }

  if (config.scrollWorkspaces) {
    lines.push('hl.bind(mainMod .. " + mouse_down", hl.dsp.focus({ workspace = "e+1" }))');
    lines.push('hl.bind(mainMod .. " + mouse_up", hl.dsp.focus({ workspace = "e-1" }))');
    lines.push("");
  }

  if (config.mouseModDrag) {
    lines.push('hl.bind(mainMod .. " + mouse:272", hl.dsp.window.drag(), { mouse = true })');
    lines.push('hl.bind(mainMod .. " + mouse:273", hl.dsp.window.resize(), { mouse = true })');
    lines.push("");
  }

  if (config.mediaKeys) {
    lines.push(
      'hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume -l 1 @DEFAULT_AUDIO_SINK@ 5%+"), { locked = true, repeating = true })',
    );
    lines.push(
      'hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { locked = true, repeating = true })',
    );
    lines.push(
      'hl.bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), { locked = true })',
    );
    lines.push(
      'hl.bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"), { locked = true })',
    );
    lines.push(
      'hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%+"), { locked = true, repeating = true })',
    );
    lines.push(
      'hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%-"), { locked = true, repeating = true })',
    );
    lines.push('hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { locked = true })');
    lines.push('hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })');
    lines.push('hl.bind("XF86AudioPause", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })');
    lines.push('hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), { locked = true })');
    lines.push("");
  }

  lines.push("--------------------------------");
  lines.push("---- WINDOWS AND WORKSPACES ----");
  lines.push("--------------------------------");
  lines.push("");
  if (!config.rules.length) {
    lines.push("-- No window rules.");
  }
  for (const rule of config.rules) {
    lines.push(emitRule(rule));
    lines.push("");
  }

  if (config.extraLua.trim()) {
    lines.push("-------------------");
    lines.push("---- EXTRA LUA ----");
    lines.push("-------------------");
    lines.push("");
    lines.push(config.extraLua.replace(/\s+$/, ""));
    lines.push("");
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}
