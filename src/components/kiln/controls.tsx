import type { ReactNode } from "react";
import type { ColorStop } from "@/lib/hypr/types";

const fieldClass =
  "h-11 w-full min-w-0 rounded-md border border-line bg-inset px-3 text-sm text-fg outline-none focus-visible:border-accent";

export function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-medium text-fg">{title}</h2>
        {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <input
        className={`${fieldClass} ${mono ? "font-mono" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <label className="block min-w-0">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-mono text-xs text-accent">{format ? format(value) : value}</span>
      </span>
      <input
        className="kiln-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-11 w-full items-center justify-between gap-4 rounded-md text-left"
    >
      <span className="min-w-0">
        <span className="block text-sm text-fg">{label}</span>
        {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      </span>
      <span className={`relative h-7 w-12 shrink-0 rounded-full ${checked ? "bg-accent" : "bg-line"}`}>
        <span
          className={`absolute top-0.5 size-6 rounded-full ${checked ? "left-5 bg-accent-ink" : "left-0.5 bg-fg"}`}
        />
      </span>
    </button>
  );
}

export function ColorStopField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ColorStop;
  onChange: (value: ColorStop) => void;
}) {
  return (
    <div className="min-w-0">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <div className="flex items-center gap-3">
        <input
          aria-label={`${label} color`}
          className="size-11 shrink-0 cursor-pointer rounded-md border border-line bg-inset p-1"
          type="color"
          value={value.hex}
          onChange={(event) => onChange({ ...value, hex: event.target.value })}
        />
        <label className="min-w-0 flex-1">
          <span className="sr-only">{label} alpha</span>
          <input
            className="kiln-range"
            type="range"
            min={0}
            max={1}
            step="any"
            value={value.alpha}
            onChange={(event) => onChange({ ...value, alpha: Number(event.target.value) })}
          />
        </label>
        <span className="w-10 shrink-0 text-right font-mono text-xs text-muted">
          {Math.round(value.alpha * 100)}
        </span>
      </div>
    </div>
  );
}

export function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex h-11 items-center rounded-md border px-3 font-mono text-xs ${
        pressed ? "border-accent bg-accent text-accent-ink" : "border-line bg-inset text-muted"
      }`}
    >
      {children}
    </button>
  );
}
