import React, { useState, useEffect } from 'react';
import { RefreshCcw, Folder, FileCode, ChevronRight, ChevronDown, MoreVertical } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
}

interface PrimarySidebarProps {
  onFileSelect: (filePath: string) => void;
  activeFilePath?: string;
  workspaceRoot?: string;
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
    <div className="select-none">
      <div 
        onClick={handleClick}
        className={`group flex items-center py-[3px] pr-2 cursor-pointer transition-all border-l-2 border-transparent ${isActive ? 'bg-sky-500/10 text-sky-400 border-sky-500/50' : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'}`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span className="mr-1.5 opacity-60">
          {node.isDirectory ? (
            isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <div className="w-3.5" />
          )}
        </span>
        
        {node.isDirectory ? (
          <Folder className={`w-4 h-4 mr-2 ${isOpen ? 'text-sky-400/70' : 'text-sky-400/40'}`} />
        ) : (
          <FileCode className={`w-4 h-4 mr-2 ${isActive ? 'text-sky-400' : 'text-slate-500/60'}`} />
        )}
        
        <span className="text-[12.5px] truncate font-medium flex-1">{node.name}</span>
      </div>
      
      {node.isDirectory && isOpen && node.children && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
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

const PrimarySidebar: React.FC<PrimarySidebarProps> = ({ onFileSelect, activeFilePath, workspaceRoot }) => {
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshTree = async () => {
    setLoading(true);
    try {
      const tree = await window.ipcRenderer.readDir(workspaceRoot || '');
      setFileTree(tree);
    } catch (error) {
      console.error('Failed to read directory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTree();
  }, [workspaceRoot]);

  return (
    <div className="h-full flex flex-col bg-[#0B0E14] border-r border-[#1E232E] overflow-hidden">
      <div className="flex items-center justify-between px-4 h-9 border-b border-[#1E232E]/50">
        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Explorer</span>
        <div className="flex items-center space-x-1">
          <button onClick={refreshTree} className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-slate-200 transition-all">
            <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="py-2">
          {loading && !fileTree ? (
            <div className="px-6 py-4 flex flex-col space-y-2 opacity-20">
               {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-white/20 rounded animate-pulse w-full" />)}
            </div>
          ) : fileTree ? (
            <FileTreeItem 
              node={fileTree} 
              depth={0} 
              onFileSelect={onFileSelect}
              activeFilePath={activeFilePath}
            />
          ) : (
            <div className="px-6 py-8 text-[11px] text-slate-600 italic text-center">
               Open a folder to see your files
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrimarySidebar;
