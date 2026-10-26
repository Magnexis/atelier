/** Stable token names designed for CSS-variable interop. */
export const tokens = Object.freeze({
  color: Object.freeze({ canvas: "#f6f5f1", surface: "#ffffff", ink: "#1d1c1a", muted: "#74716c", line: "#dedbd5", accent: "#285de6", critical: "#c43931" }),
  radius: Object.freeze({ sm: "6px", md: "10px", lg: "16px", pill: "999px" }),
  space: Object.freeze({ 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "24px", 6: "32px", 7: "48px", 8: "72px" }),
  font: Object.freeze({ sans: "Inter, ui-sans-serif, system-ui, sans-serif", mono: "ui-monospace, SFMono-Regular, Menlo, monospace" })
});

export function tokenCss(scope = ":root") {
  const entries = [
    ["--at-canvas", tokens.color.canvas], ["--at-surface", tokens.color.surface], ["--at-ink", tokens.color.ink],
    ["--at-muted", tokens.color.muted], ["--at-line", tokens.color.line], ["--at-accent", tokens.color.accent], ["--at-critical", tokens.color.critical],
    ...Object.entries(tokens.radius).map(([key, value]) => [`--at-radius-${key}`, value]),
    ...Object.entries(tokens.space).map(([key, value]) => [`--at-space-${key}`, value]),
  ];
  return `${scope}{${entries.map(([name, value]) => `${name}:${value}`).join(";")}}`;
}
