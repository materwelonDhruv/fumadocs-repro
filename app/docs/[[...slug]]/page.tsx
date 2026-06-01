import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

import type { ReactNode } from 'react';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }): Promise<ReactNode> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    const MDXContent = page.data.body;
    return (
        <DocsPage toc={page.data.toc}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsBody>
                <MDXContent components={getMDXComponents()} />
            </DocsBody>
        </DocsPage>
    );
}

export function generateStaticParams(): { slug?: string[] }[] {
    return source.generateParams();
}
