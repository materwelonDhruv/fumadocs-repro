import { remarkLLMs } from 'fumadocs-core/mdx-plugins/remark-llms';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { VFile } from 'vfile';

import type { LLMsOptions } from 'fumadocs-core/mdx-plugins';

const source = '<Callout type="warn">gateway only</Callout>\n\ntext after\n';

// _data puts the twin on file.data.markdown
async function twin(options: LLMsOptions): Promise<string | undefined> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(remarkLLMs, { _data: true, ...options });
    const file = new VFile(source);

    await processor.run(processor.parse(source), file);
    return file.data.markdown as string | undefined;
}

// remark parses this Callout as a text element, not a flow element
const dropCallout: LLMsOptions['filterElement'] = (node) => {
    if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return true;
    return node.name !== 'Callout';
};

const baseline = await twin({});
const filtered = await twin({ filterElement: dropCallout });

console.log('baseline:', JSON.stringify(baseline));
console.log('filtered:', JSON.stringify(filtered));
console.log('identical:', baseline === filtered);

// the Callout should be gone from the second one
process.exit(baseline === filtered ? 1 : 0);
