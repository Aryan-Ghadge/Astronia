import React from 'react';

interface AISidebarProps {
  onClose: () => void;
}

const AISidebar: React.FC<AISidebarProps> = ({ onClose }) => {
  return (
    <div className="w-80 border-l-custom bg-[#0F111A] flex flex-col shadow-2xl">
      {/* AI Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b-custom bg-[#151822]">
        <div className="flex items-center space-x-2 text-[var(--text-main)] font-medium">
          <span className="material-symbols-outlined text-[var(--accent-color)] !text-lg animate-pulse">auto_awesome</span>
          <span className="font-semibold text-sm tracking-tight">ASTRA AI</span>
        </div>
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 flex flex-col overflow-y-auto space-y-6">
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--bg-panel)] border border-[var(--accent-color)] flex items-center justify-center shadow-[0_0_10px_rgba(94,188,219,0.2)]">
              <span className="material-symbols-outlined text-[var(--accent-color)] !text-base">auto_awesome</span>
            </div>
            <span className="text-xs font-bold text-[var(--accent-color)] tracking-wider">ASTRA</span>
          </div>
          <div className="bg-[var(--bg-panel)] border border-[var(--border-color)] rounded-2xl rounded-tl-none p-4 max-w-[95%] shadow-sm">
            <p className="text-sm text-[var(--text-main)] leading-relaxed">
              Hello Aryan! I'm <span className="text-[var(--accent-color)] font-semibold">Astra AI</span>, your specialized hardware co-pilot.
            </p>
            <p className="text-sm text-[var(--text-main)] mt-3 leading-relaxed">
              I can help you write firmware for your <span className="underline decoration-[var(--accent-color)] underline-offset-4">Astronics Cera</span>, debug serial errors, or explain circuit diagrams.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Blink an LED', 'Read Analog Sensor', 'Setup I2C'].map(tip => (
                <button key={tip} className="text-[10px] bg-[var(--bg-input)] hover:bg-[var(--accent-color)] hover:text-black border border-[var(--border-color)] rounded-full px-3 py-1 transition-all">
                  {tip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="p-4 bg-[#151822] border-t-custom">
        <div className="relative group">
          <textarea 
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 pt-3 pb-12 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] focus:ring-1 focus:ring-[var(--accent-color)] resize-none transition-all shadow-inner" 
            placeholder="Ask Astra about your code..." 
            rows={3}
          ></textarea>
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-[var(--accent-color)] text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(94,188,219,0.3)]" title="Send Message">
              <span className="material-symbols-outlined !text-xl !font-bold">send</span>
            </button>
          </div>
        </div>
        <p className="text-[10px] text-[var(--text-muted)] mt-2 text-center opacity-50">
          Astra may provide suggestions that require hardware verification.
        </p>
      </div>
    </div>
  );
};

export default AISidebar;
