import React from 'react';
import { Send, Sparkles, X, ChevronRight, MessageSquare, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface AISidebarProps {
  onClose: () => void;
}

const AISidebar: React.FC<AISidebarProps> = ({ onClose }) => {
  return (
    <div className="w-80 border-l border-border bg-background flex flex-col shadow-2xl relative z-40">
      {/* AI Header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-border/60 bg-secondary/10 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          </div>
          <span className="font-bold text-[13px] tracking-tight text-foreground/90">ASTRA CO-PILOT</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="w-7 h-7 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Chat Area */}
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 opacity-50">
              <MessageSquare className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Recent Activity</span>
            </div>
            
            <div className="bg-secondary/20 border border-border/50 rounded-2xl p-4 space-y-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -mr-12 -mt-12 rounded-full group-hover:bg-primary/10 transition-colors" />
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(94,188,219,0.4)]">
                   <Cpu className="w-4 h-4 text-background" />
                </div>
                <div>
                   <p className="text-[13px] font-bold text-foreground">Astronics Cera v1</p>
                   <p className="text-[10px] text-muted-foreground uppercase font-medium">Hardware Context Active</p>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <p className="text-[13px] leading-relaxed text-foreground/90">
                  Hello! I've analyzed your <span className="text-primary font-medium">main.asx</span> file.
                </p>
                <p className="text-[13px] leading-relaxed text-foreground/80">
                  Your loop timing is set to <span className="bg-secondary/50 px-1.5 py-0.5 rounded text-[11px] font-mono">1000ms</span>. Would you like me to optimize it for better sensor responsiveness?
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {[
                  { label: 'Optimize Timing', icon: <Zap className="w-3 h-3" /> },
                  { label: 'Check for Errors', icon: <ShieldAlert className="w-3 h-3" /> }
                ].map((action, i) => (
                  <button key={i} className="flex items-center justify-between w-full px-3 py-2 bg-background border border-border hover:border-primary/50 rounded-lg text-[11px] font-medium transition-all group/btn">
                    <span className="flex items-center space-x-2">
                       <span className="text-primary/70 group-hover/btn:text-primary">{action.icon}</span>
                       <span>{action.label}</span>
                    </span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 -translate-x-1 group-hover/btn:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {/* Chat Input */}
      <div className="p-4 bg-secondary/5 border-t border-border">
        <div className="relative">
          <textarea 
            className="w-full bg-background border border-border rounded-xl px-4 py-3 pb-12 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 resize-none transition-all shadow-inner" 
            placeholder="Ask Astra anything..." 
            rows={3}
          ></textarea>
          <div className="absolute bottom-3 right-3">
            <Button size="sm" className="h-8 rounded-lg px-3 bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(94,188,219,0.3)] transition-all">
              <Send className="w-3.5 h-3.5 mr-2" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Send</span>
            </Button>
          </div>
        </div>
        <p className="text-[9px] text-muted-foreground/40 mt-3 text-center uppercase tracking-widest font-bold">
          Gemini Pro 1.5 Powered
        </p>
      </div>
    </div>
  );
};

export default AISidebar;
