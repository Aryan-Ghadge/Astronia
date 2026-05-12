import React from 'react';
import { Files, Cpu, Blocks, Search, Bug, User, Settings as SettingsIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ActivityBarProps {
  onToggleSidebar: () => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ onToggleSidebar }) => {
  const [activeTab, setActiveTab] = React.useState('explorer');

  const topTabs = [
    { id: 'explorer', title: 'Explorer', icon: <Files className="w-6 h-6" /> },
    { id: 'boards', title: 'Board Manager', icon: <Cpu className="w-6 h-6" /> },
    { id: 'blocks', title: 'Blocks Mode', icon: <Blocks className="w-6 h-6" /> },
    { id: 'search', title: 'Search', icon: <Search className="w-6 h-6" /> },
    { id: 'debug', title: 'Debug', icon: <Bug className="w-6 h-6" /> },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-12 flex flex-col items-center py-4 border-r border-border bg-background space-y-4 text-muted-foreground select-none">
        {topTabs.map((tab) => (
          <Tooltip key={tab.id}>
            <TooltipTrigger asChild>
              <button 
                onClick={() => {
                  if (activeTab === tab.id) {
                    onToggleSidebar();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`group relative p-2 transition-all hover:text-foreground ${activeTab === tab.id ? 'text-foreground' : ''}`}
              >
                {activeTab === tab.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
                {tab.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card text-foreground border-border text-[11px] font-medium">
              {tab.title}
            </TooltipContent>
          </Tooltip>
        ))}
        
        <div className="flex-grow" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 transition-all hover:text-foreground">
              <User className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card text-foreground border-border text-[11px] font-medium">
            Astronian Profile
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 transition-all hover:text-foreground">
              <SettingsIcon className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card text-foreground border-border text-[11px] font-medium">
            Settings
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ActivityBar;
