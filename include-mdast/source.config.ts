import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

// REMOVE_POSITION=0 switches this to plain `includeMDAST: true`. that one works.
const removePosition = process.env.REMOVE_POSITION !== '0';

export const docs = defineDocs({
    dir: 'content',
    docs: {
        async: true,
        postprocess: {
            includeMDAST: removePosition ? { removePosition: true } : true
        }
    }
});

export default defineConfig();
