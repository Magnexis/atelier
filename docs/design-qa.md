# Signal Ledger design QA

Date: 2026-10-26  
Reference: selected Signal Toggle direction

## Scope

This review covers the Studio's component catalog and the public `SignalToggle`, `LedgerField`, and `MarginNote` package primitives. The reference image is a direction for the component language, not a request to copy a proprietary product interface.

## Verification

- The component catalog was inspected in the deployed Vite preview at desktop width.
- The `Local / Share` signal control was toggled through the browser; its `aria-checked` state changed to `true`.
- The visible component cards use the selected language: ruled surfaces, monospaced metadata, a traveling cobalt signal bead, explicit provenance (`@local`), and marginal change notes.
- Both selected states use meaningful labels rather than color alone.

## Result

Passed for the selected component-language milestone. The Studio intentionally retains its own catalog layout rather than reproducing the reference screen's sidebar and property inspector. Future component detail routes can extend the same language with anatomy, events, and accessibility sections.
