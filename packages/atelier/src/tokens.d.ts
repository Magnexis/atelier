/**
 * Foundational Atelier design tokens and a serializer for scoped CSS custom
 * properties. Import this entrypoint when an application needs token values
 * outside React.
 *
 * @module atelier/tokens
 */

/** Stable, semantic values intended for CSS-variable interoperability. */
export interface AtelierTokens {
  readonly color: Readonly<{
    readonly canvas: string;
    readonly surface: string;
    readonly ink: string;
    readonly muted: string;
    readonly line: string;
    readonly accent: string;
    readonly critical: string;
  }>;
  readonly radius: Readonly<{
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly pill: string;
  }>;
  readonly space: Readonly<Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string>>;
  readonly font: Readonly<{
    readonly sans: string;
    readonly mono: string;
  }>;
}

/** The frozen token contract shared by the Studio and consuming applications. */
export const tokens: AtelierTokens;

/**
 * Serializes the foundational token contract as CSS custom properties.
 *
 * @param scope CSS selector that will own the generated variables.
 * @returns A compact CSS rule suitable for a stylesheet or adopted style sheet.
 */
export function tokenCss(scope?: string): string;
