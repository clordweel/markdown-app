import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./styles/markdown.css";
import Editor from '@monaco-editor/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { MermaidRenderer } from './components/MermaidRenderer'
import { FileManager } from './components/FileManager'
import { ThemeProvider, useTheme } from 'next-themes'
import { ThemeToggle } from './components/ThemeToggle'
import { ExportTools } from './components/ExportTools'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Pencil, Eye } from "lucide-react"
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'
import { DEFAULT_MARKDOWN } from './examples/default-content'

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [editorWidth, setEditorWidth] = useState(50); // 初始宽度百分比
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = (e.clientX / containerWidth) * 100;
      // 限制最小和最大宽度
      const clampedWidth = Math.max(30, Math.min(70, newWidth));
      setEditorWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      {/* 移动端视图 */}
      <div className="md:hidden flex flex-col h-full">
        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "editor" | "preview")} className="flex flex-col h-full">
          <div className="shrink-0 flex items-center justify-between h-12 px-4 border-b bg-background">
            <TabsList className="h-8">
              <TabsTrigger value="editor" className="flex items-center gap-2 px-3 h-7">
                <Pencil className="h-4 w-4" />
                编辑
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2 px-3 h-7">
                <Eye className="h-4 w-4" />
                预览
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="editor" className="h-[calc(100vh-3rem)]">
            <div className="shrink-0 flex justify-between items-center h-12 px-4 border-b bg-background">
              <FileManager onFileLoad={setMarkdown} content={markdown} />
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage="markdown"
                value={markdown}
                onChange={(value) => setMarkdown(value || '')}
                theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
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
          </TabsContent>
          <TabsContent value="preview" className="h-[calc(100vh-3rem)]">
            <div className="shrink-0 flex justify-between items-center h-12 px-4 border-b bg-background">
              <div className="text-sm font-medium">预览</div>
              <ExportTools targetId="preview" />
            </div>
            <div id="preview" className="flex-1 min-h-0 overflow-auto p-4 bg-background">
              <div className="markdown-preview">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeHighlight]}
                  components={components}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 桌面端视图 */}
      <div className="hidden md:flex md:h-screen" ref={containerRef}>
        <div className="flex flex-col border-r" style={{ width: `${editorWidth}%` }}>
          <div className="shrink-0 flex justify-between items-center h-12 px-4 border-b bg-background">
            <FileManager onFileLoad={setMarkdown} content={markdown} />
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={markdown}
              onChange={(value) => setMarkdown(value || '')}
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
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
        </div>
        <div 
          className="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          onMouseDown={handleMouseDown}
        />
        <div className="flex flex-col" style={{ width: `${100 - editorWidth}%` }}>
          <div className="shrink-0 flex justify-between items-center h-12 px-4 border-b bg-background">
            <div className="text-sm font-medium">预览</div>
            <ExportTools targetId="preview" />
          </div>
          <div id="preview" className="flex-1 min-h-0 overflow-auto p-4 bg-background">
            <div className="markdown-preview">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* 主题切换悬浮按钮 */}
      <div className="fixed left-4 bottom-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MarkdownEditor />
    </ThemeProvider>
  );
}

export default App;
