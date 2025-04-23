import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  content: string;
}

// 初始化mermaid配置
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'sans-serif',
});

export function MermaidRenderer({ content }: MermaidRendererProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (elementRef.current) {
        // 清空之前的内容
        elementRef.current.innerHTML = '';
        
        try {
          const { svg } = await mermaid.render(
            `mermaid-${Math.random().toString(36).substring(7)}`,
            content
          );
          elementRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid渲染失败:', error);
          elementRef.current.innerHTML = `
            <div class="text-red-500 p-4 border border-red-300 rounded">
              图表渲染失败: ${(error as Error).message}
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [content]);

  return (
    <div ref={elementRef} className="my-4 flex justify-center" />
  );
} 