# PromptPath

**Find the right product prompt, follow the workflow, and help improve the collection.**

A public, searchable prompt knowledge base for product owners and product managers, created by Hector Cruz. The standalone website is designed for **GitHub Pages** and uses **GitHub Issues** for contribution proposals. No ChatGPT account or model API key is required to browse, search, or copy prompts.

## Why it exists

Useful prompts get scattered across documents and chat histories. People need more than a list: they need the right prompt for the task, a clear next step, and a way to recommend improvements without overwriting curated content.

## Features

- **29 prompts** grouped into **seven categories** with clear purposes.
- Task search with keyword matching and related terms; category browsing.
- **Four guided workflows** for delivery, research, data analysis, and meeting follow-up.
- Copy prompt wording with optional core instructions, research rules, or read-only safeguards.
- Direct links to prompts and workflows that preserve the GitHub Pages repository path.
- New prompt and edit proposals with a required reason.
- GitHub issue draft handoff, including a copy/paste fallback for large prompts.
- Keyboard access, modal focus handling, and responsive layouts.

Search uses deterministic keyword and synonym matching, not semantic vectors or an LLM. The templates are generalized; company policies, customer records, credentials, and confidential project examples are excluded.

## Run locally

Use **Node 24** and the pinned **pnpm 11.25.0** version.

```sh
git clone https://github.com/HectorFCruzPO/promptpath.git
cd promptpath
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by Vite. To build and preview the static output:

```sh
pnpm build
pnpm preview
```

The `pages-dist/` output contains only static HTML, CSS, JavaScript, and the favicon. It does not deploy the original server, database, authentication code, or proposal records.

## Publish with GitHub Pages

One-time repository setup:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Open **Actions → Deploy PromptPath to GitHub Pages → Run workflow** and select `main` if a deployment has not already started.
4. After the deployment succeeds, use the website link displayed in **Settings → Pages** or the workflow's `github-pages` environment.

The workflow checks content, TypeScript, the production build, share links, and the GitHub issue handoff before publishing. Later pushes to `main` deploy automatically. Pull requests and forks do not deploy through this workflow. If the first run reports that the Pages site cannot be found, complete the one-time settings step and run it again.

GitHub Actions stores the built artifact and publishes it through GitHub Pages. No personal access token or external hosting account is needed. Repository administrators may still need to allow GitHub Actions under their account or organization policies.

## How contributions work

1. Click **Submit a prompt** or **Suggest an edit** on the website.
2. Provide the proposed wording and a reason.
3. Click **Prepare GitHub proposal**.
4. Review the draft and click **Continue to GitHub**.
5. Sign into GitHub if needed, review the issue, and click **Submit new issue**.

Preparing a draft does **not** submit an issue. Short drafts travel in the GitHub issue URL. For a large or Unicode-heavy draft, copy the complete body in the app and paste it into GitHub; the app never truncates the proposed wording. Keep the app tab open until you submit: draft text is held in memory, not a shared database.

Proposals are public. Do not include private customer data, credentials, tax records, or confidential requirements. Issues are proposals, not automatic prompt changes. A maintainer discusses a proposal, updates curated source through a reviewed commit or pull request, and links that change to the issue. The next successful deployment publishes the update.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the review process. Issue templates also support contributions made directly in GitHub.

## Project structure

| Location | Purpose |
|---|---|
| `pages/App.tsx` | Standalone React application for GitHub Pages |
| `pages/github.mjs` | GitHub issue drafts and repository-safe share links |
| `pages/vite.config.ts` | Static build configuration with relative assets |
| `lib/content.json` | Prompts, categories, and reusable instruction blocks |
| `lib/workflows.ts` | Workflow steps linked to stable prompt IDs |
| `lib/contribution-validation.ts` | Contribution field validation |
| `app/globals.css` | Shared visual design |
| `.github/workflows/pages.yml` | Checks, static build, and Pages deployment |
| `.github/ISSUE_TEMPLATE/` | New-prompt and edit templates |
| `scripts/test-pages.mjs` | Static handoff, path, and bundle checks |
| `scripts/test-product.mjs` | Content, validation, and original migration checks |

The original platform-hosted implementation remains in `app/`, `worker/`, and `db/` as a separate reference. Its original deployment remains private. Its backend is not used or published by the Pages build. `pnpm dev:hosted` and `pnpm build:hosted` retain the original platform commands; they require their own platform configuration. Never expose that backend independently while trusting client-supplied identity headers.

## Validation

```sh
pnpm test
pnpm exec tsc --noEmit
pnpm build
pnpm test:pages
```

The static build, TypeScript, content, and handoff checks have passed in the development environment. Fresh installation and publication on GitHub are verified by the workflow; do not infer deployment success from a source commit alone. Browser checks cover search, workflow handoffs, issue preparation, and links. No test issue is automatically posted.

## Product decisions

1. Organize prompts around real tasks and connect them through workflows.
2. Reference stable prompt IDs instead of duplicating wording.
3. Keep proposals separate from curated content.
4. Use GitHub Issues for shared discussion, attribution, and review.
5. Publish the standalone experience without requiring a custom application backend.

## Roadmap and success measures

- Run usability sessions: measure time to find and copy a suitable prompt.
- Check whether users understand the next workflow step and its handoff.
- Track whether proposals include useful wording and reasons.
- Add prompt version history and a project board.
- Improve search based on observed failed searches.

No user-outcome improvement or analytics results are claimed yet.

## Portfolio description

Designed and built a searchable PO/PM prompt knowledge base with task-based information architecture, guided workflows, reusable safety instructions, and a contribution review process. Adapted the product for static hosting with GitHub Pages and GitHub Issues, with automated build and content checks.

Independent project; not affiliated with Anthropic. Third-party license notices remain with their source files. A project-wide license has not yet been selected.
