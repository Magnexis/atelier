# Changelog

All notable project changes are documented here. This project follows Keep a Changelog style and intends to use semantic versioning once a public registry scope is reserved.

## [Unreleased]

## [1.1.2] - 2026-10-26

### Improved

- Added symbol-level JSDoc to the explicit declaration surface so the JSR reference is complete and editor hovers remain useful.

## [1.1.1] - 2026-10-26

### Improved

- Attached explicit JSR type declarations to both JavaScript entrypoints, avoiding the registry's slow-type path while retaining the stable runtime implementation.
- Added module documentation for the tokens entrypoint and expanded package-facing documentation.
- Added a concise Studio navigation and adoption guide at `docs/GETTING-STARTED.md`.

### Changed

- Corrected public documentation to reflect the signed JSR package, GitHub release workflow, production Netlify address, and current product limitations.

### Fixed

- Netlify now deploys a self-contained MCP function bundle, preventing runtime dependency resolution failures on the public `/mcp` route.

## [1.1.0] - 2026-10-26

### Added

- `Disclosure`: a native, source-owned disclosure primitive with visible state and an optional open-state callback.
- `SegmentedControl`: a keyboard-operable local choice group with arrow, Home, and End navigation.
- `CommandLedger`: filterable consumer-owned local commands with explicit callbacks and no shell execution.
- GitHub Actions OIDC publishing, linked to JSR without a stored registry token.

### Changed

- Published package and Studio release metadata advance to `1.1.0`.

## [1.0.0] - 2026-10-26

### Added

- Vite + React Studio application with a local Workbench and token export.
- Interactive catalog variants and component inspection.
- Signal Ledger design language: `SignalToggle`, `LedgerField`, and `MarginNote` primitives.
- Portable recipe metadata for local-state, settings, feedback, and commerce workflows.
- Distribution guidance for GitHub, JSR, and a future npm compatibility mirror.
- A public, read-only Streamable HTTP MCP endpoint at `/mcp` for catalog and release discovery.
- First stable public release under the Magnexis organization.

### Changed

- Replaced npm-first marketing copy with workspace/Git and planned JSR distribution guidance.
- Reframed Atelier around local state provenance and visible intent rather than generic component-kit patterns.

### Security

- The Studio remains local-first: no telemetry, account requirement, or secret-bearing configuration is included.

## [0.1.0] - 2026-10-26

### Added

- Initial token contract, React primitives, local Studio, and documentation foundation.
