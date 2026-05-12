import React from 'react';
import { Minus, Square, X } from 'lucide-react';

interface TitleBarProps {
  currentFile?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ currentFile }) => {
  const handleMinimize = () => window.ipcRenderer.minimize();
  const handleMaximize = () => window.ipcRenderer.maximize();
  const handleClose = () => window.ipcRenderer.close();

  return (
    <header className="flex items-center justify-between px-3 h-10 border-b border-border bg-background select-none drag-region">
      <div className="flex items-center space-x-3 no-drag">
        <img 
          alt="Astronia Logo" 
          className="w-4 h-4 object-contain" 
          src="/logo.png" 
        />
        <span className="text-[11px] tracking-[0.2em] font-bold text-muted-foreground uppercase">Astronia IDE</span>
      </div>
      
      <div className="text-[12px] font-medium text-muted-foreground/80 flex items-center space-x-2 pointer-events-none">
        <span className="opacity-50">FirstProject</span>
        <span className="opacity-30">—</span>
        <span className="text-foreground/90">{currentFile || 'Welcome'}</span>
      </div>
      
      <div className="flex items-center no-drag h-full">
        <button 
          onClick={handleMinimize} 
          className="h-full px-4 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={handleMaximize} 
          className="h-full px-4 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Square className="w-3 h-3" />
        </button>
        <button 
          onClick={handleClose} 
          className="h-full px-4 hover:bg-destructive/80 text-muted-foreground hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default TitleBar;
