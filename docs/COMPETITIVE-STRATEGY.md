# Atelier competitive strategy

## Purpose

This document turns a broad aspiration—competing in the design-tools space—into a buildable product boundary. It is not a claim that Atelier currently matches Framer, shadcn/ui, or Radix UI feature for feature. It identifies the user problem each category solves, the product surface required to compete credibly, and the order in which Atelier should earn that position.

Atelier is a clean-room Magnexis product. Product names below are used only for factual comparison. No proprietary visual identity, source code, assets, copy, or private API may be copied.

## The market split

| Product category | Primary promise | What users own | Core risk | Atelier response |
| --- | --- | --- | --- | --- |
| Visual web platform | Make and publish polished pages visually | Usually content and project data; platform controls runtime and publishing | Lock-in and design/code drift | A local Studio that exports readable contracts and does not require hosted publishing |
| Source-first component library | Install or copy adaptable UI code | Source code in the repository | Inconsistent quality and manual visual calibration | A package plus a visual calibration surface driven by the same token contract |
| Primitive library | Solve interaction semantics and accessibility | Application composition and styling | More assembly required for a complete product | Carefully scoped, documented primitives with behavior contracts and recipe layers |

Framer currently positions a design agent on an editable canvas and bundles hosting, CMS, analytics, SEO/AEO, collaboration, localization, and experimentation into a hosted product. shadcn/ui positions itself as customizable, accessible source components and a foundation for a team’s own design system. Radix focuses on unstyled, accessible, composable React primitives with keyboard and focus behavior. Atelier must not dilute those distinct product positions into a vague “better UI kit.”

## Atelier's wedge

**A local-first design runtime:** a visual studio and source package that share a portable, version-controlled contract.

This wedge has three user promises:

1. A designer or developer can calibrate a real interface locally without starting with a cloud account.
2. The result is inspectable source data—tokens, recipes, and component contracts—not a locked editor document.
3. A product team can adopt it in layers: tokens only, package primitives, local Studio, then optional collaboration.

## Design-language decision: Signal Ledger

Atelier should not compete by accumulating the same Button, Card, Input, Badge, and Dialog treatment found in every component catalog. Its differentiator is **visible state provenance**: important UI controls reveal where a decision lives, what it will affect, and whether it has crossed from local work into a shared context.

The first original family is Signal Ledger:

| Primitive | Interaction signature | Why it is distinct |
| --- | --- | --- |
| Signal Toggle | A state bead travels across a labelled local/share track; the control exposes time and scope. | It makes state transition and data provenance legible instead of concealing both in a generic switch. |
| Ledger Field | Namespace prefix, field value, provenance, and validation form one visible unit. | It makes configuration feel like a reviewable source record, not an anonymous text box. |
| Margin Note | Feedback remains adjacent to the decision it describes. | It avoids the disruptive full-width toast/alert pattern while retaining accessible status semantics. |
| Compound Action | Intent, editable verb, and consequence stay visible through execution. | It connects design actions to user control and local-first policy. |

This is not an attempt to replace the strengths of the competitors. Framer’s canvas is a hosted visual production environment. shadcn/ui’s key advantage is editable source distribution. Radix’s key advantage is deep, unstyled interaction behavior. Atelier should borrow none of their brand expression; it should combine local visual calibration, source ownership, and provenance-aware product controls.

The first release should be judged on whether a small product team can set up a consistent visual system, use it in a React application, inspect its contract, and commit it to Git. It should not be judged on imitation of a mature all-in-one hosted builder.

## Structural parity, adapted—not copied

Atelier needs comparable product surfaces, each with an original purpose and vocabulary.

