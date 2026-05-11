import React from 'react';

const PrimarySidebar: React.FC = () => {
  return (
    <div className="w-64 flex flex-col bg-[#0F111A] border-r-custom overflow-hidden">
      {/* Explorer Header */}
      <div className="flex items-center justify-between px-4 py-3 text-xs uppercase font-semibold text-[var(--text-main)]">
        <span>Explorer</span>
        <div className="flex space-x-2 text-[var(--text-muted)]">
          <svg className="w-4 h-4 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" x2="12" y1="18" y2="12"></line>
            <line x1="9" x2="15" y1="15" y2="15"></line>
          </svg>
          <svg className="w-4 h-4 cursor-pointer hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            <line x1="12" x2="12" y1="11" y2="17"></line>
            <line x1="9" x2="15" y1="14" y2="14"></line>
          </svg>
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-1 text-[var(--text-muted)]">
          <div className="flex items-center space-x-1 cursor-pointer hover-bg-custom py-1 rounded px-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="text-sm">python</span>
          </div>
          <div className="flex items-center space-x-2 pl-6 cursor-pointer hover-bg-custom py-1 rounded">
            <svg className="w-4 h-4 text-[var(--syn-keyword)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="text-sm">test.py</span>
          </div>
          <div className="flex items-center space-x-2 pl-6 cursor-pointer active-bg-custom py-1 rounded mt-1 text-[var(--accent-color)] border border-[var(--bg-selection)]">
            <svg className="w-4 h-4 text-[var(--accent-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span className="text-sm">main.asx</span>
          </div>
        </div>
      </div>

      {/* Other Sections (Collapsed placeholders) */}
      <div className="border-t-custom py-2">
        <div className="px-4 py-2 font-medium text-[var(--text-main)] hover-bg-custom cursor-pointer flex justify-between items-center text-sm">
          <span>Board Manager</span>
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
      <div className="border-t-custom py-2">
        <div className="px-4 py-2 font-medium text-[var(--text-main)] hover-bg-custom cursor-pointer flex justify-between items-center text-sm">
          <span>Extensions</span>
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PrimarySidebar;
