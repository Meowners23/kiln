const KEYWORDS = new Set([
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
  "return",
]);

type Tok = { text: string; kind: "plain" | "kw" | "str" | "cmt" | "num" };

function tokenize(line: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < line.length) {
    if (line.startsWith("--", i)) {
      out.push({ text: line.slice(i), kind: "cmt" });
      break;
    }
    const ch = line[i] ?? "";
    if (ch === '"' || ch === "'") {
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
      out.push({ text: line.slice(i, j), kind: "str" });
      i = j;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[0-9a-fA-FxX.]/.test(line[j] ?? "")) j += 1;
      out.push({ text: line.slice(i, j), kind: "num" });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j] ?? "")) j += 1;
      const word = line.slice(i, j);
      out.push({ text: word, kind: KEYWORDS.has(word) ? "kw" : "plain" });
      i = j;
      continue;
    }
    out.push({ text: ch, kind: "plain" });
    i += 1;
  }
  return out;
}

const kindClass: Record<Tok["kind"], string> = {
  plain: "text-fg",
  kw: "text-fg font-medium",
  str: "text-accent",
  cmt: "text-faint",
  num: "text-muted",
};

export function LuaView({ source }: { source: string }) {
  const lines = source.split("\n");
  return (
    <details className="lua-source min-h-0 border-t border-line">
      <summary className="flex min-h-11 items-center justify-between px-4 text-sm text-fg">
        <span className="font-mono text-xs text-muted">hyprland.lua</span>
        <span className="font-mono text-xs text-faint">{lines.length} lines</span>
      </summary>
      <div className="flex items-center justify-between px-4 py-2 max-lg:hidden">
        <p className="font-mono text-xs text-muted">hyprland.lua</p>
        <p className="font-mono text-xs text-faint">{lines.length} lines</p>
      </div>
      <pre className="m-0 max-h-80 min-h-0 overflow-auto px-2 pb-4 font-mono text-xs leading-5 lg:max-h-none lg:flex-1">
        {lines.map((line, index) => (
          <div key={`${index}-${line.slice(0, 12)}`} className="flex">
            <span className="w-8 shrink-0 pr-2 text-right text-faint select-none">{index + 1}</span>
            <code className="min-w-0 whitespace-pre">
              {line.length === 0
                ? " "
                : tokenize(line).map((tok, tokIndex) => (
                    <span key={tokIndex} className={kindClass[tok.kind]}>
                      {tok.text}
                    </span>
                  ))}
            </code>
          </div>
        ))}
      </pre>
    </details>
  );
}
