import type { ColorStop } from "./types";

export const A_EE = 238 / 255;
export const A_AA = 170 / 255;

export function stop(hex: string, alpha = 1): ColorStop {
  const clean = hex.startsWith("#") ? hex : `#${hex}`;
  return { hex: clean.slice(0, 7).toLowerCase(), alpha };
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function rgbaLiteral(c: ColorStop): string {
  const hex = c.hex.replace("#", "").slice(0, 6).toLowerCase().padEnd(6, "0");
  const a = clamp(Math.round(c.alpha * 255), 0, 255).toString(16).padStart(2, "0");
  return `rgba(${hex}${a})`;
}

export function shadowLiteral(c: ColorStop): string {
  const hex = c.hex.replace("#", "").slice(0, 6).toLowerCase().padEnd(6, "0");
  const a = clamp(Math.round(c.alpha * 255), 0, 255).toString(16).padStart(2, "0");
  return `0x${a}${hex}`;
}

export function stopToCss(c: ColorStop, alphaScale = 1): string {
  const hex = c.hex.replace("#", "").padEnd(6, "0");
  const r = Number.parseInt(hex.slice(0, 2), 16) || 0;
  const g = Number.parseInt(hex.slice(2, 4), 16) || 0;
  const b = Number.parseInt(hex.slice(4, 6), 16) || 0;
  const a = clamp(c.alpha * alphaScale, 0, 1);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
