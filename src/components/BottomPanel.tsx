import React from 'react';
import { CheckCircle2, X, Minimize2, Terminal as TerminalIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface BottomPanelProps {
  onMinimize: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({ onMinimize }) => {
  return (
    <div className="h-full border-t border-[#1E232E] bg-[#0B0E14] flex flex-col overflow-hidden">
      <Tabs defaultValue="output" className="flex-1 flex flex-col">
        <div className="flex items-center px-4 border-b border-[#1E232E]/50 h-9 bg-[#11141B]">
          <TabsList className="bg-transparent h-full p-0 space-x-1">
            {['Problems', 'Output', 'Terminal'].map(tab => (
              <TabsTrigger 
                key={tab}
                value={tab.toLowerCase()} 
                className="data-[state=active]:bg-transparent data-[state=active]:text-sky-400 data-[state=active]:border-b-2 data-[state=active]:border-sky-500 rounded-none h-full px-4 text-[10px] uppercase tracking-widest font-bold transition-all opacity-70 data-[state=active]:opacity-100"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-1" />
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={onMinimize} className="w-6 h-6 text-slate-500 hover:text-slate-200"><Minimize2 className="w-3 h-3" /></Button>
            <Button variant="ghost" size="icon" className="w-6 h-6 text-slate-500 hover:text-slate-200"><X className="w-3.5 h-3.5" /></Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <TabsContent value="problems" className="h-full m-0 p-4">
             <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-2">
                <CheckCircle2 className="w-8 h-8 opacity-20" />
                <p className="text-[12px]">No problems detected.</p>
             </div>
          </TabsContent>
          <TabsContent value="output" className="h-full m-0 p-4 font-mono text-[12px] bg-[#0B0E14]">
             <div className="text-sky-400/60">[info] System initialized. Ready.</div>
          </TabsContent>
          <TabsContent value="terminal" className="h-full m-0 p-4 flex flex-col items-center justify-center text-slate-600">
             <TerminalIcon className="w-8 h-8 opacity-20 mb-2" />
             <p className="text-[12px]">Terminal recovery mode...</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default BottomPanel;
