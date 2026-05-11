import React from 'react';

interface TitleBarProps {
  currentFile?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ currentFile }) => {
  const handleMinimize = () => window.ipcRenderer.minimize();
  const handleMaximize = () => window.ipcRenderer.maximize();
  const handleClose = () => window.ipcRenderer.close();

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b-custom bg-[#0F111A] select-none drag-region" style={{ WebkitAppRegion: 'drag' } as any}>
      <div className="flex items-center space-x-2 text-[var(--accent-color)] font-medium no-drag" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <img 
          alt="Astronia IDE Logo" 
          className="w-5 h-5 object-contain" 
          src="/logo.png" 
        />
        <span className="text-white text-xs tracking-widest font-bold">ASTRONIA</span>
      </div>
      <div className="text-[var(--text-muted)] text-xs font-medium tracking-wide pointer-events-none opacity-80">
        {currentFile ? `FirstProject — ${currentFile}` : 'Astronia IDE'}
      </div>
      <div className="flex items-center space-x-4 text-[var(--text-muted)] no-drag" style={{ WebkitAppRegion: 'no-drag' } as any}>
        <button onClick={handleMinimize} className="hover:text-white p-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 12H4"></path>
          </svg>
        </button>
        <button onClick={handleMaximize} className="hover:text-white p-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="18" rx="2" ry="2" width="18" x="3" y="3"></rect>
          </svg>
        </button>
        <button onClick={handleClose} className="hover:text-red-500 p-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TitleBar;
