import React from 'react';

interface ActivityBarProps {
  onToggleSidebar: () => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ onToggleSidebar }) => {
  const [activeTab, setActiveTab] = React.useState('explorer');

  const tabs = [
    { id: 'explorer', title: 'Explorer', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    )},
    { id: 'boards', title: 'Board Manager', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect height="16" rx="2" ry="2" width="16" x="4" y="4"></rect>
        <rect height="6" width="6" x="9" y="9"></rect>
        <line x1="9" x2="9" y1="1" y2="4"></line>
        <line x1="15" x2="15" y1="1" y2="4"></line>
        <line x1="9" x2="9" y1="20" y2="23"></line>
        <line x1="15" x2="15" y1="20" y2="23"></line>
        <line x1="20" x2="23" y1="9" y2="9"></line>
        <line x1="20" x2="23" y1="14" y2="14"></line>
        <line x1="1" x2="4" y1="9" y2="9"></line>
        <line x1="1" x2="4" y1="14" y2="14"></line>
      </svg>
    )},
    { id: 'extensions', title: 'Extensions', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" x2="12" y1="22.08" y2="12"></line>
      </svg>
    )},
    { id: 'search', title: 'Search', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
      </svg>
    )},
    { id: 'debug', title: 'Debug', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20 14h-3M4 14h3M20 10h-3M4 10h3M12 22v-3M12 5V2M15.5 17.5l2.5 2.5M6 4l2.5 2.5M18 4l-2.5 2.5M8.5 17.5L6 20"></path>
        <path d="M16 14v1a4 4 0 0 1-8 0v-1"></path>
        <rect height="7" rx="2" width="8" x="8" y="7"></rect>
      </svg>
    )},
  ];

  return (
    <div className="w-12 flex flex-col items-center py-2 border-r-custom bg-[#0F111A] space-y-2 text-[var(--text-muted)]">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => {
            if (activeTab === tab.id) {
              onToggleSidebar();
            } else {
              setActiveTab(tab.id);
            }
          }}
          className={`p-2 transition-all border-l-2 ${activeTab === tab.id ? 'text-white border-[var(--accent-color)] bg-[var(--bg-selection)]' : 'hover:text-white border-transparent'}`} 
          title={tab.title}
        >
          {tab.icon}
        </button>
      ))}
      <div className="flex-grow"></div>
      <button className="p-2 hover:text-white" title="Profile">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
      <button className="p-2 hover:text-white" title="Settings">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    </div>
  );
};

export default ActivityBar;
