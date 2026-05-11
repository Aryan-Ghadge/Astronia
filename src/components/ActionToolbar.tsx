import React from 'react';

const ActionToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b-custom bg-[#0F111A]">
      <div className="flex items-center space-x-2">
        <button className="p-1.5 border-custom border-[var(--accent-color)] text-[var(--accent-color)] rounded hover-bg-custom" title="Verify">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </button>
        <button className="p-1.5 border-custom border-[var(--accent-color)] text-[var(--accent-color)] rounded hover-bg-custom" title="Upload">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 19V5M5 12l7-7 7 7"></path>
          </svg>
        </button>
        <button className="p-1.5 border-custom rounded hover-bg-custom text-[var(--text-muted)]" title="Stop">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect height="12" width="12" x="6" y="6"></rect>
          </svg>
        </button>
        <div className="flex items-center border-custom rounded py-1 bg-[var(--bg-input)] cursor-pointer hover-bg-custom px-4 min-w-[140px]">
          <span className="mr-2">AstronicsCera</span>
          <svg className="w-3 h-3 text-[var(--text-muted)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-1.5 border-custom rounded hover-bg-custom text-[var(--text-muted)]" title="Serial Plotter">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 3v18h18M7 14l4-4 4 4 6-6"></path>
          </svg>
        </button>
        <button className="p-1.5 border-custom rounded hover-bg-custom text-[var(--text-muted)]" title="Serial Monitor">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="14" rx="2" ry="2" width="20" x="2" y="3"></rect>
            <path d="M8 21h8M12 17v4"></path>
          </svg>
        </button>
        <button className="p-1.5 border-custom border-[var(--accent-color)] text-[var(--accent-color)] rounded hover-bg-custom" title="Play">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        <button className="p-1.5 border-custom rounded hover-bg-custom text-[var(--text-muted)]" title="Next">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line stroke="currentColor" strokeWidth="2" x1="19" x2="19" y1="5" y2="19"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActionToolbar;
