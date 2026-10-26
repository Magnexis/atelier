export interface AtelierTokens {
  readonly color: Readonly<Record<"canvas" | "surface" | "ink" | "muted" | "line" | "accent" | "critical", string>>;
  readonly radius: Readonly<Record<"sm" | "md" | "lg" | "pill", string>>;
  readonly space: Readonly<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string>>;
  readonly font: Readonly<Record<"sans" | "mono", string>>;
}

export const tokens: AtelierTokens;
export function tokenCss(scope?: string): string;
