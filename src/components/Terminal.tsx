import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current || termRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        background: '#0B0E14',
        foreground: '#E5E9F0',
        cursor: '#5EBCDB',
        black: '#11141B',
        red: '#F07178',
        green: '#C3E88D',
        yellow: '#FFCB6B',
        blue: '#82AAFF',
        magenta: '#C792EA',
        cyan: '#89DDFF',
        white: '#CED1E3',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    
    // Small delay to ensure container is ready
    setTimeout(() => fitAddon.fit(), 100);

    termRef.current = term;

    const outputListener = (data: string) => term.write(data);
    window.ipcRenderer.onTerminalOutput(outputListener);

    term.onData((data) => window.ipcRenderer.terminalInput(data));
    window.ipcRenderer.terminalInput('\r');

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
      termRef.current = null;
    };
  }, []);

  return <div ref={terminalRef} className="h-full w-full bg-[#0B0E14]" />;
};

export default Terminal;
