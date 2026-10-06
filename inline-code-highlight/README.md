# Search highlighting skips inline code

`highlightMarkdown()` doesn't mark a match if it's inside backticks. Only plain text gets the `<mark>`.

`highlightInTree` only visits `text` nodes, and a backticked span parses as `inlineCode`, so it never gets looked at.

Tested on `fumadocs-core@16.16.2`.

## Repro

```sh
pnpm install
pnpm repro
```

It highlights `registerCriticalFiles` in a line that has it once in backticks and once without. Both should get marked, but only the plain one does:

```txt
highlighted: "call `registerCriticalFiles` here, <mark>registerCriticalFiles</mark> again"
marks: 1
```
