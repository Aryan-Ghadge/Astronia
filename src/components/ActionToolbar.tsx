import React from 'react';
import { Play, Upload, Square, Activity, Monitor, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const ActionToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 h-12 border-b border-[#1E232E] bg-[#0B0E14]">
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-sky-400 hover:bg-sky-400/10" title="Verify (Ctrl+R)">
          <Play className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-sky-400 hover:bg-sky-400/10" title="Upload (Ctrl+U)">
          <Upload className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10" title="Stop">
          <Square className="w-3.5 h-3.5 fill-current" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-2 bg-[#1E232E]" />
        
        <div className="flex items-center h-8 px-3 rounded-md bg-[#11141B] border border-[#1E232E] hover:border-sky-500/50 transition-all cursor-pointer group">
          <span className="text-[12px] font-medium mr-3 group-hover:text-sky-400 transition-colors">Astronics Cera</span>
          <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-sky-400 transition-colors" />
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-white" title="Serial Plotter">
          <Activity className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-500 hover:text-white" title="Serial Monitor">
          <Monitor className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionToolbar;
