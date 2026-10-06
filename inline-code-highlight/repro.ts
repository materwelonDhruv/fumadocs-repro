import { createContentHighlighter } from 'fumadocs-core/search';

const content = 'call `registerCriticalFiles` here, registerCriticalFiles again';
const highlighted = createContentHighlighter('registerCriticalFiles').highlightMarkdown(content);
const marks = highlighted.match(/<mark>/g)?.length ?? 0;

console.log('highlighted:', JSON.stringify(highlighted));
console.log('marks:', marks);

// both occurrences should get a mark
process.exit(marks === 2 ? 0 : 1);
