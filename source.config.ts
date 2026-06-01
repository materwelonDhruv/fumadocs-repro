import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';

export const docs = defineDocs({ dir: 'content/docs' });

// Set TWOSLASH=0 to turn the transformer off. With it on, `next dev` OOMs while serving a page
// with several `twoslash` blocks (see README). Default transformerTwoslash() and no custom options.
const twoslashEnabled = process.env.TWOSLASH !== '0';

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        ...(twoslashEnabled ? [transformerTwoslash()] : []),
      ],
    },
  },
});
