# Contributing to PromptPath

Suggest a new prompt or an edit through the website's Contributions page or this repository's Issues tab. Give the proposal a clear title, category, complete proposed wording, and a reason. For an edit, include the stable prompt ID (such as P04).

## Website handoff

The website prepares a draft; it does not publish it. Review the draft, continue to GitHub, sign in if necessary, and click Submit new issue. For long drafts, use Copy full draft and paste the body into the GitHub issue. Proposals and issue URLs are public, so include only reusable instructions and synthetic or de-identified examples.

## What makes a useful prompt

Define the intended outcome, required inputs, output structure, boundaries, and verifiable completion checks. Separate evidence, assumptions, and open questions. Preserve read-only safeguards when investigating data or source systems. Explain how a change improves usability, coverage, correctness, or safety.

Try the prompt with normal inputs, missing information, and conflicting evidence. Describe those checks in the issue. Do not submit credentials, customer records, tax information, or confidential project details.

## Maintainer review

1. Check for duplicates and confirm the proposed use case and reason.
2. Discuss changes in the issue; an open or closed issue alone does not change a prompt.
3. For an accepted proposal, update `lib/content.json` and any relevant steps in `lib/workflows.ts` in a commit or pull request. Keep existing IDs stable; if adding a new ID, update count displays and checks intentionally.
4. Run `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm test:pages`.
5. Review and merge the source change, link it from the issue, and close the issue with the decision recorded.
6. Confirm the GitHub Pages deployment succeeds before announcing the website update.

No proposal is automatically merged. The static website does not contain an administrator dashboard or a private proposal queue.
