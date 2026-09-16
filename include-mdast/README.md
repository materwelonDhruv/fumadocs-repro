# `includeMDAST: { removePosition: true }` exports `_mdast` as `undefined`

`includeMDAST` exports a page's parsed tree as `_mdast`, which `getMDAST()` reads back. It takes two forms:

```txt
includeMDAST: true // export the tree
includeMDAST: { removePosition: true } // export the tree without the position data
```

The object form turns the export off entirely.

Versions: `fumadocs-mdx@15.4.1`, `unist-util-remove-position@5.0.0`, Node 26.7. Same in `15.2.3`.

## Repro

```sh
pnpm install
pnpm repro # includeMDAST: { removePosition: true }
pnpm control # includeMDAST: true
```

`repro.ts` registers the loader from `fumadocs-mdx/node`, imports the MDX file, and reads `_mdast` off the compiled module. No Vite, no Next, no codegen step. `control` runs the same file through the plain form, which exports the tree fine.

**Expected:** both runs export the serialized tree.

**Actual:** the object form exports `undefined`, so `getMDAST()` reports a config problem.

```txt
typeof _mdast: undefined
_mdast value : undefined

getMDAST() throws here:
  getMDAST() requires `includeMDAST` to be enabled in your collection config.
```
