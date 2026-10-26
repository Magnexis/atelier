# Atelier

> A local-first design runtime for teams that want the speed of a visual studio, the ownership of a source library, and the behavioral rigor of accessible primitives.

Atelier is a new Magnexis project. It is deliberately not a clone of Framer, shadcn/ui, Radix UI, or any other product. It occupies the productive gap between those categories: a local visual workspace that produces an inspectable design contract, plus a small package developers can adopt incrementally.

**Netlify production address:** <https://atelier-vite-preview-20261026.netlify.app><br>
**Source:** <https://github.com/Magnexis/atelier>
**JSR package:** <https://jsr.io/@magnexis/atelier>

For a guided tour of the live Studio surfaces, see [Navigate Atelier](docs/GETTING-STARTED.md). The published Studio is the canonical visual reference for the release.

The project currently includes a polished local Studio landing and workbench experience, a framework-light token package, a small React surface, local export behavior, and a deliberately simple static-server workflow. It does **not** claim to be a complete hosted page builder, component registry, Figma plugin, design-file format, or replacement for an established accessibility primitive library. Those are future systems, not marketing copy.

## Why Atelier exists

Product teams regularly lose design intent as work crosses boundaries. A visual editor can make iteration delightful but can obscure the implementation behind a platform. A component kit can give teams source ownership but leaves visual calibration as a laborious code-only task. A low-level primitive library can correctly solve focus management and keyboard interaction, but it intentionally does not tell a team what its product should feel like.

Atelier treats the design system as a runtime contract between all three modes of work.

1. **Studio mode** is a local, inspectable place to compose and calibrate an interface.
2. **Contract mode** serializes decisions such as semantic color, type, rhythm, density, and motion into source-owned tokens.
3. **Package mode** gives application code a stable way to consume those decisions through CSS variables and small framework adapters.

The key principle is simple: visual work must be able to become source material without forcing teams to give up control of their repository, deployment, or runtime.

## Product position

Atelier takes useful lessons from the current UI-tool landscape without borrowing protected names, source code, visual identity, assets, layout, or wording.

| Category | Valuable pattern | Atelier interpretation |
| --- | --- | --- |
| Visual site builders | Fast, direct editing on an editable canvas | A local Studio for composing a real design contract; no hosted deployment required for core work |
| Copyable component libraries | Source ownership and direct customization | Explicit package exports and recipes designed to live in a team repository |
| Accessible primitives | Composable parts, keyboard behavior, focus management | Behavior contracts are a first-class roadmap item; the current package begins with simpler primitives |
| Token systems | A shared vocabulary for design decisions | Tokens are versionable CSS-variable contracts rather than hidden implementation values |

This is positioning, not a compatibility guarantee. Atelier is not affiliated with the projects above and does not import, scrape, replicate, or depend on their proprietary services.

## Current capabilities

The included local Studio demonstrates the intended product interaction model:

- A responsive design-workbench surface rather than a generic marketing card grid.
- Desktop/mobile preview switching.
- Accent-color calibration that updates the preview and retains an editable change count.
- Density tuning for the preview.
- Dark/light appearance switch with reduced-motion support.
- Keyboard-accessible command palette (`Ctrl/Cmd + K`).
- Copyable installation, token, and component snippets.
- Local JSON export of the current sample design contract.
- Clear local-first behavior: editing remains in-browser and does not require an account or backend.

The initial package at `packages/atelier` exports:

- `tokens`: a frozen JavaScript representation of foundational design decisions.
- `tokenCss(scope)`: a small utility to emit the base CSS variable contract into an explicit scope.
- `Button`: a React button with accessible native semantics, focus styling, and three visual variants.
- `Field`: a labelled native input with description and error relationships.
- `Notice`: a status or critical-alert primitive with semantic live-region defaults.
- `Tabs`: an explicitly labelled tab-list wrapper; a future headless adapter will add roving-focus behavior.
- `recipes`: portable composition metadata for profile settings, deployment health, and payment workflows.
- `SignalToggle`, `LedgerField`, and `MarginNote`: Atelier’s original Signal Ledger primitives for source-aware local and shared state.
- `Disclosure`: a native expand/collapse surface with optional open-state reporting.
- `SegmentedControl`: a compact radio group with arrow, Home, and End keyboard behavior.
- `CommandLedger`: a filterable, callback-driven local command surface that never executes shell input.
- `Stack`: a small layout composition primitive.
- `VisuallyHidden`: a text utility for assistive technology labels.
- `@magnexis/atelier/styles.css`: baseline CSS variables and styles for the shipped primitives.

## Repository layout

