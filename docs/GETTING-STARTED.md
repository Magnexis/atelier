# Navigate Atelier

Atelier has two connected surfaces: the public Studio, where people inspect and calibrate the language, and the package, where a product team adopts its tokens and primitives. This guide is deliberately short enough to use during a first visit and specific enough to support a demo, a handoff, or a technical evaluation.

**Live Studio:** <https://atelier-vite-preview-20261026.netlify.app>  
**Package:** <https://jsr.io/@magnexis/atelier>  
**Catalog MCP endpoint:** <https://atelier-vite-preview-20261026.netlify.app/mcp>

## First five minutes

1. Open the Studio and start at **Overview**. It is an interactive product surface, not a static image.
2. Use the **Workbench** link or top navigation to compare the same composition at desktop and mobile widths.
3. Change the **Accent token** and **Density**. The preview changes immediately; **Export token contract** downloads only the current local contract.
4. Open the command palette with `Ctrl+K` (or `Cmd+K`) and navigate to a Studio section.
5. Move to **Components** to filter the component families, switch variants, and open an inspector for implementation notes.
6. Open the **PACKAGE / SOURCE-OWNED** section to choose workspace, JSR, or usage guidance. JSR is the supported registry path; no npm account is needed.

## Studio navigation map

```text
Header
  Overview    ── product position and a shortcut into the workbench
  System      ── design foundations and behavioral principles
  Components  ── filter families, test variants, inspect contracts
  Recipes     ── review composable, source-owned patterns
  Workbench   ── calibrate a live local composition

Workbench controls
  Device    ── desktop / mobile viewport
  Accent    ── live semantic-accent calibration
  Density   ── compact / regular spatial rhythm
  Export    ── local token-contract download
  ⌘/Ctrl K  ── keyboard route to a section or component
```

## What each interactive area does

| Area | Purpose | What is intentionally local |
| --- | --- | --- |
| Workbench | Calibrate the main composition and examine responsive behavior. | Appearance, accent, density, and the export payload live only in the browser session. |
| Components | Compare the shipped primitive families and variants. | Search and variant selection do not call a service or write a project. |
| Inspector | Read a component’s behavior, states, and implementation notes. | It is reference material; it does not install or modify source. |
| Command palette | Keyboard navigation through Studio sections. | It navigates the current page only; it never runs shell commands. |
| Export JSON | Capture the visible sample contract. | The browser starts a user-requested download; nothing is uploaded. |

## Package adoption

Install the signed JSR package in a Deno-compatible workspace:

```bash
deno add jsr:@magnexis/atelier
```

Use the tokens directly when no React runtime is involved:

```ts
import { tokenCss, tokens } from "jsr:@magnexis/atelier/tokens";

console.log(tokens.color.accent);
console.log(tokenCss(".product-theme"));
```

For React, import a primitive from the package. Keep navigation as native links and use components only for the behavior they actually own:

```tsx
import { CommandLedger, SignalToggle } from "jsr:@magnexis/atelier";

export function ReviewPanel() {
  return <SignalToggle leftLabel="Local" rightLabel="Shared" />;
}
```

## Screens and visual review

The Studio is designed to be reviewed through the live Netlify deployment rather than a frozen mockup. Use the Workbench and Components sections during a visual review, and capture release screenshots from that deployment after visual changes so documentation remains an honest representation of the release.

## Accessibility and motion

All visible controls retain focus styling. The command palette has a keyboard shortcut, the catalog controls are labelled, and motion respects a reduced-motion preference. Use the browser’s keyboard to verify an interaction before presenting it as production-ready; the package’s maturity table in the root README calls out what has and has not reached a complete behavior contract.
