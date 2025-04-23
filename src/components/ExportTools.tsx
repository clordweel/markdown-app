import { Camera, Download } from "lucide-react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { Button } from "./ui/button";

interface ExportToolsProps {
  targetId: string;
}

export function ExportTools({ targetId }: ExportToolsProps) {
  const getActualHeight = (element: HTMLElement): number => {
    let height = 0;
    const children = element.children;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const style = getComputedStyle(child);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const childHeight = child.offsetHeight + marginTop + marginBottom;
      height = Math.max(height, child.offsetTop + childHeight);
    }
    
    return height;
  };

  const handleScreenshot = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // 保存原始滚动位置
    const originalScrollTop = element.scrollTop;
    const originalScrollLeft = element.scrollLeft;

    // 临时设置滚动位置到顶部
    element.scrollTop = 0;
    element.scrollLeft = 0;

    // 获取元素的实际尺寸
    const width = element.scrollWidth;
    const actualHeight = getActualHeight(element);
    const height = actualHeight + 100; // 添加额外的空间

    // 创建一个临时容器来容纳整个内容
    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${width}px`;
    tempContainer.style.height = `${height}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.background = getComputedStyle(element).background;
    document.body.appendChild(tempContainer);

    // 克隆内容到临时容器
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = `${width}px`;
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    clone.style.position = 'relative';
    clone.style.background = getComputedStyle(element).background;
    clone.style.padding = getComputedStyle(element).padding;
    clone.style.margin = getComputedStyle(element).margin;
    tempContainer.appendChild(clone);

    try {
      // 等待内容完全加载
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: width,
        height: height,
        backgroundColor: getComputedStyle(element).backgroundColor,
        onclone: (clonedDoc) => {
          // 确保所有图片都加载完成
          const images = clonedDoc.getElementsByTagName('img');
          return Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          }));
        }
      });

      // 裁剪掉多余的空间
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = width * 3;
      finalCanvas.height = actualHeight * 3;
      const ctx = finalCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);
      }

      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = finalCanvas.toDataURL("image/png", 1.0);
      link.click();
    } finally {
      // 清理临时容器
      document.body.removeChild(tempContainer);
      // 恢复原始滚动位置
      element.scrollTop = originalScrollTop;
      element.scrollLeft = originalScrollLeft;
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // 获取元素的实际尺寸
    const width = element.scrollWidth;
    const actualHeight = getActualHeight(element);

    const opt = {
      margin: 0.5,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 3,
        width: width,
        height: actualHeight,
        useCORS: true,
        allowTaint: true,
        backgroundColor: getComputedStyle(element).backgroundColor,
      },
      jsPDF: { 
        unit: "px",
        format: [width, actualHeight] as [number, number],
        orientation: width > actualHeight ? "landscape" : "portrait",
      },
    };

    await html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="default" onClick={handleScreenshot}>
        <Camera className="h-5 w-5 mr-2" />
        截图
      </Button>
      <Button variant="outline" size="default" onClick={handleExportPDF}>
        <Download className="h-5 w-5 mr-2" />
        PDF
      </Button>
    </div>
  );
} 