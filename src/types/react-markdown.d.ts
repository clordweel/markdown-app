declare module 'react-markdown' {
  import { ReactNode } from 'react';

  interface ReactMarkdownProps {
    children: string;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
    components?: Record<string, any>;
  }

  export default function ReactMarkdown(props: ReactMarkdownProps): ReactNode;
} 