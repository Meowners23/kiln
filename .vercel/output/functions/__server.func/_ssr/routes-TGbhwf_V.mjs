import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Power, c as KeyRound, d as AppWindow, i as Settings2, l as Download, n as Trash2, o as Plus, r as SwatchBook, s as Keyboard, u as Copy } from "../_libs/lucide-react.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-TGbhwf_V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var A_EE = 238 / 255;
var A_AA = 170 / 255;
function stop(hex, alpha = 1) {
	return {
		hex: (hex.startsWith("#") ? hex : `#${hex}`).slice(0, 7).toLowerCase(),
		alpha
	};
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function rgbaLiteral(c) {
	return `rgba(${c.hex.replace("#", "").slice(0, 6).toLowerCase().padEnd(6, "0")}${clamp(Math.round(c.alpha * 255), 0, 255).toString(16).padStart(2, "0")})`;
}
function shadowLiteral(c) {
	const hex = c.hex.replace("#", "").slice(0, 6).toLowerCase().padEnd(6, "0");
	return `0x${clamp(Math.round(c.alpha * 255), 0, 255).toString(16).padStart(2, "0")}${hex}`;
}
function stopToCss(c, alphaScale = 1) {
	const hex = c.hex.replace("#", "").padEnd(6, "0");
	return `rgba(${Number.parseInt(hex.slice(0, 2), 16) || 0}, ${Number.parseInt(hex.slice(2, 4), 16) || 0}, ${Number.parseInt(hex.slice(4, 6), 16) || 0}, ${clamp(c.alpha * alphaScale, 0, 1)})`;
}
function Win({ title, active, config }) {
	const { general: g, decoration: d } = config;
	const gradient = `linear-gradient(${g.activeAngle}deg, ${stopToCss(g.active[0])}, ${stopToCss(g.active[1])})`;
	const inactive = stopToCss(g.inactive);
	const fill = "linear-gradient(var(--color-elevated), var(--color-elevated)) padding-box";
	const edge = active ? gradient : `linear-gradient(${inactive}, ${inactive})`;
	const shadow = d.shadowEnabled ? `0 ${Math.max(6, d.shadowRange)}px ${Math.max(10, d.shadowRange * 3)}px ${stopToCss(d.shadow)}` : "none";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
		style: {
			borderRadius: d.rounding,
			opacity: active ? d.activeOpacity : d.inactiveOpacity,
			boxShadow: shadow,
			border: `${g.borderSize}px solid transparent`,
			background: `${fill}, ${edge} border-box`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-6 shrink-0 items-center gap-1.5 px-2",
			style: { background: "color-mix(in oklab, var(--color-fg) 6%, transparent)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-1.5 shrink-0 rounded-full",
				style: { background: active ? stopToCss(g.active[0]) : "var(--color-faint)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate font-mono text-xs text-muted",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-end p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-faint",
				children: active ? "focused" : "idle"
			})
		})]
	});
}
function DesktopPreview({ config }) {
	const { general: g, decoration: d, programs } = config;
	const wallpaper = {
		backgroundColor: "var(--color-inset)",
		backgroundImage: `radial-gradient(120% 90% at 0% 0%, ${stopToCss(g.active[0], .55)}, transparent 58%), radial-gradient(90% 80% at 100% 100%, ${stopToCss(g.active[1], .4)}, transparent 52%)`
	};
	const pad = Math.min(16, Math.round(g.gapsOut * .6));
	const gap = Math.min(12, Math.round(g.gapsIn * .7));
	const term = programs.terminal || "terminal";
	const files = programs.fileManager || "files";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 pb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-fg",
					children: "Desktop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-faint",
					children: [
						g.layout,
						" · ",
						g.gapsIn,
						"/",
						g.gapsOut
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-lg border border-line",
				style: wallpaper,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-8 items-center justify-between px-2",
						style: { background: "color-mix(in oklab, var(--color-bg) 70%, transparent)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((workspace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid size-5 place-items-center rounded-sm font-mono text-xs ${workspace === 1 ? "bg-accent text-accent-ink" : "text-muted"}`,
								children: workspace
							}, workspace))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-xs text-muted",
							children: config.riceName || "kiln"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-48 overflow-hidden sm:h-64",
						style: { padding: pad },
						children: [
							g.layout === "master" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid h-full grid-cols-5",
								style: { gap },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-3 flex min-w-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										active: true,
										title: term,
										config
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 flex min-w-0 flex-col",
									style: { gap },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: "Firefox",
										config
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: files,
										config
									})]
								})]
							}) : null,
							g.layout === "scrolling" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid h-full grid-cols-3",
								style: { gap },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										active: true,
										title: term,
										config
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: "Firefox",
										config
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: files,
										config
									})
								]
							}) : null,
							g.layout === "monocle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
									active: true,
									title: term,
									config
								})
							}) : null,
							g.layout === "dwindle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid h-full grid-cols-5",
								style: { gap },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-3 flex min-w-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										active: true,
										title: term,
										config
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 flex min-w-0 flex-col",
									style: { gap },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: "Firefox",
										config
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Win, {
										title: files,
										config
									})]
								})]
							}) : null
						]
					}),
					d.blurEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-3 bottom-3 max-w-44 border border-line px-3 py-2",
						style: {
							borderRadius: Math.max(4, Math.min(d.rounding, 16)),
							background: "color-mix(in oklab, var(--color-inset) 42%, transparent)",
							backdropFilter: `blur(${Math.max(4, d.blurSize * Math.max(1, d.blurPasses) * 2)}px)`
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-fg",
							children: "notification"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								"blur ",
								d.blurSize,
								" × ",
								d.blurPasses
							]
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-faint",
				children: "Preview only — gaps, radius, border, opacity, and blur. Not a running compositor."
			})
		]
	});
}
var KEYWORDS = /* @__PURE__ */ new Set([
	"local",
	"function",
	"end",
	"for",
	"do",
	"then",
	"else",
	"elseif",
	"if",
	"true",
	"false",
	"nil",
	"and",
	"or",
	"not",
	"in",
	"return"
]);
function tokenize(line) {
	const out = [];
	let i = 0;
	while (i < line.length) {
		if (line.startsWith("--", i)) {
			out.push({
				text: line.slice(i),
				kind: "cmt"
			});
			break;
		}
		const ch = line[i] ?? "";
		if (ch === "\"" || ch === "'") {
			let j = i + 1;
			while (j < line.length) {
				if (line[j] === "\\") {
					j += 2;
					continue;
				}
				if (line[j] === ch) {
					j += 1;
					break;
				}
				j += 1;
			}
			out.push({
				text: line.slice(i, j),
				kind: "str"
			});
			i = j;
			continue;
		}
		if (/[0-9]/.test(ch)) {
			let j = i + 1;
			while (j < line.length && /[0-9a-fA-FxX.]/.test(line[j] ?? "")) j += 1;
			out.push({
				text: line.slice(i, j),
				kind: "num"
			});
			i = j;
			continue;
		}
		if (/[A-Za-z_]/.test(ch)) {
			let j = i + 1;
			while (j < line.length && /[A-Za-z0-9_]/.test(line[j] ?? "")) j += 1;
			const word = line.slice(i, j);
			out.push({
				text: word,
				kind: KEYWORDS.has(word) ? "kw" : "plain"
			});
			i = j;
			continue;
		}
		out.push({
			text: ch,
			kind: "plain"
		});
		i += 1;
	}
	return out;
}
var kindClass = {
	plain: "text-fg",
	kw: "text-fg font-medium",
	str: "text-accent",
	cmt: "text-faint",
	num: "text-muted"
};
function LuaView({ source }) {
	const lines = source.split("\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "lua-source min-h-0 border-t border-line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
				className: "flex min-h-11 items-center justify-between px-4 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted",
					children: "hyprland.lua"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-faint",
					children: [lines.length, " lines"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-2 max-lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted",
					children: "hyprland.lua"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-faint",
					children: [lines.length, " lines"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "m-0 max-h-80 min-h-0 overflow-auto px-2 pb-4 font-mono text-xs leading-5 lg:max-h-none lg:flex-1",
				children: lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-8 shrink-0 pr-2 text-right text-faint select-none",
						children: index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "min-w-0 whitespace-pre",
						children: line.length === 0 ? " " : tokenize(line).map((tok, tokIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: kindClass[tok.kind],
							children: tok.text
						}, tokIndex))
					})]
				}, `${index}-${line.slice(0, 12)}`))
			})
		]
	});
}
var fieldClass = "h-11 w-full min-w-0 rounded-md border border-line bg-inset px-3 text-sm text-fg outline-none focus-visible:border-accent";
function Group({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium text-fg",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: hint
		}) : null] }), children]
	});
}
function TextField({ label, value, onChange, placeholder, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: `${fieldClass} ${mono ? "font-mono" : ""}`,
			value,
			placeholder,
			onChange: (event) => onChange(event.target.value)
		})]
	});
}
function SelectField({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: fieldClass,
			value,
			onChange: (event) => onChange(event.target.value),
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option.value,
				children: option.label
			}, option.value))
		})]
	});
}
function SliderField({ label, value, min, max, step, onChange, format }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-baseline justify-between gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-accent",
				children: format ? format(value) : value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "kiln-range",
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
function ToggleRow({ label, hint, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		onClick: () => onChange(!checked),
		className: "flex min-h-11 w-full items-center justify-between gap-4 rounded-md text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm text-fg",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-xs text-muted",
				children: hint
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `relative h-7 w-12 shrink-0 rounded-full ${checked ? "bg-accent" : "bg-line"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 size-6 rounded-full ${checked ? "left-5 bg-accent-ink" : "left-0.5 bg-fg"}` })
		})]
	});
}
function ColorStopField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": `${label} color`,
					className: "size-11 shrink-0 cursor-pointer rounded-md border border-line bg-inset p-1",
					type: "color",
					value: value.hex,
					onChange: (event) => onChange({
						...value,
						hex: event.target.value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "sr-only",
						children: [label, " alpha"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "kiln-range",
						type: "range",
						min: 0,
						max: 1,
						step: "any",
						value: value.alpha,
						onChange: (event) => onChange({
							...value,
							alpha: Number(event.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-10 shrink-0 text-right font-mono text-xs text-muted",
					children: Math.round(value.alpha * 100)
				})
			]
		})]
	});
}
function Chip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: `inline-flex h-11 items-center rounded-md border px-3 font-mono text-xs ${pressed ? "border-accent bg-accent text-accent-ink" : "border-line bg-inset text-muted"}`,
		children
	});
}
function paint(config, look) {
	return {
		...config,
		general: {
			...config.general,
			gapsIn: look.gapsIn,
			gapsOut: look.gapsOut,
			borderSize: look.border,
			active: [stop(look.active[0], A_EE), stop(look.active[1], A_EE)],
			activeAngle: look.angle ?? 45,
			inactive: stop(look.inactive, A_AA)
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
			inactiveOpacity: look.inactiveOpacity ?? 1
		}
	};
}
var PRESETS = [
	{
		id: "default",
		name: "Hyprland",
		note: "Example cyan / mint",
		swatch: ["#33ccff", "#00ff99"],
		apply: (c) => paint(c, {
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
			shadow: true
		})
	},
	{
		id: "catppuccin",
		name: "Catppuccin",
		note: "Mocha mauve",
		swatch: ["#f5e0dc", "#cba6f7"],
		apply: (c) => paint(c, {
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
			inactiveOpacity: .92
		})
	},
	{
		id: "tokyo",
		name: "Tokyo Night",
		note: "Storm blue",
		swatch: ["#7aa2f7", "#bb9af7"],
		apply: (c) => paint(c, {
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
			inactiveOpacity: .94
		})
	},
	{
		id: "nord",
		name: "Nord",
		note: "Frost",
		swatch: ["#88c0d0", "#81a1c1"],
		apply: (c) => paint(c, {
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
			shadowHex: "#2e3440"
		})
	},
	{
		id: "rose",
		name: "Rosé Pine",
		note: "Dawn iris",
		swatch: ["#ebbcba", "#c4a7e7"],
		apply: (c) => paint(c, {
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
			inactiveOpacity: .9
		})
	},
	{
		id: "gruvbox",
		name: "Gruvbox",
		note: "Hard edges",
		swatch: ["#fabd2f", "#fe8019"],
		apply: (c) => paint(c, {
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
			shadowHex: "#1d2021"
		})
	}
];
function applyPreset(config, id) {
	const preset = PRESETS.find((item) => item.id === id);
	return preset ? preset.apply(config) : config;
}
function matchingPreset(config) {
	const [a, b] = config.general.active;
	return PRESETS.find((preset) => preset.swatch[0].toLowerCase() === a.hex.toLowerCase() && preset.swatch[1].toLowerCase() === b.hex.toLowerCase())?.id ?? null;
}
function bind(id, mods, key, kind, arg = "", extra = {}) {
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
		description: extra.description ?? ""
	};
}
function rule(partial) {
	return partial;
}
function defaultConfig() {
	return {
		riceName: "kiln",
		mainMod: "SUPER",
		programs: {
			terminal: "kitty",
			fileManager: "dolphin",
			menu: "hyprlauncher"
		},
		monitors: [{
			id: "m1",
			output: "",
			mode: "preferred",
			position: "auto",
			scale: "auto"
		}],
		autostart: [],
		autostartOn: false,
		env: [{
			id: "e1",
			key: "XCURSOR_SIZE",
			value: "24"
		}, {
			id: "e2",
			key: "HYPRCURSOR_SIZE",
			value: "24"
		}],
		general: {
			gapsIn: 5,
			gapsOut: 20,
			borderSize: 2,
			resizeOnBorder: false,
			allowTearing: false,
			layout: "dwindle",
			active: [stop("#33ccff", A_EE), stop("#00ff99", A_EE)],
			activeAngle: 45,
			inactive: stop("#595959", A_AA)
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
			blurVibrancy: .1696
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
			naturalScroll: false
		},
		gestures: [{
			id: "g1",
			fingers: 3,
			direction: "horizontal",
			action: "workspace"
		}],
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
			bind("b14", ["SUPER", "SHIFT"], "S", "move-special")
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
				suppressEvent: "maximize"
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
				suppressEvent: ""
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
				suppressEvent: ""
			})
		],
		includePermissionNotes: true,
		extraLua: ""
	};
}
function blankRule() {
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
		suppressEvent: ""
	};
}
function blankBind() {
	return bind(uid(), ["SUPER"], "Return", "exec", "");
}
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return Math.random().toString(36).slice(2, 10);
}
var memory = /* @__PURE__ */ new Map();
var memoryStorage = {
	getItem: (name) => memory.get(name) ?? null,
	setItem: (name, value) => {
		memory.set(name, value);
	},
	removeItem: (name) => {
		memory.delete(name);
	}
};
function mergeConfig(saved) {
	const base = defaultConfig();
	if (!saved || typeof saved !== "object") return base;
	const raw = saved;
	return {
		...base,
		...raw,
		programs: {
			...base.programs,
			...raw.programs
		},
		general: {
			...base.general,
			...raw.general,
			active: raw.general?.active?.length === 2 ? raw.general.active : base.general.active
		},
		decoration: {
			...base.decoration,
			...raw.decoration
		},
		input: {
			...base.input,
			...raw.input
		},
		monitors: Array.isArray(raw.monitors) && raw.monitors.length ? raw.monitors : base.monitors,
		env: Array.isArray(raw.env) ? raw.env : base.env,
		binds: Array.isArray(raw.binds) ? raw.binds : base.binds,
		rules: Array.isArray(raw.rules) ? raw.rules : base.rules,
		gestures: Array.isArray(raw.gestures) ? raw.gestures : base.gestures,
		autostart: Array.isArray(raw.autostart) ? raw.autostart : base.autostart
	};
}
function dedupeMods(mods) {
	const seen = /* @__PURE__ */ new Set();
	const next = [];
	for (const mod of mods) {
		if (seen.has(mod)) continue;
		seen.add(mod);
		next.push(mod);
	}
	return next;
}
var useKiln = create()(persist((set) => ({
	config: defaultConfig(),
	section: "look",
	setSection: (section) => set({ section }),
	patch: (recipe) => set((state) => {
		const next = structuredClone(state.config);
		recipe(next);
		return { config: next };
	}),
	applyLook: (id) => set((state) => ({ config: applyPreset(state.config, id) })),
	reset: () => set({
		config: defaultConfig(),
		section: "look"
	}),
	setMainMod: (next) => set((state) => {
		const prev = state.config.mainMod;
		const config = structuredClone(state.config);
		config.mainMod = next;
		config.binds = config.binds.map((bind) => ({
			...bind,
			mods: dedupeMods(bind.mods.map((mod) => mod === prev ? next : mod))
		}));
		return { config };
	}),
	addBind: () => set((state) => {
		const config = structuredClone(state.config);
		const created = {
			...blankBind(),
			mods: [config.mainMod]
		};
		config.binds.push(created);
		return { config };
	}),
	addRule: () => set((state) => {
		const config = structuredClone(state.config);
		const created = blankRule();
		config.rules.push(created);
		return { config };
	}),
	addMonitor: () => set((state) => {
		const config = structuredClone(state.config);
		config.monitors.push({
			id: uid(),
			output: "DP-2",
			mode: "preferred",
			position: "auto",
			scale: "1"
		});
		return { config };
	}),
	addEnv: () => set((state) => {
		const config = structuredClone(state.config);
		config.env.push({
			id: uid(),
			key: "",
			value: ""
		});
		return { config };
	}),
	addGesture: () => set((state) => {
		const config = structuredClone(state.config);
		config.gestures.push({
			id: uid(),
			fingers: 3,
			direction: "vertical",
			action: "special"
		});
		return { config };
	}),
	addAutostart: () => set((state) => {
		const config = structuredClone(state.config);
		config.autostart.push("");
		config.autostartOn = true;
		return { config };
	})
}), {
	name: "kiln-hyprland-v1",
	skipHydration: true,
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	partialize: (state) => ({ config: state.config }),
	merge: (persisted, current) => {
		const saved = persisted;
		return {
			...current,
			config: mergeConfig(saved?.config)
		};
	}
}));
var BIND_KINDS = [
	{
		id: "exec",
		label: "Run command"
	},
	{
		id: "close",
		label: "Close window"
	},
	{
		id: "kill",
		label: "Kill window"
	},
	{
		id: "float",
		label: "Toggle float"
	},
	{
		id: "fullscreen",
		label: "Fullscreen"
	},
	{
		id: "pseudo",
		label: "Pseudotile"
	},
	{
		id: "togglesplit",
		label: "Toggle split"
	},
	{
		id: "focus-dir",
		label: "Focus direction"
	},
	{
		id: "focus-ws",
		label: "Focus workspace"
	},
	{
		id: "move-ws",
		label: "Move to workspace"
	},
	{
		id: "special",
		label: "Toggle special"
	},
	{
		id: "move-special",
		label: "Move to special"
	},
	{
		id: "cycle",
		label: "Cycle windows"
	},
	{
		id: "pin",
		label: "Pin window"
	},
	{
		id: "center",
		label: "Center window"
	},
	{
		id: "drag",
		label: "Drag window"
	},
	{
		id: "resize",
		label: "Resize window"
	},
	{
		id: "exit",
		label: "Exit Hyprland"
	},
	{
		id: "raw",
		label: "Raw dispatcher"
	}
];
function kindNeedsArg(kind) {
	return kind === "exec" || kind === "focus-dir" || kind === "focus-ws" || kind === "move-ws" || kind === "raw";
}
function defaultArg(kind) {
	switch (kind) {
		case "exec": return "kitty";
		case "focus-dir": return "left";
		case "focus-ws":
		case "move-ws": return "1";
		case "raw": return "hl.dsp.window.center()";
		default: return "";
	}
}
var MODS = [
	"SUPER",
	"SHIFT",
	"CTRL",
	"ALT"
];
var LAYOUTS = [
	{
		id: "us",
		label: "English (US)",
		layout: "us",
		variant: ""
	},
	{
		id: "dvorak",
		label: "US Dvorak",
		layout: "us",
		variant: "dvorak"
	},
	{
		id: "colemak",
		label: "US Colemak",
		layout: "us",
		variant: "colemak"
	},
	{
		id: "gb",
		label: "English (UK)",
		layout: "gb",
		variant: ""
	},
	{
		id: "de",
		label: "German",
		layout: "de",
		variant: ""
	},
	{
		id: "fr",
		label: "French",
		layout: "fr",
		variant: ""
	},
	{
		id: "es",
		label: "Spanish",
		layout: "es",
		variant: ""
	},
	{
		id: "br",
		label: "Portuguese (Brazil)",
		layout: "br",
		variant: ""
	},
	{
		id: "jp",
		label: "Japanese",
		layout: "jp",
		variant: ""
	},
	{
		id: "ru",
		label: "Russian",
		layout: "ru",
		variant: ""
	},
	{
		id: "custom",
		label: "Custom",
		layout: "",
		variant: ""
	}
];
function layoutId(layout, variant) {
	return LAYOUTS.find((item) => item.id !== "custom" && item.layout === layout && item.variant === variant)?.id ?? "custom";
}
function TriSelect({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
		label,
		value,
		onChange: (next) => {
			if (next === "" || next === "true" || next === "false") onChange(next);
		},
		options: [
			{
				value: "",
				label: "Unset"
			},
			{
				value: "true",
				label: "True"
			},
			{
				value: "false",
				label: "False"
			}
		]
	});
}
function LookPanel() {
	const config = useKiln((state) => state.config);
	const patch = useKiln((state) => state.patch);
	const applyLook = useKiln((state) => state.applyLook);
	const active = matchingPreset(config);
	const g = config.general;
	const d = config.decoration;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Rices",
				hint: "Swaps color, gaps, radius, blur, and shadow. Binds stay.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => applyLook(preset.id),
						className: `flex h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-sm ${active === preset.id ? "border-accent text-fg" : "border-line text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex overflow-hidden rounded-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-4 w-2",
								style: { background: preset.swatch[0] }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-4 w-2",
								style: { background: preset.swatch[1] }
							})]
						}), preset.name]
					}, preset.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Layout",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "Algorithm",
							value: g.layout,
							onChange: (value) => patch((draft) => {
								if (value === "dwindle" || value === "master" || value === "scrolling" || value === "monocle") draft.general.layout = value;
							}),
							options: [
								{
									value: "dwindle",
									label: "Dwindle"
								},
								{
									value: "master",
									label: "Master"
								},
								{
									value: "scrolling",
									label: "Scrolling"
								},
								{
									value: "monocle",
									label: "Monocle"
								}
							]
						}),
						g.layout === "dwindle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								label: "Preserve split",
								hint: "Remember dwindle split direction.",
								checked: config.dwindlePreserveSplit,
								onChange: (checked) => patch((draft) => {
									draft.dwindlePreserveSplit = checked;
								})
							})
						}) : null,
						g.layout === "master" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							label: "New window",
							value: config.masterNewStatus,
							onChange: (value) => patch((draft) => {
								if (value === "master" || value === "slave" || value === "inherit") draft.masterNewStatus = value;
							}),
							options: [
								{
									value: "master",
									label: "Open as master"
								},
								{
									value: "slave",
									label: "Open as stack"
								},
								{
									value: "inherit",
									label: "Inherit"
								}
							]
						}) : null,
						g.layout === "scrolling" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								label: "Fullscreen one column",
								checked: config.scrollingFullscreenOne,
								onChange: (checked) => patch((draft) => {
									draft.scrollingFullscreenOne = checked;
								})
							})
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Gaps and border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-x-6 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Inner gaps",
								value: g.gapsIn,
								min: 0,
								max: 80,
								step: 1,
								format: (n) => `${n}px`,
								onChange: (value) => patch((draft) => {
									draft.general.gapsIn = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Outer gaps",
								value: g.gapsOut,
								min: 0,
								max: 80,
								step: 1,
								format: (n) => `${n}px`,
								onChange: (value) => patch((draft) => {
									draft.general.gapsOut = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Border",
								value: g.borderSize,
								min: 0,
								max: 12,
								step: 1,
								format: (n) => `${n}px`,
								onChange: (value) => patch((draft) => {
									draft.general.borderSize = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Gradient angle",
								value: g.activeAngle,
								min: 0,
								max: 360,
								step: 1,
								format: (n) => `${n}°`,
								onChange: (value) => patch((draft) => {
									draft.general.activeAngle = value;
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Resize on border",
						hint: "Drag borders and gaps to resize.",
						checked: g.resizeOnBorder,
						onChange: (checked) => patch((draft) => {
							draft.general.resizeOnBorder = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Allow tearing",
						hint: "Read the tearing wiki page before enabling this on a real machine.",
						checked: g.allowTearing,
						onChange: (checked) => patch((draft) => {
							draft.general.allowTearing = checked;
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Border color",
				hint: "Active border is a two-stop gradient. Alpha is 0–100.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorStopField, {
							label: "Active start",
							value: g.active[0],
							onChange: (value) => patch((draft) => {
								draft.general.active[0] = value;
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorStopField, {
							label: "Active end",
							value: g.active[1],
							onChange: (value) => patch((draft) => {
								draft.general.active[1] = value;
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorStopField, {
							label: "Inactive",
							value: g.inactive,
							onChange: (value) => patch((draft) => {
								draft.general.inactive = value;
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorStopField, {
							label: "Shadow",
							value: d.shadow,
							onChange: (value) => patch((draft) => {
								draft.decoration.shadow = value;
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Decoration",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-x-6 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Rounding",
								value: d.rounding,
								min: 0,
								max: 40,
								step: 1,
								format: (n) => `${n}px`,
								onChange: (value) => patch((draft) => {
									draft.decoration.rounding = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Corner curve",
								value: d.roundingPower,
								min: 1,
								max: 8,
								step: .1,
								format: (n) => n.toFixed(1),
								onChange: (value) => patch((draft) => {
									draft.decoration.roundingPower = Math.round(value * 10) / 10;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Active opacity",
								value: d.activeOpacity,
								min: .2,
								max: 1,
								step: .05,
								format: (n) => n.toFixed(2),
								onChange: (value) => patch((draft) => {
									draft.decoration.activeOpacity = Math.round(value * 100) / 100;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Inactive opacity",
								value: d.inactiveOpacity,
								min: .2,
								max: 1,
								step: .05,
								format: (n) => n.toFixed(2),
								onChange: (value) => patch((draft) => {
									draft.decoration.inactiveOpacity = Math.round(value * 100) / 100;
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Shadow",
						checked: d.shadowEnabled,
						onChange: (checked) => patch((draft) => {
							draft.decoration.shadowEnabled = checked;
						})
					}),
					d.shadowEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-x-6 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Shadow range",
							value: d.shadowRange,
							min: 1,
							max: 30,
							step: 1,
							onChange: (value) => patch((draft) => {
								draft.decoration.shadowRange = value;
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
							label: "Shadow power",
							value: d.shadowPower,
							min: 1,
							max: 8,
							step: 1,
							onChange: (value) => patch((draft) => {
								draft.decoration.shadowPower = value;
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Blur",
						checked: d.blurEnabled,
						onChange: (checked) => patch((draft) => {
							draft.decoration.blurEnabled = checked;
						})
					}),
					d.blurEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-x-6 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Blur size",
								value: d.blurSize,
								min: 1,
								max: 16,
								step: 1,
								onChange: (value) => patch((draft) => {
									draft.decoration.blurSize = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Blur passes",
								value: d.blurPasses,
								min: 1,
								max: 6,
								step: 1,
								onChange: (value) => patch((draft) => {
									draft.decoration.blurPasses = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
								label: "Vibrancy",
								value: d.blurVibrancy,
								min: 0,
								max: 1,
								step: .01,
								format: (n) => n.toFixed(2),
								onChange: (value) => patch((draft) => {
									draft.decoration.blurVibrancy = Math.round(value * 100) / 100;
								})
							})
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Motion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Animations",
					checked: config.animationsEnabled,
					onChange: (checked) => patch((draft) => {
						draft.animationsEnabled = checked;
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Stock curves",
					hint: "Emit the example bezier and spring block.",
					checked: config.stockCurves,
					onChange: (checked) => patch((draft) => {
						draft.stockCurves = checked;
					})
				})]
			})
		]
	});
}
function InputPanel() {
	const config = useKiln((state) => state.config);
	const patch = useKiln((state) => state.patch);
	const addGesture = useKiln((state) => state.addGesture);
	const current = layoutId(config.input.kbLayout, config.input.kbVariant);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Keyboard",
				hint: "Layout names are xkb. Variant is optional (dvorak, colemak).",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					label: "Layout",
					value: current,
					onChange: (value) => {
						const chosen = LAYOUTS.find((item) => item.id === value);
						if (!chosen || chosen.id === "custom") return;
						patch((draft) => {
							draft.input.kbLayout = chosen.layout;
							draft.input.kbVariant = chosen.variant;
						});
					},
					options: LAYOUTS.map((item) => ({
						value: item.id,
						label: item.label
					}))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "kb_layout",
						mono: true,
						value: config.input.kbLayout,
						onChange: (value) => patch((draft) => {
							draft.input.kbLayout = value;
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						label: "kb_variant",
						mono: true,
						value: config.input.kbVariant,
						placeholder: "empty",
						onChange: (value) => patch((draft) => {
							draft.input.kbVariant = value;
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Pointer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Follow mouse",
						value: String(config.input.followMouse),
						onChange: (value) => patch((draft) => {
							const next = Number(value);
							if (next === 0 || next === 1 || next === 2 || next === 3) draft.input.followMouse = next;
						}),
						options: [
							{
								value: "0",
								label: "0 — don't follow"
							},
							{
								value: "1",
								label: "1 — always"
							},
							{
								value: "2",
								label: "2 — loose"
							},
							{
								value: "3",
								label: "3 — detached"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
						label: "Sensitivity",
						value: config.input.sensitivity,
						min: -1,
						max: 1,
						step: .05,
						format: (n) => n.toFixed(2),
						onChange: (value) => patch((draft) => {
							draft.input.sensitivity = Math.round(value * 100) / 100;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Natural scroll",
						hint: "Touchpad content tracks the fingers.",
						checked: config.input.naturalScroll,
						onChange: (checked) => patch((draft) => {
							draft.input.naturalScroll = checked;
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Gestures",
				hint: "Emitted as hl.gesture. Direction and action are passed through as written.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: config.gestures.map((gesture) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 rounded-md border border-line bg-surface p-3 sm:grid-cols-[5rem_1fr_1fr_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Fingers",
								mono: true,
								value: String(gesture.fingers),
								onChange: (value) => patch((draft) => {
									const item = draft.gestures.find((entry) => entry.id === gesture.id);
									const next = Number(value);
									if (item && Number.isFinite(next)) item.fingers = Math.min(5, Math.max(1, Math.round(next)));
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Direction",
								mono: true,
								value: gesture.direction,
								onChange: (value) => patch((draft) => {
									const item = draft.gestures.find((entry) => entry.id === gesture.id);
									if (item) item.direction = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								label: "Action",
								mono: true,
								value: gesture.action,
								onChange: (value) => patch((draft) => {
									const item = draft.gestures.find((entry) => entry.id === gesture.id);
									if (item) item.action = value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Remove gesture",
									className: "inline-flex size-11 items-center justify-center rounded-md border border-line text-muted",
									onClick: () => patch((draft) => {
										draft.gestures = draft.gestures.filter((entry) => entry.id !== gesture.id);
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							})
						]
					}, gesture.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: addGesture,
					className: "inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add gesture"]
				})]
			})
		]
	});
}
function BindsPanel() {
	const config = useKiln((state) => state.config);
	const patch = useKiln((state) => state.patch);
	const addBind = useKiln((state) => state.addBind);
	const setMainMod = useKiln((state) => state.setMainMod);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Main mod",
				hint: "Changing this rewrites binds that used the previous mod. Digit row and mouse drag follow it.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"SUPER",
						"ALT",
						"CTRL"
					].map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: config.mainMod === mod,
						onClick: () => setMainMod(mod),
						children: mod
					}, mod))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
					label: "Special workspace",
					mono: true,
					value: config.specialName,
					onChange: (value) => patch((draft) => {
						draft.specialName = value;
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Generated blocks",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Number row",
						hint: `${config.mainMod} + 1…0 focuses a workspace. Shift moves the window.`,
						checked: config.workspaceDigits,
						onChange: (checked) => patch((draft) => {
							draft.workspaceDigits = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Scroll workspaces",
						hint: "Main mod + mouse wheel.",
						checked: config.scrollWorkspaces,
						onChange: (checked) => patch((draft) => {
							draft.scrollWorkspaces = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Drag and resize",
						hint: "Main mod + left / right mouse.",
						checked: config.mouseModDrag,
						onChange: (checked) => patch((draft) => {
							draft.mouseModDrag = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Laptop media keys",
						hint: "Volume, mic, brightness, playerctl.",
						checked: config.mediaKeys,
						onChange: (checked) => patch((draft) => {
							draft.mediaKeys = checked;
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Binds",
				hint: "Keysyms: Q, left, Return, mouse:272, XF86AudioPlay. The segment after XKB_KEY_.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: config.binds.map((bind, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-md border border-line bg-surface p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 font-mono text-xs text-faint",
										children: index + 1
									}),
									MODS.map((mod) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										pressed: bind.mods.includes(mod),
										onClick: () => patch((draft) => {
											const item = draft.binds.find((entry) => entry.id === bind.id);
											if (!item) return;
											item.mods = item.mods.includes(mod) ? item.mods.filter((entry) => entry !== mod) : [...item.mods, mod];
										}),
										children: mod
									}, mod)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Remove bind ${index + 1}`,
										className: "ml-auto inline-flex size-11 items-center justify-center rounded-md border border-line text-muted",
										onClick: () => patch((draft) => {
											draft.binds = draft.binds.filter((entry) => entry.id !== bind.id);
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Key",
										mono: true,
										value: bind.key,
										onChange: (value) => patch((draft) => {
											const item = draft.binds.find((entry) => entry.id === bind.id);
											if (item) item.key = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Action",
										value: bind.kind,
										onChange: (value) => patch((draft) => {
											const item = draft.binds.find((entry) => entry.id === bind.id);
											if (!item) return;
											item.kind = value;
											item.arg = defaultArg(item.kind);
										}),
										options: BIND_KINDS.map((kind) => ({
											value: kind.id,
											label: kind.label
										}))
									}),
									bind.kind === "focus-dir" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Direction",
										value: bind.arg || "left",
										onChange: (value) => patch((draft) => {
											const item = draft.binds.find((entry) => entry.id === bind.id);
											if (item) item.arg = value;
										}),
										options: [
											"left",
											"right",
											"up",
											"down"
										].map((dir) => ({
											value: dir,
											label: dir
										}))
									}) : null,
									bind.kind !== "focus-dir" && kindNeedsArg(bind.kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: bind.kind === "raw" ? "Dispatcher" : bind.kind === "exec" ? "Command" : "Workspace",
										mono: true,
										value: bind.arg,
										placeholder: bind.kind === "exec" ? config.programs.terminal : "",
										onChange: (value) => patch((draft) => {
											const item = draft.binds.find((entry) => entry.id === bind.id);
											if (item) item.arg = value;
										})
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "text-xs text-muted",
								children: "Flags and description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											pressed: bind.mouse,
											onClick: () => patch((draft) => {
												const item = draft.binds.find((entry) => entry.id === bind.id);
												if (item) item.mouse = !item.mouse;
											}),
											children: "mouse"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											pressed: bind.locked,
											onClick: () => patch((draft) => {
												const item = draft.binds.find((entry) => entry.id === bind.id);
												if (item) item.locked = !item.locked;
											}),
											children: "locked"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											pressed: bind.repeating,
											onClick: () => patch((draft) => {
												const item = draft.binds.find((entry) => entry.id === bind.id);
												if (item) item.repeating = !item.repeating;
											}),
											children: "repeating"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											pressed: bind.release,
											onClick: () => patch((draft) => {
												const item = draft.binds.find((entry) => entry.id === bind.id);
												if (item) item.release = !item.release;
											}),
											children: "release"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Description",
									value: bind.description,
									onChange: (value) => patch((draft) => {
										const item = draft.binds.find((entry) => entry.id === bind.id);
										if (item) item.description = value;
									})
								})]
							})] })
						]
					}, bind.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: addBind,
					className: "inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add bind"]
				})]
			})
		]
	});
}
function RulesPanel() {
	const rules = useKiln((state) => state.config.rules);
	const patch = useKiln((state) => state.patch);
	const addRule = useKiln((state) => state.addRule);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
			title: "Window rules",
			hint: "Match fields select windows. The other fields are what Hyprland applies. Class is a regex.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "rounded-md border border-line bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex min-h-11 items-center justify-between gap-3 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate font-mono text-sm text-fg",
							children: rule.name || "unnamed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-mono text-xs text-faint",
							children: rule.classMatch || "any class"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 px-3 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Name",
										mono: true,
										value: rule.name,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.name = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Class match",
										mono: true,
										value: rule.classMatch,
										placeholder: ".*",
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.classMatch = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Title match",
										mono: true,
										value: rule.titleMatch,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.titleMatch = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Opacity",
										mono: true,
										value: rule.opacity,
										placeholder: "0.9 override",
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.opacity = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Move",
										mono: true,
										value: rule.move,
										placeholder: "20 20",
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.move = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Size",
										mono: true,
										value: rule.size,
										placeholder: "800 600",
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.size = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Workspace",
										mono: true,
										value: rule.workspace,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.workspace = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Suppress event",
										mono: true,
										value: rule.suppressEvent,
										placeholder: "maximize",
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.suppressEvent = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Rounding",
										mono: true,
										value: rule.rounding,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.rounding = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										label: "Border size",
										mono: true,
										value: rule.borderSize,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.borderSize = value;
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Set float",
										value: rule.floatSet,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.floatSet = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Set pin",
										value: rule.pinSet,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.pinSet = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Match float",
										value: rule.matchFloat,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.matchFloat = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Match fullscreen",
										value: rule.matchFullscreen,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.matchFullscreen = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Match xwayland",
										value: rule.matchXwayland,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.matchXwayland = value;
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriSelect, {
										label: "Match pin",
										value: rule.matchPin,
										onChange: (value) => patch((draft) => {
											const item = draft.rules.find((entry) => entry.id === rule.id);
											if (item) item.matchPin = value;
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								label: "No focus",
								checked: rule.noFocus,
								onChange: (checked) => patch((draft) => {
									const item = draft.rules.find((entry) => entry.id === rule.id);
									if (item) item.noFocus = checked;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex h-11 items-center gap-2 text-sm text-danger",
								onClick: () => patch((draft) => {
									draft.rules = draft.rules.filter((entry) => entry.id !== rule.id);
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove rule"]
							})
						]
					})]
				}, rule.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: addRule,
				className: "inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add rule"]
			})]
		})
	});
}
function StartupPanel() {
	const config = useKiln((state) => state.config);
	const patch = useKiln((state) => state.patch);
	const addMonitor = useKiln((state) => state.addMonitor);
	const addEnv = useKiln((state) => state.addEnv);
	const addAutostart = useKiln((state) => state.addAutostart);
	const renameProgram = (key, value) => {
		patch((draft) => {
			const previous = draft.programs[key];
			draft.programs[key] = value;
			for (const bind of draft.binds) if (bind.kind === "exec" && bind.arg === previous) bind.arg = value;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Programs",
				hint: "Referenced from binds as terminal, fileManager, and menu.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Terminal",
							mono: true,
							value: config.programs.terminal,
							onChange: (value) => renameProgram("terminal", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "File manager",
							mono: true,
							value: config.programs.fileManager,
							onChange: (value) => renameProgram("fileManager", value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							label: "Launcher",
							mono: true,
							value: config.programs.menu,
							onChange: (value) => renameProgram("menu", value)
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Monitors",
				hint: "Empty output means every monitor. Mode examples: preferred, highrr, 2560x1440@144.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: config.monitors.map((monitor, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-md border border-line bg-surface p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted",
								children: ["monitor ", index + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove monitor ${index + 1}`,
								disabled: config.monitors.length < 2,
								className: "inline-flex size-11 items-center justify-center rounded-md border border-line text-muted disabled:opacity-40",
								onClick: () => patch((draft) => {
									if (draft.monitors.length > 1) draft.monitors = draft.monitors.filter((entry) => entry.id !== monitor.id);
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Output",
									mono: true,
									value: monitor.output,
									placeholder: "eDP-1",
									onChange: (value) => patch((draft) => {
										const item = draft.monitors.find((entry) => entry.id === monitor.id);
										if (item) item.output = value;
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Mode",
									mono: true,
									value: monitor.mode,
									onChange: (value) => patch((draft) => {
										const item = draft.monitors.find((entry) => entry.id === monitor.id);
										if (item) item.mode = value;
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Position",
									mono: true,
									value: monitor.position,
									onChange: (value) => patch((draft) => {
										const item = draft.monitors.find((entry) => entry.id === monitor.id);
										if (item) item.position = value;
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									label: "Scale",
									mono: true,
									value: monitor.scale,
									onChange: (value) => patch((draft) => {
										const item = draft.monitors.find((entry) => entry.id === monitor.id);
										if (item) item.scale = value;
									})
								})
							]
						})]
					}, monitor.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: addMonitor,
					className: "inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add monitor"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Autostart",
				hint: "Runs once on hyprland.start. Leave off and the block stays commented.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Run on start",
						checked: config.autostartOn,
						onChange: (checked) => patch((draft) => {
							draft.autostartOn = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: config.autostart.map((command, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "sr-only",
									children: ["Autostart command ", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "h-11 w-full rounded-md border border-line bg-inset px-3 font-mono text-sm text-fg outline-none focus-visible:border-accent",
									value: command,
									placeholder: "waybar",
									onChange: (event) => patch((draft) => {
										draft.autostart[index] = event.target.value;
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove autostart ${index + 1}`,
								className: "inline-flex size-11 items-center justify-center rounded-md border border-line text-muted",
								onClick: () => patch((draft) => {
									draft.autostart.splice(index, 1);
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addAutostart,
						className: "inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add command"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Environment",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: config.env.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_1fr_auto] gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Variable",
								className: "h-11 min-w-0 rounded-md border border-line bg-inset px-3 font-mono text-sm outline-none focus-visible:border-accent",
								value: item.key,
								placeholder: "KEY",
								onChange: (event) => patch((draft) => {
									const env = draft.env.find((entry) => entry.id === item.id);
									if (env) env.key = event.target.value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Value",
								className: "h-11 min-w-0 rounded-md border border-line bg-inset px-3 font-mono text-sm outline-none focus-visible:border-accent",
								value: item.value,
								placeholder: "value",
								onChange: (event) => patch((draft) => {
									const env = draft.env.find((entry) => entry.id === item.id);
									if (env) env.value = event.target.value;
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove ${item.key || "variable"}`,
								className: "inline-flex size-11 items-center justify-center rounded-md border border-line text-muted",
								onClick: () => patch((draft) => {
									draft.env = draft.env.filter((entry) => entry.id !== item.id);
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: addEnv,
					className: "inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add variable"]
				})]
			})
		]
	});
}
function SystemPanel() {
	const config = useKiln((state) => state.config);
	const patch = useKiln((state) => state.patch);
	const reset = useKiln((state) => state.reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Misc",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						label: "Default wallpaper",
						value: String(config.miscForceWallpaper),
						onChange: (value) => patch((draft) => {
							const next = Number(value);
							if (next === -1 || next === 0 || next === 1) draft.miscForceWallpaper = next;
						}),
						options: [
							{
								value: "-1",
								label: "−1 — anime mascot (default)"
							},
							{
								value: "0",
								label: "0 — disable"
							},
							{
								value: "1",
								label: "1 — disable"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Disable Hyprland logo",
						checked: config.disableLogo,
						onChange: (checked) => patch((draft) => {
							draft.disableLogo = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "New top layers over fullscreen",
						hint: "layers.allow_new_top_layers_over_existing_fullscreen",
						checked: config.allowNewLayers,
						onChange: (checked) => patch((draft) => {
							draft.allowNewLayers = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Smart gaps",
						hint: "Zero gaps and borders when a workspace has a single tiled window.",
						checked: config.smartGaps,
						onChange: (checked) => patch((draft) => {
							draft.smartGaps = checked;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Permission examples",
						hint: "Commented hl.permission lines. They need a restart, not a reload.",
						checked: config.includePermissionNotes,
						onChange: (checked) => patch((draft) => {
							draft.includePermissionNotes = checked;
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Extra Lua",
				hint: "Appended as-is. Use it for plugins, devices, or anything Kiln does not model.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "min-h-40 w-full rounded-md border border-line bg-inset p-3 font-mono text-xs leading-5 text-fg outline-none focus-visible:border-accent",
					spellCheck: false,
					value: config.extraLua,
					placeholder: "hl.device({\n    name = \"epic-mouse-v1\",\n    sensitivity = -0.5,\n})",
					onChange: (event) => patch((draft) => {
						draft.extraLua = event.target.value;
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Reset",
				hint: "Restores the Hyprland example rice. This browser keeps a copy until you reset.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex h-11 items-center rounded-md border border-line px-4 text-sm text-danger",
					onClick: () => {
						if (window.confirm("Reset this rice to the Hyprland example?")) reset();
					},
					children: "Reset config"
				})
			})
		]
	});
}
function luaString(value) {
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\r?\n/g, "\\n")}"`;
}
function luaNum(value) {
	if (!Number.isFinite(value)) return "0";
	const rounded = Math.round(value * 1e4) / 1e4;
	if (Number.isInteger(rounded)) return String(rounded);
	return String(rounded);
}
function commentSafe(value) {
	return value.replace(/[\r\n]+/g, " ").trim() || "kiln";
}
function execExpr(cmd, programs) {
	if (cmd === programs.terminal) return "hl.dsp.exec_cmd(terminal)";
	if (cmd === programs.fileManager) return "hl.dsp.exec_cmd(fileManager)";
	if (cmd === programs.menu) return "hl.dsp.exec_cmd(menu)";
	return `hl.dsp.exec_cmd(${luaString(cmd)})`;
}
var MOD_ORDER = [
	"SUPER",
	"ALT",
	"CTRL",
	"SHIFT"
];
function keyExpr(bind, mainMod) {
	const mods = MOD_ORDER.filter((mod) => bind.mods.includes(mod));
	if (mods.includes(mainMod)) {
		const tail = [...mods.filter((mod) => mod !== mainMod), bind.key].filter(Boolean);
		return tail.length ? `mainMod .. " + ${tail.join(" + ")}"` : "mainMod";
	}
	return luaString([...mods, bind.key].filter(Boolean).join(" + "));
}
function dispatcher(bind, config) {
	const special = config.specialName.trim() || "magic";
	switch (bind.kind) {
		case "exec": return execExpr(bind.arg.trim(), config.programs);
		case "close": return "hl.dsp.window.close()";
		case "kill": return "hl.dsp.window.kill()";
		case "float": return "hl.dsp.window.float()";
		case "fullscreen": return "hl.dsp.window.fullscreen()";
		case "pseudo": return "hl.dsp.window.pseudo()";
		case "togglesplit": return "hl.dsp.layout(\"togglesplit\")";
		case "focus-dir": return `hl.dsp.focus({ direction = ${luaString(bind.arg.trim() || "left")} })`;
		case "focus-ws": return workspaceCall("hl.dsp.focus", bind.arg);
		case "move-ws": return workspaceCall("hl.dsp.window.move", bind.arg);
		case "special": return `hl.dsp.workspace.toggle_special(${luaString(special)})`;
		case "move-special": return `hl.dsp.window.move({ workspace = ${luaString(`special:${special}`)} })`;
		case "drag": return "hl.dsp.window.drag()";
		case "resize": return "hl.dsp.window.resize()";
		case "exit": return `hl.dsp.exec_cmd(${luaString("command -v hyprshutdown >/dev/null 2>&1 && hyprshutdown || hyprctl dispatch 'hl.dsp.exit()'")})`;
		case "cycle": return "hl.dsp.window.cycle_next()";
		case "pin": return "hl.dsp.window.pin()";
		case "center": return "hl.dsp.window.center()";
		case "raw": return bind.arg.replace(/\s+/g, " ").trim() || "hl.dsp.window.close()";
		default: return "hl.dsp.window.close()";
	}
}
function workspaceCall(fn, arg) {
	const trimmed = arg.trim();
	if (/^-?\d+$/.test(trimmed)) return `${fn}({ workspace = ${trimmed} })`;
	return `${fn}({ workspace = ${luaString(trimmed || "1")} })`;
}
function flagsOf(bind) {
	const mouse = bind.mouse || /mouse/i.test(bind.key);
	const parts = [];
	if (mouse) parts.push("mouse = true");
	if (bind.locked) parts.push("locked = true");
	if (bind.repeating) parts.push("repeating = true");
	if (bind.release) parts.push("release = true");
	if (bind.description.trim()) parts.push(`description = ${luaString(bind.description.trim())}`);
	if (!parts.length) return null;
	return `{ ${parts.join(", ")} }`;
}
function emitBind(bind, config) {
	if (!bind.key.trim() && bind.kind !== "raw") return null;
	const flags = flagsOf(bind);
	return `hl.bind(${keyExpr(bind, config.mainMod)}, ${dispatcher(bind, config)}${flags ? `, ${flags}` : ""})`;
}
function triBool(value) {
	if (value === "true") return "true";
	if (value === "false") return "false";
	return null;
}
function emitRule(rule) {
	const match = [];
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
	const body = [];
	body.push(`    name  = ${luaString(rule.name.trim() || "rule")},`);
	if (match.length === 1 && !match[0]?.includes("\n")) body.push(`    match = { ${match[0]} },`);
	else if (match.length > 1) {
		body.push("    match = {");
		for (const entry of match) body.push(`        ${entry},`);
		body.push("    },");
	} else body.push("    match = {},");
	const floatSet = triBool(rule.floatSet);
	const pinSet = triBool(rule.pinSet);
	if (floatSet) body.push(`    float = ${floatSet},`);
	if (pinSet) body.push(`    pin = ${pinSet},`);
	if (rule.noFocus) body.push("    no_focus = true,");
	if (rule.opacity.trim()) body.push(`    opacity = ${luaString(rule.opacity.trim())},`);
	if (rule.size.trim()) body.push(`    size = ${luaString(rule.size.trim())},`);
	if (rule.move.trim()) body.push(`    move = ${luaString(rule.move.trim())},`);
	if (rule.workspace.trim()) body.push(`    workspace = ${luaString(rule.workspace.trim())},`);
	if (rule.rounding.trim() && /^-?\d+(\.\d+)?$/.test(rule.rounding.trim())) body.push(`    rounding = ${rule.rounding.trim()},`);
	if (rule.borderSize.trim() && /^-?\d+(\.\d+)?$/.test(rule.borderSize.trim())) body.push(`    border_size = ${rule.borderSize.trim()},`);
	if (rule.suppressEvent.trim()) body.push(`    suppress_event = ${luaString(rule.suppressEvent.trim())},`);
	return `hl.window_rule({\n${body.join("\n")}\n})`;
}
var STOCK_CURVES = `hl.curve("easeOutQuint",   { type = "bezier", points = { {0.23, 1},    {0.32, 1}    } })
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
function emitLua(config) {
	const g = config.general;
	const d = config.decoration;
	const lines = [];
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
		lines.push("hl.on(\"hyprland.start\", function ()");
		for (const command of commands) lines.push(`    hl.exec_cmd(${luaString(command)})`);
		lines.push("end)");
	} else {
		lines.push("-- hl.on(\"hyprland.start\", function ()");
		if (commands.length) for (const command of commands) lines.push(`--     hl.exec_cmd(${luaString(command)})`);
		else {
			lines.push("--     hl.exec_cmd(terminal)");
			lines.push("--     hl.exec_cmd(\"waybar\")");
		}
		lines.push("-- end)");
	}
	lines.push("");
	lines.push("-------------------------------");
	lines.push("---- ENVIRONMENT VARIABLES ----");
	lines.push("-------------------------------");
	lines.push("");
	const env = config.env.filter((item) => item.key.trim());
	if (!env.length) lines.push("-- hl.env(\"XCURSOR_SIZE\", \"24\")");
	for (const item of env) lines.push(`hl.env(${luaString(item.key.trim())}, ${luaString(item.value)})`);
	lines.push("");
	if (config.includePermissionNotes) {
		lines.push("-----------------------");
		lines.push("----- PERMISSIONS -----");
		lines.push("-----------------------");
		lines.push("");
		lines.push("-- Permission changes require a Hyprland restart.");
		lines.push("-- hl.config({ ecosystem = { enforce_permissions = true } })");
		lines.push("-- hl.permission(\"/usr/(bin|local/bin)/grim\", \"screencopy\", \"allow\")");
		lines.push("-- hl.permission(\"/usr/(lib|libexec|lib64)/xdg-desktop-portal-hyprland\", \"screencopy\", \"allow\")");
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
	lines.push(`            active_border = { colors = {${luaString(rgbaLiteral(g.active[0]))}, ${luaString(rgbaLiteral(g.active[1]))}}, angle = ${luaNum(g.activeAngle)} },`);
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
		lines.push("-- Smart gaps: no gaps on the only tiled window / fullscreen.");
		lines.push("hl.workspace_rule({ workspace = \"w[tv1]\", gaps_out = 0, gaps_in = 0 })");
		lines.push("hl.workspace_rule({ workspace = \"f[1]\", gaps_out = 0, gaps_in = 0 })");
		lines.push("hl.window_rule({");
		lines.push("    name = \"no-gaps-wtv1\",");
		lines.push("    match = { float = false, workspace = \"w[tv1]\" },");
		lines.push("    border_size = 0,");
		lines.push("    rounding = 0,");
		lines.push("})");
		lines.push("hl.window_rule({");
		lines.push("    name = \"no-gaps-f1\",");
		lines.push("    match = { float = false, workspace = \"f[1]\" },");
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
	lines.push(`        allow_new_top_layers_over_existing_fullscreen = ${config.allowNewLayers ? "true" : "false"},`);
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
	if (config.input.kbVariant.trim()) lines.push(`        kb_variant = ${luaString(config.input.kbVariant.trim())},`);
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
		lines.push("    hl.bind(mainMod .. \" + \" .. key, hl.dsp.focus({ workspace = i }))");
		lines.push("    hl.bind(mainMod .. \" + SHIFT + \" .. key, hl.dsp.window.move({ workspace = i }))");
		lines.push("end");
		lines.push("");
	}
	if (config.scrollWorkspaces) {
		lines.push("hl.bind(mainMod .. \" + mouse_down\", hl.dsp.focus({ workspace = \"e+1\" }))");
		lines.push("hl.bind(mainMod .. \" + mouse_up\", hl.dsp.focus({ workspace = \"e-1\" }))");
		lines.push("");
	}
	if (config.mouseModDrag) {
		lines.push("hl.bind(mainMod .. \" + mouse:272\", hl.dsp.window.drag(), { mouse = true })");
		lines.push("hl.bind(mainMod .. \" + mouse:273\", hl.dsp.window.resize(), { mouse = true })");
		lines.push("");
	}
	if (config.mediaKeys) {
		lines.push("hl.bind(\"XF86AudioRaiseVolume\", hl.dsp.exec_cmd(\"wpctl set-volume -l 1 @DEFAULT_AUDIO_SINK@ 5%+\"), { locked = true, repeating = true })");
		lines.push("hl.bind(\"XF86AudioLowerVolume\", hl.dsp.exec_cmd(\"wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-\"), { locked = true, repeating = true })");
		lines.push("hl.bind(\"XF86AudioMute\", hl.dsp.exec_cmd(\"wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle\"), { locked = true })");
		lines.push("hl.bind(\"XF86AudioMicMute\", hl.dsp.exec_cmd(\"wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle\"), { locked = true })");
		lines.push("hl.bind(\"XF86MonBrightnessUp\", hl.dsp.exec_cmd(\"brightnessctl -e4 -n2 set 5%+\"), { locked = true, repeating = true })");
		lines.push("hl.bind(\"XF86MonBrightnessDown\", hl.dsp.exec_cmd(\"brightnessctl -e4 -n2 set 5%-\"), { locked = true, repeating = true })");
		lines.push("hl.bind(\"XF86AudioNext\", hl.dsp.exec_cmd(\"playerctl next\"), { locked = true })");
		lines.push("hl.bind(\"XF86AudioPlay\", hl.dsp.exec_cmd(\"playerctl play-pause\"), { locked = true })");
		lines.push("hl.bind(\"XF86AudioPause\", hl.dsp.exec_cmd(\"playerctl play-pause\"), { locked = true })");
		lines.push("hl.bind(\"XF86AudioPrev\", hl.dsp.exec_cmd(\"playerctl previous\"), { locked = true })");
		lines.push("");
	}
	lines.push("--------------------------------");
	lines.push("---- WINDOWS AND WORKSPACES ----");
	lines.push("--------------------------------");
	lines.push("");
	if (!config.rules.length) lines.push("-- No window rules.");
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
var SECTIONS = [
	{
		id: "look",
		label: "Look",
		hint: "Gaps, color, blur",
		icon: SwatchBook
	},
	{
		id: "input",
		label: "Input",
		hint: "Keys, mouse, gestures",
		icon: Keyboard
	},
	{
		id: "binds",
		label: "Binds",
		hint: "Mods and dispatchers",
		icon: KeyRound
	},
	{
		id: "rules",
		label: "Rules",
		hint: "Window matchers",
		icon: AppWindow
	},
	{
		id: "startup",
		label: "Startup",
		hint: "Monitors and apps",
		icon: Power
	},
	{
		id: "system",
		label: "System",
		hint: "Misc and extra Lua",
		icon: Settings2
	}
];
async function writeClipboard(text) {
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
function Studio() {
	const config = useKiln((state) => state.config);
	const section = useKiln((state) => state.section);
	const setSection = useKiln((state) => state.setSection);
	const patch = useKiln((state) => state.patch);
	const [notice, setNotice] = (0, import_react.useState)("");
	const lua = (0, import_react.useMemo)(() => emitLua(config), [config]);
	(0, import_react.useEffect)(() => {
		useKiln.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "kiln flex min-h-screen flex-col bg-bg text-fg lg:h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 flex-wrap items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-md bg-accent font-mono text-sm font-semibold text-accent-ink",
							"aria-hidden": "true",
							children: "K"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-semibold tracking-tight",
							children: "Kiln"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-faint",
							children: "hyprland.lua · 0.55+"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-w-0 flex-1 sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Rice name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "h-11 w-full rounded-md border border-line bg-inset px-3 text-sm outline-none focus-visible:border-accent",
							value: config.riceName,
							"aria-label": "Rice name",
							onChange: (event) => patch((draft) => {
								draft.riceName = event.target.value;
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden font-mono text-xs text-accent sm:inline",
								"aria-live": "polite",
								children: notice
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void copyLua(),
								className: "inline-flex h-11 items-center gap-2 rounded-md bg-accent px-3 text-sm font-medium text-accent-ink",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sm:hidden",
										children: notice || "Copy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Copy"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: downloadLua,
								className: "inline-flex h-11 items-center gap-2 rounded-md border border-line bg-elevated px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Download"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto border-b border-line px-4 py-2 lg:hidden",
				children: SECTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSection(item.id),
					className: `inline-flex h-11 shrink-0 items-center rounded-md px-3 text-sm ${section === item.id ? "bg-accent text-accent-ink" : "bg-elevated text-muted"}`,
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "col-span-2 hidden flex-col border-r border-line lg:flex",
						"aria-label": "Config sections",
						children: SECTIONS.map((item) => {
							const Icon = item.icon;
							const current = section === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSection(item.id),
								className: `flex min-h-14 items-center gap-3 px-4 text-left ${current ? "bg-elevated text-fg" : "text-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 shrink-0 ${current ? "text-accent" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-faint",
										children: item.hint
									})]
								})]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "order-1 col-span-4 flex min-h-0 flex-col border-b border-line lg:order-none lg:col-start-9 lg:border-b-0 lg:border-l",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopPreview, { config }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LuaView, { source: lua })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "order-2 col-span-6 min-w-0 px-4 py-5 sm:px-6 lg:overflow-y-auto lg:col-start-3 lg:row-start-1",
						children: [
							section === "look" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookPanel, {}) : null,
							section === "input" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputPanel, {}) : null,
							section === "binds" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BindsPanel, {}) : null,
							section === "rules" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesPanel, {}) : null,
							section === "startup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartupPanel, {}) : null,
							section === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemPanel, {}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 text-xs text-faint",
								children: "Save the file to ~/.config/hypr/hyprland.lua, then reload with hyprctl reload. Legacy hyprland.conf is not generated."
							})
						]
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {});
}
//#endregion
export { Home as component };
