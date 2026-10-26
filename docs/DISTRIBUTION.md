# Distribution and publishing plan

## Decision

Use **GitHub + GitHub Pages** as the first public home for the Studio site and documentation, and use **JSR** as the first registry target for the ESM token package once its TypeScript build and package audit are ready. Keep the source package installable from Git until a registry release is intentional. Add npm later as a compatibility mirror only if the audience needs it.

This choice respects the current constraints: no npm account, a local-first product, limited budget, and a need to build trust before operating multiple delivery channels.

## Channels

| Channel | What it distributes | Account needed | Cost / effort | Recommendation |
| --- | --- | --- | --- | --- |
| GitHub repository | Source, issues, docs, local package consumption | GitHub | Low | Start here |
| GitHub Pages | Static Studio/Docs public site | GitHub | Low; public repository required on GitHub Free | First public site |
| GitHub Releases | Versioned source archives and checksums | GitHub | Low | Use once releases exist |
| JSR | ESM TypeScript/JavaScript package | JSR browser sign-in | Low; requires package preparation | First package registry |
| npm | Broad JavaScript ecosystem compatibility | npm account + verified email | Low, but account and release process required | Later mirror, not launch blocker |
| Netlify | Static site hosting, deployment previews, forms/functions later | Netlify | Free tier may suit early work; separate account | Adopt when deploy previews are useful |
| Cloudflare Pages | Static or Worker-based application hosting | Cloudflare | Free tier may suit early work; separate account | Good later option if Workers matter |

## Why GitHub Pages first

The current Studio is a Vite + React application that produces static files with `npm run build`. GitHub Pages can publish static build artifacts from a repository and supports configuring a source folder or Actions workflow. It is therefore a small transition from the current Studio. The public repository must not contain secrets, customer data, unpublished credentials, or private design materials.

Suggested future repository setup:

```text
main
├── apps/studio/             # local development source
├── docs-site/               # public static output or generated docs
└── .github/workflows/pages.yml
```

Do not add the workflow until the user explicitly asks to create a GitHub repository and publish. Deployment is an external state change and needs its own deliberate step.

## Why JSR before npm

The Atelier package is already ESM-oriented. JSR supports ESM JavaScript and TypeScript packages, supports Node.js consumers, performs publication-time validation, and provides browser-based publishing approval from the local CLI. It is particularly well suited to publishing TypeScript source with generated documentation.

The package must be made JSR-ready before publishing:

1. Convert public source from JavaScript to TypeScript or add durable declarations.
2. Add `jsr.json` in the package root with the final scoped package name, version, and explicit exports.
3. Add a top-level `LICENSE` with confirmed copyright holder.
4. Add package-local README/API docs and precise `publish.include` entries.
5. Run `jsr publish --dry-run` before any real publish.
6. Publish manually from the package directory; browser approval makes the external action visible.
7. Link the GitHub repository and move to GitHub Actions OIDC only after the release workflow is trusted.

JSR still requires a user account/sign-in; it simply avoids requiring an npm account. It does not remove the need to choose and protect a package scope.

## npm as a later compatibility mirror

npm remains worth considering because many JavaScript users expect it. However, it is not where people “download Framer”; Framer’s primary product is a hosted design platform, while npm is one way developers install JavaScript packages. Atelier should not make a registry its primary product surface.

When the package reaches a stable public API, create an npm account, verify its email, enable strong account security, choose an organizational scope such as `@magnexis`, and publish from CI using trusted publishing/OIDC where available. Never place a long-lived npm token in the repository, shell history, documentation, or local project configuration.

## Install without any registry

The stable package is available from JSR. Developers who need the Studio or source package can instead use a local workspace clone:

```bash
git clone https://github.com/Magnexis/atelier.git
cd atelier
pnpm install
```

This is not a substitute for a release process, but it is a real distribution path. It works best when release tags, package metadata, and source builds are stable. Consumers should pin tags or commit hashes rather than a mutable default branch.

## Release checklist

- [ ] Version is set deliberately using semantic versioning.
- [ ] Public exports, examples, and changelog match the actual package.
- [ ] License and repository metadata are complete.
- [ ] Dependency audit is reviewed.
- [ ] Unit, contract, and integration tests pass.
- [ ] Package contents are inspected with a dry run.
- [ ] No `.env`, credentials, test fixtures with private data, or local artifacts are included.
- [ ] Git tag and GitHub Release notes are reviewed.
- [ ] Registry dry run passes.
- [ ] Publishing is explicitly approved by the project owner.

## Sources

- GitHub Pages supports creating a site from a new or existing repository and publishes static files; GitHub Free public repositories can use it: <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>
- Netlify supports deploying from a repository, local folder, or zip; connected repositories can auto-deploy on pushes: <https://docs.netlify.com/start/choose-your-path/>
- JSR supports ESM JavaScript and TypeScript packages, validates packages, and offers local publishing through browser authentication: <https://jsr.io/docs/publishing-packages>
- npm publishing needs an npm user account and verified email: <https://docs.npmjs.com/creating-a-new-npm-user-account/>