| Comparable job | Atelier surface | Initial behavior | Later behavior |
| --- | --- | --- | --- |
| Marketing / discovery | **Atelier Studio site** | Explain system, demonstrate interactions, document package | Examples gallery, release notes, public recipe directory |
| Visual editing canvas | **Workbench** | Responsive preview, token calibration, export | Real project canvas, component tree, constraints, named snapshots |
| Content collection | **Content models** | Not started | Local schemas, fixture content, optional remote adapters |
| Design-system docs | **System reference** | README plus token exports | Generated token and component docs, compatibility matrix |
| Component catalog | **Recipe library** | Three visible examples only | Versioned recipes with dependencies, previews, source and tests |
| Interaction foundation | **Primitives** | Button, Stack, VisuallyHidden | Dialog, popover, menu, select, tabs, tooltip, focus utilities |
| Source distribution | **Package channel** | Local workspace package | JSR first, npm mirror later, GitHub release artifact always |
| Publishing | **Deploy adapter** | Local static server only | Static-host targets, explicit deploy previews, custom-domain adapters |
| Collaboration | **Review and sync** | Not started | Optional, end-to-end encrypted/project-scoped sync and review links |

## Required product hierarchy

The website and eventual desktop application should share a coherent hierarchy:

```text
Atelier
├── Home / discovery
│   ├── Why Atelier
│   ├── Workbench demo
│   ├── Component highlights
│   └── Distribution paths
├── System reference
│   ├── Foundations (color, type, space, motion)
│   ├── Tokens and modes
│   ├── Accessibility rules
│   └── Migration guides
├── Components
│   ├── Primitives
│   ├── Patterns / recipes
│   ├── Example applications
│   └── Behavior contracts
├── Workbench (local application)
│   ├── Projects
│   ├── Canvas
│   ├── Layers
│   ├── Inspector
│   ├── Tokens
│   ├── Recipes
│   └── Export / review
└── Ecosystem
    ├── Package registry
    ├── CLI
    ├── Hosting adapters
    └── Optional collaboration
```

This structure is intentional: discovery explains the product; the System Reference answers design-language questions; Components answers implementation questions; Workbench is the product surface; Ecosystem covers distribution and integration. A visitor should not have to infer where a concern lives from a stack of generic cards.

## Capability priority

### Tier 0 — trust and local usefulness

- Stable token schema with semantic naming and modes.
- A versioned local project manifest.
- Accessible package primitives with tests.
- Studio export and import with validation.
- Package documentation and clear examples.
- Source-controlled, reviewable output.

### Tier 1 — design-to-source continuity

- Local desktop shell (Tauri + React + TypeScript, Windows first).
- Components described as a tree of declared recipe nodes, not arbitrary hidden code.
- Safe component import/export flow with AST validation.
- Snapshot, comparison, undo/redo, and Git-aware changes.
- Responsive constraints and content fixtures.

### Tier 2 — workflow depth

- Token modes/themes and theme comparison.
- Component states, interaction previews, and accessibility lint.
- Project-level content schemas and local content fixtures.
- Local registry and deterministic generated docs.
- CLI for validation, export, and migration.

### Tier 3 — optional online services

- Deploy adapters for Netlify, GitHub Pages, Cloudflare Pages, and Vercel.
- Review links with explicit publish control.
- Hosted registry/community recipes only after signed provenance and moderation design.
- Optional collaboration that never blocks local use.

## Explicit non-goals for the initial launch

- A generic AI website generator.
- Mandatory cloud hosting, analytics, or account sign-in.
- Claiming full malware-safe arbitrary-code execution in the Studio.
- A Figma clone or visual design-file replacement.
- A large untested component catalog.
- Automatic source rewrites without an explicit preview and user approval.
- “One-click import” from third-party builders or libraries without a documented compatibility implementation.

## Product proof points

A credible Atelier alpha should demonstrate these flows end to end:

1. Create a local project and generate `atelier.config.json`.
2. Define a token mode with contrast validation.
3. Compose a page from explicitly declared recipes.
4. Switch a component through documented states and keyboard behavior.
5. Export tokens and recipes into source with a readable diff.
6. Consume the same tokens in a React application.
7. Run a local contract/accessibility check in CI.
8. Deploy the static documentation site through a user-selected host.

Until these flows exist, describe Atelier as an early foundation, not a replacement for a commercial visual builder or mature primitive ecosystem.
