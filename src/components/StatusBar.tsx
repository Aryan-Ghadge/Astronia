import React from 'react';
import { Radio, AlertTriangle, CheckCircle2, Sparkles, Binary } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface StatusBarProps {
  onToggleAI: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onToggleAI }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <footer className="flex items-center justify-between px-3 h-6 bg-[#0B0E14] border-t border-[#1E232E] text-[#8F9BB3] text-[11px] font-medium select-none z-50">
        <div className="flex items-center h-full">
          <div className="flex items-center space-x-3 px-2 h-full hover:bg-white/5 cursor-pointer transition-colors">
             <div className="flex items-center space-x-1 text-[#C3E88D]">
                <CheckCircle2 className="w-3 h-3" />
                <span>0</span>
             </div>
             <div className="flex items-center space-x-1 text-[#FFCB6B]">
                <AlertTriangle className="w-3 h-3" />
                <span>0</span>
             </div>
          </div>
          
          <div className="h-3 w-px bg-[#1E232E] mx-1" />
          
          <div className="flex items-center space-x-2 px-2 h-full hover:bg-white/5 cursor-pointer transition-colors text-sky-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span className="tracking-tight">Connected: Astronics Cera (COM3)</span>
          </div>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            onClick={onToggleAI}
            className="flex items-center space-x-1.5 px-3 h-full hover:bg-white/5 transition-colors border-x border-[#1E232E] text-sky-400/80 hover:text-sky-400"
          >
            <Sparkles className="w-3 h-3" />
            <span className="font-bold tracking-tight uppercase text-[9px]">Astra AI</span>
          </button>
          
          <div className="flex items-center space-x-4 px-3 h-full opacity-80">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[9px] uppercase tracking-wider opacity-60">XP</span>
              <div className="w-16 h-1 bg-[#1E232E] rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-1/3 shadow-[0_0_8px_#0ea5e9]" />
              </div>
              <span className="font-bold text-white">1,500</span>
            </div>
            <div className="h-3 w-px bg-[#1E232E]" />
            <span className="hover:text-white cursor-pointer">UTF-8</span>
            <div className="h-3 w-px bg-[#1E232E]" />
            <span className="hover:text-white cursor-pointer">C++</span>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
};

export default StatusBar;