```text
atelier-ui/
├── apps/
│   └── studio/                 # Vite application root, React Workbench, and shared styling
│       ├── index.html
│       ├── src/main.jsx         # React application entry point
│       ├── src/studio.css       # Studio-specific component styling
│       └── styles.css           # Shared visual tokens and page styling
├── packages/
│   └── atelier/                # Publishable framework-light package
│       ├── src/
│       │   ├── index.js
│       │   ├── react.js
│       │   └── tokens.js
│       ├── test/
│       ├── styles.css
│       └── package.json
├── vite.config.js               # Vite build and dev-server configuration
├── package.json
└── README.md
```

The Studio is a real Vite + React application. It has a normal local development server and production build, while the package keeps React declared as a peer dependency so it can join an application without creating another React runtime.

## MCP discovery endpoint

The deployed Studio includes a public, read-only Streamable HTTP MCP endpoint at `https://atelier-vite-preview-20261026.netlify.app/mcp`. It is intentionally limited to catalog and release discovery: `list_components`, `get_component`, and `get_release_notes`. It has no account data, write tools, user data, or secrets.

For a native MCP client, connect to `https://atelier-vite-preview-20261026.netlify.app/mcp` using Streamable HTTP. The endpoint accepts `POST` and returns JSON; it also supports browser preflight for public catalog tooling. The Netlify function rate-limits requests to 60 per minute per IP.

## Run locally

### Prerequisites

- Node.js 20 or newer is recommended.
- No account, API key, domain, database, or cloud service is required.

### Start the Studio

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite, normally `http://127.0.0.1:5173`.

The development server is intentionally bound to loopback (`127.0.0.1`). It does not expose the Studio to the local network. Stop it with `Ctrl+C` when you are finished.

### Verify the package and Studio JavaScript

```bash
pnpm test
pnpm check
```

`pnpm test` runs the token contract tests using Node’s built-in test runner. `pnpm check` runs the Vite production build and parses the public package entry point.

## Use the package in an application

Atelier is consumed from source or JSR—not npm. Clone the repository when working from source:

```bash
git clone https://github.com/Magnexis/atelier.git
cd atelier
pnpm install
```

The stable package is available now as `jsr:@magnexis/atelier` (currently `1.1.1`). Neither distribution route requires an npm account.

```bash
deno add jsr:@magnexis/atelier
```

Import the global design contract once at your application root:

```js
import "@magnexis/atelier/styles.css";
```

Use tokens wherever a runtime value is useful:

```js
import { tokenCss, tokens } from "@magnexis/atelier/tokens";

document.adoptedStyleSheets = [
  new CSSStyleSheet(),
];

console.log(tokens.color.accent); // #285de6
console.log(tokenCss(".product-theme"));
```

For React, consume the narrow component layer directly:

```jsx
import { Button, Stack } from "@magnexis/atelier";
import "@magnexis/atelier/styles.css";

export function PublishChanges({ onPublish }) {
  return (
    <Stack gap={4}>
      <Button onClick={onPublish}>Publish changes</Button>
      <Button variant="secondary">Save draft</Button>
    </Stack>
  );
}
```

### Current component maturity

| Component | Shipped now | Important next requirement |
| --- | --- | --- |
| Button | Native semantics, variants, visible focus | Loading and icon-only accessible-name tests |
| Field | Label, description, invalid/error wiring | Textarea/select adapters and interaction tests |
| Notice | Status/alert semantics and intent variants | Dismissible action pattern with focus-return guidance |
| Tabs | Labelled tab-list wrapper | Roving focus, selected-panel linkage, controlled state |
| Recipes | Portable metadata and dependency declarations | Schema validation and deterministic source templates |
| Signal Ledger | Source-aware state, fields, and annotations | Keyboard interaction and browser-level contract tests |
| Disclosure | Native details/summary semantics and optional state reporting | Controlled-state adapter and browser-level contract tests |
| SegmentedControl | Radio semantics and directional keyboard navigation | Disabled options and form serialization contract |
| CommandLedger | Local filtering and explicit consumer callbacks | Virtualization and shortcut conflict policy |

No component is presented as complete merely because it renders. The catalog makes variants visible today; behavior contracts and interaction tests are the standard for subsequent package releases.

The package uses standard DOM semantics. `Button` renders a native `<button>`, preserves consumer event handlers, defaults to `type="button"` to avoid accidental form submissions, and exposes the variants `primary`, `secondary`, and `ghost`. If an app needs a link, use a native anchor or a router link rather than overloading a button with navigation behavior.

## Token contract

Atelier tokens are decisions with stable names. Values are intentionally modest at this stage, but the naming model has a purpose: applications should consume semantic roles rather than hard-code visual values throughout product code.

```js
import { tokens } from "@magnexis/atelier/tokens";

tokens.color.canvas;
tokens.color.surface;
tokens.color.ink;
tokens.color.muted;
tokens.color.line;
tokens.color.accent;
tokens.color.critical;

tokens.radius.sm;
tokens.radius.md;
tokens.radius.lg;
tokens.radius.pill;

tokens.space[1];
tokens.space[8];
```

