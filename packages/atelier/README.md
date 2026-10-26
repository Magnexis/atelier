# @magnexis/atelier

Atelier is Magnexis' local-first design language for React: portable tokens, explicit interaction contracts, and the Signal Ledger component family.

The stable package is published on JSR as [`@magnexis/atelier`](https://jsr.io/@magnexis/atelier). It is source-owned, signed through GitHub Actions provenance, and does not require an npm account.

```ts
import { SignalToggle, LedgerField } from "jsr:@magnexis/atelier";
```

Install it with `deno add jsr:@magnexis/atelier`, then use the exported React primitives and tokens. The source/Git package additionally carries `styles.css` and `signal.css`; stylesheet entrypoints are intentionally kept in the repository while the JSR package focuses on portable JavaScript APIs and type declarations.

The public API is defined in `src/index.js`, with explicit declarations for JSR consumers. See the [repository README](https://github.com/Magnexis/atelier#readme) for the Studio, navigation guide, release process, and MCP discovery endpoint.
