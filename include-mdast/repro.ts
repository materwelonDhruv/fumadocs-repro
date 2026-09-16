import { register } from 'fumadocs-mdx/node';

register();

const compiled = (await import('./content/page.mdx?collection=docs')) as { _mdast?: string };
const mdast = compiled._mdast;

console.log('typeof _mdast:', typeof mdast);

// runtime/server.js:111 throws on exactly this check
if (!mdast) {
    console.log('_mdast value :', mdast);
    console.log('\ngetMDAST() throws here:');
    console.log('  getMDAST() requires `includeMDAST` to be enabled in your collection config.');
    process.exit(1);
}

const tree = JSON.parse(mdast);
console.log('root type    :', tree.type);
console.log('first child  :', tree.children[1]?.type);

// removePosition was meant to strip these
console.log('position kept:', JSON.stringify(tree.children[1]?.position));