### Token design rules

1. Prefer a token when it expresses a product decision that should be shared.
2. Do not create a token for a one-off layout correction without evidence that it will recur.
3. Name by intent (`accent`, `surface`, `critical`) rather than by paint (`blue500`, `gray2`) at the application boundary.
4. Maintain a clear mapping between Studio controls and exported token names.
5. Treat a renamed or removed public token as a breaking change.
6. Keep layout geometry distinct from visual styling. Components should not decide page structure.
7. Validate contrast combinations in both light and dark themes before publishing a theme contract.

## Design language principles

### 1. Decisions are portable

An interface should not be held hostage by the editor used to create it. A design should be exportable as readable data and usable from CSS, React, server-rendered pages, native webviews, documentation, and future platform adapters. This is why the contract starts with CSS custom properties and plain JavaScript data rather than a proprietary binary format.

### 2. Components do not hide responsibility

Convenience APIs are useful until they conceal important choices. Atelier primitives aim to make defaults safe but keep meaningful behavior explicit: a button is a button, a navigational link is a link, a form field has a label, and a modal owns focus only when it is truly modal. Future components will document ownership, focus, keyboard, ARIA, animation, and dismissal rules as behavior contracts.

### 3. Local-first means more than offline marketing

The core workflow should remain useful without a login or an always-on service. Atelier’s future Studio should save source-controlled artifacts locally, function without an account, and make cloud collaboration an optional layer. A user should be able to create a library, export its contract, inspect the result, and ship it through their own deployment pipeline.

### 4. The visual surface is a development surface

The Studio should not become a disconnected mockup machine. It is intended to expose the same constraints that product code observes: component state, responsive conditions, content length, semantic tokens, and accessibility metadata. A visual adjustment is valuable when it has a clear path to a source-level change.

### 5. Accessibility is a product invariant

Atelier will not represent decorative snapshots as production-ready UI. Every interactive primitive needs keyboard behavior, visible focus, correct semantics, and testable states. Accessibility should be observable in the Studio and enforceable in CI—not just stated in a README.

## Studio behavior

The current Studio is intentionally a transparent prototype rather than a fictional SaaS environment. Its controls work entirely in the browser:

- **Accent color:** adjusts the document’s `--accent` CSS variable and records the change in the Studio’s session count.
- **Density:** changes the preview’s scale to compare compact and spacious compositions.
- **Device view:** switches the preview frame between desktop and mobile widths.
- **Export JSON:** creates a local `atelier-workbench.tokens.json` download containing the active sample accent and session change count.
- **Command palette:** provides in-document navigation and opens with `Ctrl/Cmd + K`.
- **Theme:** changes only the current browser session; it does not write cookies, local storage, or telemetry.

The Studio does not yet persist a real project or produce a complete component registry. That limitation is deliberate and visible. Persistence needs a defined project manifest, migration model, and conflict behavior before it is added.

## Architecture

```text
                    ┌──────────────────────────┐
                    │      Local Studio         │
                    │  visual controls + export │
                    └─────────────┬────────────┘
                                  │
                      portable design contract
                                  │
                  ┌───────────────┴────────────────┐
                  │                                │
        ┌─────────▼─────────┐            ┌─────────▼─────────┐
        │ CSS variables     │            │ JavaScript tokens  │
        │ any web surface   │            │ React / tooling    │
        └─────────┬─────────┘            └─────────┬─────────┘
                  │                                │
                  └──────────────┬─────────────────┘
                                 │
                       ┌─────────▼─────────┐
                       │ Product application │
                       │ owns deployment     │
                       └─────────────────────┘
```

### Why Vite + React?

The Studio is intentionally a small Vite + React application rather than a hosted builder wrapper. Vite gives it a real development/build lifecycle; React gives the Workbench and catalog durable state, variants, modals, filtering, export controls, and keyboard interactions. This proves a useful product interaction model without pretending that an account, CMS, backend, collaboration service, or visual-to-code compiler already exists.

### Why a small package first?

Design systems accumulate surface area quickly. Starting with foundational tokens and a few components makes the public contract easier to test and evolve. The package should grow only when individual components have a tested accessibility and API story, not because a category of components looks incomplete on a marketing page.

## Roadmap

The roadmap is organized by dependencies rather than marketing milestones.

### Phase 1 — Contract foundation (current)

- [x] Local Studio experience with working controls.
- [x] CSS and JavaScript token contract.
- [x] Initial React primitives with peer dependencies.
- [x] Built-in test runner and parse checks.
- [x] Clear local-only development path.
- [x] JSR package metadata, GitHub OIDC publishing, and signed release workflow.
- [ ] Versioned `atelier.config.json` manifest.

### Phase 2 — Project-backed Studio

