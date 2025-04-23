import { useState } from 'react';

interface FileManagerProps {
  onFileLoad: (content: string) => void;
  content: string;
}

export function FileManager({ onFileLoad, content }: FileManagerProps) {
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  const handleOpenFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      onFileLoad(text);
      setRecentFiles(prev => [file, ...prev.filter(f => f.name !== file.name)].slice(0, 5));
    }
  };

  const handleSaveFile = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 p-2">
      <label className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
        打开文件
        <input
          type="file"
          accept=".md,.markdown"
          className="hidden"
          onChange={handleOpenFile}
        />
      </label>
      <button
        onClick={handleSaveFile}
        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        保存文件
      </button>
      {recentFiles.length > 0 && (
        <div className="flex-1">
          <select
            className="text-sm bg-white dark:bg-gray-700 border rounded px-2 py-1"
            onChange={async (e) => {
              const file = recentFiles.find(f => f.name === e.target.value);
              if (file) {
                const text = await file.text();
                onFileLoad(text);
              }
            }}
            value=""
          >
            <option value="">最近文件</option>
            {recentFiles.map((file) => (
              <option key={file.name} value={file.name}>
                {file.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
} 