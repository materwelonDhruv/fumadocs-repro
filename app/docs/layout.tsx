import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { source } from '@/lib/source';

import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }): ReactNode {
    return (
        <DocsLayout nav={{ title: 'Repro' }} tree={source.getPageTree()} sidebar={{ footer: <div>footer</div> }}>
            {children}
        </DocsLayout>
    );
}
