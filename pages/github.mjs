export const repositoryUrl = 'https://github.com/HectorFCruzPO/promptpath';

// Keep the deployed repository subpath in every shared link.
export function pageLink(currentUrl, params) {
  const url = new URL(currentUrl);
  url.search = '';
  url.hash = '';
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.href;
}

export function createIssueDraft(form, categoryName) {
  const edit = form.kind === 'edit';
  const title = `${edit ? '[Prompt edit ' + form.promptId + ']' : '[Prompt proposal]'} ${form.title.trim()}`;
  const body = [
    '## Contribution type', edit ? 'Edit existing prompt' : 'New prompt',
    ...(edit ? ['## Prompt ID', form.promptId] : []),
    '## Prompt title', form.title.trim(),
    '## Category', categoryName,
    '## Reason for the proposal', form.reason.trim(),
    '## Proposed prompt wording', form.content.trim(),
    '## Review checklist',
    '- [ ] Reusable wording; no confidential data or credentials.',
    '- [ ] Checked with normal, missing-information, and conflicting-evidence cases.',
    '- [ ] Maintainer review required; this issue does not change the library.',
  ].join('\n\n');
  const url = new URL(repositoryUrl + '/issues/new');
  url.searchParams.set('title', title);
  url.searchParams.set('body', body);
  // Long or Unicode-heavy prompts can exceed practical URL limits. Preserve
  // the complete draft in the UI and offer copy/paste instead of truncation.
  const prefilled = url.href.length <= 7000;
  if (!prefilled) url.searchParams.delete('body');
  return {title, body, prefilled, url: url.href};
}
