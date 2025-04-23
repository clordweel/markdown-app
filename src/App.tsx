import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Editor from '@monaco-editor/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { MermaidRenderer } from './components/MermaidRenderer'
import { FileManager } from './components/FileManager'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'

const DEFAULT_MARKDOWN = `# Hello World

这是一个Markdown编辑器。

## Mermaid图表示例

\`\`\`mermaid
graph TD
    A[开始] --> B{是否继续?}
    B -->|是| C[处理]
    C --> D[结束]
    B -->|否| D
\`\`\`

## 代码示例

\`\`\`typescript
function hello(name: string): string {
    return \`Hello, \${name}!\`;
}
\`\`\`

## 数学公式示例

当 $a \\ne 0$ 时，一元二次方程 $ax^2 + bx + c = 0$ 的解为：

$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$
`;

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const content = String(children).replace(/\n$/, '');

      if (!inline && match?.[1] === 'mermaid') {
        return <MermaidRenderer content={content} />;
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <FileManager onFileLoad={setMarkdown} content={markdown} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={markdown}
            onChange={(value) => setMarkdown(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
          />
        </div>
        <div className="w-1/2 p-4 overflow-auto prose prose-invert max-w-none bg-gray-800">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={components}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;
