import React from 'react';

const BottomPanel: React.FC = () => {
  return (
    <div className="h-48 border-t-custom bg-[#0F111A] flex flex-col">
      {/* Panel Tabs */}
      <div className="flex text-xs font-medium text-[var(--text-muted)] border-b-custom">
        <button className="px-4 py-2 hover:text-white uppercase tracking-wider">Problems</button>
        <button className="px-4 py-2 text-white border-b-2 border-[var(--accent-color)] uppercase tracking-wider">Output</button>
        <button className="px-4 py-2 hover:text-white uppercase tracking-wider">Terminal</button>
        <button className="px-4 py-2 hover:text-white uppercase tracking-wider">Serial Monitor</button>
        <button className="px-4 py-2 hover:text-white uppercase tracking-wider">Serial Plotter</button>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-3 px-3">
          <button className="hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
          <button className="hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect height="13" rx="2" ry="2" width="13" x="9" y="9"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button className="hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2 text-[var(--text-main)]">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>Compiling main.asx...</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>Uploading to COM3</span>
          <div className="w-64 h-3 bg-[#1A1D27] border border-[var(--border-color)] ml-4">
            <div className="h-full bg-[var(--bg-selection)] w-[85%]"></div>
          </div>
          <span className="text-[var(--text-muted)] ml-2">85%</span>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