- [ ] Tauri desktop shell targeting Windows first.
- [ ] Workspace-local `atelier.config.json` project manifest.
- [ ] SQLite-backed local project index with migrations.
- [ ] Import/export validation using a schema at every filesystem boundary.
- [ ] Undo/redo, named snapshots, and a human-readable change timeline.
- [ ] Token collection and mode editing with real persistent state.
- [ ] File watcher that detects source changes without overwriting user work.

### Phase 3 — Component contracts

- [ ] Dialog, popover, menu, tabs, select, tooltip, and disclosure primitives.
- [ ] Keyboard, focus, pointer, touch, RTL, and screen-reader contract tests.
- [ ] A recipe format for source-owned composed patterns.
- [ ] Component metadata: dependencies, slots, states, design tokens, and compatibility.
- [ ] Story-like sandbox pages generated from component contracts.
- [ ] Accessibility audit command with actionable source locations.

### Phase 4 — Source exchange

- [ ] AST-backed component recipe generation with deterministic output.
- [ ] Safe import graph analysis before any code modification.
- [ ] Explicit dry-run and review mode for source insertion.
- [ ] Framework adapters for React, then framework-agnostic web components where justified.
- [ ] A registry protocol that works from local files before remote catalogs.
- [ ] Package version migration assistant with no hidden file edits.

### Phase 5 — Optional collaboration

- [ ] Optional hosted sync adapter; local projects remain first-class.
- [ ] Branch-aware Studio projects and mergeable token changes.
- [ ] Design review links that require explicit user publishing.
- [ ] Organization policy controls, audit events, and secrets-free diagnostics.
- [ ] No client-clock trust for any server-enforced policy.

## Security and privacy

Atelier’s local model is a security and product decision, not a temporary omission.

- The current Studio makes no network API requests after its assets load.
- The development server binds only to loopback by default.
- No analytics, telemetry, account flow, cookie banner, or hidden local persistence is included.
- Export is a browser download initiated by an explicit user action.
- The package has no postinstall hook and does not execute shell commands.
- React remains a peer dependency to reduce dependency ambiguity and bundle duplication.
- Future filesystem features must validate every path and reject traversal outside the selected workspace.
- Future source-writing features must require an explicit preview and approval for each file change.
- Secrets must remain in environment variables or OS-backed secure storage; no token may be embedded in Studio exports or package metadata.

If you find a security concern, do not publish a proof-of-concept exploit or include sensitive data in an issue. Document reproduction at a high level and contact the project maintainer through a private, approved channel once one exists.

## Accessibility baseline

The Studio currently provides semantic navigation, native buttons, meaningful labels for controls, visible keyboard focus, a skip link, an ARIA-labeled preview switcher, an accessible modal dialog, a live status region for feedback, responsive layout, and a reduced-motion fallback.

This is a baseline, not a certification. Manual keyboard and assistive-technology testing remains necessary as the Studio grows. The initial package’s `Button` uses native `<button>` semantics; more complex primitives will not be marked complete until they have state, focus, and keyboard tests.

## Development conventions

- Keep public APIs small, typed when a TypeScript build is introduced, and documented near their source.
- Do not hide visual values inside JavaScript components when they should be tokens.
- Keep side effects explicit. No component should silently write to storage or call a service.
- Preserve user-owned source; code generation must be reviewable and deterministic.
- Avoid dependencies unless they solve a verified problem better than a platform API or existing module.
- Design responsive surfaces for content variability, not screenshots.
- Never turn local-only functionality into account-gated functionality without a migration path.

## Publishing and deployment

The Studio is publicly deployed at <https://atelier-vite-preview-20261026.netlify.app>; no custom domain is configured. The repository is hosted under the Magnexis organization at <https://github.com/Magnexis/atelier>. `@magnexis/atelier@1.1.1` is published on JSR through GitHub Actions OIDC with provenance.

The Studio does not require Netlify or a domain for local use. Publishing a package remains a deliberate release action and requires a package audit, license confirmation, package metadata review, semantic version decision, and a GitHub release. The workflow uses JSR's OIDC integration rather than a stored registry token.

## Limitations

- The Studio is a local interactive product preview, not a persistent design editor.
- The package is an initial API surface, not yet a complete UI system.
- The CSS uses current browser features such as `color-mix`; provide fallbacks before targeting older browsers.
- The `Export JSON` artifact is a sample contract and not yet a validated project manifest.
- Google Fonts are referenced for the visual preview. For a fully offline/distributable desktop build, bundle appropriately licensed local font files or use system font stacks.
- There is no installer, custom domain, design-file import, or source-to-component generator yet.

## License

MIT. See the package metadata and `packages/atelier/LICENSE`.

## Status

Early foundation. Suitable for local inspection, UI direction, and further engineering; not yet suitable to describe as a drop-in replacement for a mature hosted builder or primitive ecosystem.
