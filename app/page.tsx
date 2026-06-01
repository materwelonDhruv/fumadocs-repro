import Link from 'next/link';

import type { ReactNode } from 'react';

export default function Home(): ReactNode {
    return (
        <main style={{ padding: 40 }}>
            <Link href="/docs">Go to /docs</Link>
        </main>
    );
}
