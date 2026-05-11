import React from 'react';

interface StatusBarProps {
  onToggleAI: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onToggleAI }) => {
  return (
    <footer className="flex items-center justify-between px-3 py-1 bg-[#1A1D27] text-xs border-t-custom text-[var(--text-main)] select-none">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 cursor-pointer text-[#F07178] hover:bg-[var(--bg-selection)] px-1 rounded transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" x2="9" y1="9" y2="15"></line>
            <line x1="9" x2="15" y1="9" y2="15"></line>
          </svg>
          <span>0</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer text-[var(--syn-constant)] hover:bg-[var(--bg-selection)] px-1 rounded transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" x2="12" y1="9" y2="13"></line>
            <line x1="12" x2="12.01" y1="17" y2="17"></line>
          </svg>
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-[var(--bg-selection)] px-2 py-0.5 rounded transition-colors">
          <div className="w-2 h-2 rounded-full bg-[#C3E88D]"></div>
          <span>Connected: Astronics Cera (COM3)</span>
        </div>
        
        <button 
          onClick={onToggleAI}
          className="flex items-center space-x-1 cursor-pointer hover:bg-[var(--bg-selection)] px-2 py-0.5 rounded transition-colors text-[var(--accent-color)]"
        >
          <span className="material-symbols-outlined !text-sm">auto_awesome</span>
          <span>Astra AI</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-[var(--accent-color)] font-medium">1,500 XP</span>
          <div className="w-24 h-1.5 bg-[#0F111A] rounded-full border border-[var(--border-color)] overflow-hidden">
            <div className="h-full bg-[var(--accent-color)] w-1/3 shadow-[0_0_8px_var(--accent-color)]"></div>
          </div>
        </div>
        <div className="text-[var(--text-muted)] opacity-50">UTF-8</div>
      </div>
    </footer>
  );
};

export default StatusBar;
