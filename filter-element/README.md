# `filterElement` in `LLMsOptions` never runs

`remarkLLMs` turns MDX into the plain Markdown twin of a page. Its `filterElement` option decides which nodes make it into that output: return `false` for a node and it should be gone. `remarkLLMs` ignores the function you pass, silently.

Versions: `fumadocs-core@16.15.11`, Node 26.7. Same in `16.14.4`.

## Repro

```sh
pnpm install
pnpm repro
```

`repro.ts` runs the same document through `remarkLLMs` twice, the second time with a `filterElement` that returns `false` for every `Callout`. The plugin runs on its own, with no build step.

**Expected:** the second twin drops the `Callout`.

**Actual:** both twins are identical.

```txt
baseline: "<Callout type=\"warn\">gateway only</Callout>\n\ntext after\n"
filtered: "<Callout type=\"warn\">gateway only</Callout>\n\ntext after\n"
identical: true
```

The same option reaches a collection config through `postprocess.includeProcessedMarkdown`, typed `boolean | LLMsOptions`.
