// fumadocs-mdx/node compiles these at import time
declare module '*.mdx?collection=docs' {
    export const _mdast: string | undefined;
}
