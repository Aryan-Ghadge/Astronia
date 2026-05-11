import React, { useState, useEffect } from 'react';

interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
}

interface PrimarySidebarProps {
  onFileSelect: (filePath: string) => void;
  activeFilePath?: string;
}

const FileTreeItem: React.FC<{
  node: FileNode;
  depth: number;
  onFileSelect: (filePath: string) => void;
  activeFilePath?: string;
}> = ({ node, depth, onFileSelect, activeFilePath }) => {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const isActive = activeFilePath === node.path;

  const handleClick = () => {
    if (node.isDirectory) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(node.path);
    }
  };

  return (
    <div>
      <div 
        onClick={handleClick}
        className={`flex items-center space-x-2 py-1 px-2 cursor-pointer transition-colors text-sm rounded ${isActive ? 'active-bg-custom text-[var(--accent-color)] border border-[var(--bg-selection)]' : 'hover-bg-custom text-[var(--text-muted)]'}`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.isDirectory && (
          <svg className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        )}
        {!node.isDirectory && <div className="w-3.5" />}
        
        {node.isDirectory ? (
          <svg className="w-4 h-4 text-amber-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
          </svg>
        ) : (
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        )}
        
        <span className="truncate">{node.name}</span>
      </div>
      
      {node.isDirectory && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem 
              key={child.path} 
              node={child} 
              depth={depth + 1} 
              onFileSelect={onFileSelect}
              activeFilePath={activeFilePath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PrimarySidebar: React.FC<PrimarySidebarProps> = ({ onFileSelect, activeFilePath }) => {
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshTree = async () => {
    try {
      const tree = await window.ipcRenderer.readDir('');
      setFileTree(tree);
    } catch (error) {
      console.error('Failed to read directory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTree();
  }, []);

  return (
    <div className="w-64 flex flex-col bg-[#0F111A] border-r-custom overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 text-xs uppercase font-semibold text-[var(--text-main)]">
        <span>Explorer</span>
        <div className="flex space-x-2 text-[var(--text-muted)]">
          <button onClick={refreshTree} title="Refresh Explorer" className="hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="px-4 text-xs text-[var(--text-muted)] animate-pulse">Loading project...</div>
        ) : fileTree ? (
          <FileTreeItem 
            node={fileTree} 
            depth={0} 
            onFileSelect={onFileSelect}
            activeFilePath={activeFilePath}
          />
        ) : (
          <div className="px-4 text-xs text-red-400">Failed to load files.</div>
        )}
      </div>
    </div>
  );
};

export default PrimarySidebar;
