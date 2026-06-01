# fumadocs dev repro

Minimal Next + Fumadocs MDX app that reproduces a `next dev` out-of-memory crash when serving a page with several `twoslash` code blocks.

## Reproduce

```sh
pnpm install
rm -rf .next
pnpm dev          # next dev (Turbopack)
```

Open `http://localhost:3000/docs`. The request does not complete, heap RSS climbs to the `--max-old-space-size` ceiling, and the dev server exits with `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory`.

`content/docs/index.mdx` has ten `ts twoslash` blocks, each with a `^?` query on a deep zod type. One block serves (peaks ~3.8 GB); the page crosses a 4 GB cap once it has enough blocks. The memory it needs scales with the number and type-depth of the blocks.

## What I ruled out so far

- `pnpm dev:fast` (`TWOSLASH=0`) serves the page. So it tracks twoslash's output.
- `pnpm build` runs the same twoslash work and finishes in under 30s. So twoslash's type computation is not the limit; the dev pipeline is.
- `next dev --webpack` and Node 22 / 25 all OOM. Not bundler- or Node-specific.
- `transformerTwoslash({ twoslashOptions: { cache: false } })` (no environment reuse) still OOMs, and a `typesCache` warmed by a prior build does not help. So it is not twoslash's cached environment.
