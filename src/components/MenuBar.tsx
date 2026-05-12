import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuOption {
  label: string;
  action?: () => void;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
}

interface Menu {
  label: string;
  options: MenuOption[];
}

interface MenuBarProps {
  onAction: (action: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ onAction }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menus: Menu[] = [
    {
      label: 'File',
      options: [
        { label: 'New File', shortcut: 'Ctrl+N', action: () => onAction('new-file') },
        { label: 'New Folder', action: () => onAction('new-folder') },
        { label: 'New Window', shortcut: 'Ctrl+Shift+N', disabled: true },
        { divider: true, label: '' },
        { label: 'Open File...', shortcut: 'Ctrl+O', action: () => onAction('open-file') },
        { label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O', action: () => onAction('open-folder') },
        { divider: true, label: '' },
        { label: 'Save', shortcut: 'Ctrl+S', action: () => onAction('save') },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: () => onAction('save-as') },
        { label: 'Save All', disabled: true },
        { divider: true, label: '' },
        { label: 'Auto Save', action: () => onAction('toggle-autosave') },
        { label: 'Preferences', action: () => onAction('open-settings') },
        { divider: true, label: '' },
        { label: 'Exit', action: () => window.ipcRenderer.close() },
      ],
    },
    {
      label: 'Edit',
      options: [
        { label: 'Undo', shortcut: 'Ctrl+Z' },
        { label: 'Redo', shortcut: 'Ctrl+Y' },
        { divider: true, label: '' },
        { label: 'Cut', shortcut: 'Ctrl+X' },
        { label: 'Copy', shortcut: 'Ctrl+C' },
        { label: 'Paste', shortcut: 'Ctrl+V' },
        { divider: true, label: '' },
        { label: 'Find', shortcut: 'Ctrl+F' },
        { label: 'Replace', shortcut: 'Ctrl+H' },
      ],
    },
    {
      label: 'View',
      options: [
        { label: 'Explorer', shortcut: 'Ctrl+Shift+E', action: () => onAction('toggle-sidebar') },
        { label: 'Search', shortcut: 'Ctrl+Shift+F' },
        { label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
        { label: 'Output', action: () => onAction('toggle-bottom-panel') },
        { label: 'Terminal', shortcut: 'Ctrl+`', action: () => onAction('toggle-bottom-panel') },
        { divider: true, label: '' },
        { label: 'Appearance', action: () => {} },
      ],
    },
    {
      label: 'Sketch',
      options: [
        { label: 'Verify/Compile', shortcut: 'Ctrl+R', action: () => onAction('verify') },
        { label: 'Upload', shortcut: 'Ctrl+U', action: () => onAction('upload') },
        { label: 'Upload Using Programmer', shortcut: 'Ctrl+Shift+U' },
        { divider: true, label: '' },
        { label: 'Export Compiled Binary', shortcut: 'Ctrl+Alt+S' },
        { label: 'Show Sketch Folder', shortcut: 'Ctrl+K' },
        { divider: true, label: '' },
        { label: 'Include Library', action: () => {} },
        { label: 'Add .File...', action: () => {} },
      ],
    },
    {
      label: 'Tools',
      options: [
        { label: 'Auto Format', shortcut: 'Ctrl+T' },
        { label: 'Archive Sketch' },
        { label: 'Fix Encoding & Reload' },
        { label: 'Manage Libraries...', shortcut: 'Ctrl+Shift+I' },
        { label: 'Serial Monitor', shortcut: 'Ctrl+Shift+M', action: () => onAction('show-serial') },
        { label: 'Serial Plotter', shortcut: 'Ctrl+Shift+L', action: () => onAction('show-plotter') },
        { divider: true, label: '' },
        { label: 'Board: "Astronics Cera"', action: () => {} },
        { label: 'Port: "COM3 (Astronics Cera)"', action: () => {} },
        { label: 'Get Board Info', action: () => {} },
        { divider: true, label: '' },
        { label: 'Programmer', action: () => {} },
        { label: 'Burn Bootloader', action: () => {} },
      ],
    },
    {
      label: 'Run',
      options: [
        { label: 'Start Debugging', shortcut: 'F5' },
        { label: 'Run Without Debugging', shortcut: 'Ctrl+F5' },
      ],
    },
    {
      label: 'Terminal',
      options: [
        { label: 'New Terminal', shortcut: 'Ctrl+Shift+`' },
        { label: 'Split Terminal', shortcut: 'Ctrl+Shift+5' },
        { divider: true, label: '' },
        { label: 'Run Active File' },
        { label: 'Run Selected Text' },
      ],
    },
    {
      label: 'Help',
      options: [
        { label: 'Welcome' },
        { label: 'Documentation' },
        { label: 'Keyboard Shortcuts Reference' },
        { label: 'Tips and Tricks' },
        { divider: true, label: '' },
        { label: 'Check for Updates' },
        { label: 'About Astronia' },
      ],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={menuRef} className="flex items-center px-3 h-8 text-foreground/70 text-[12.5px] border-b border-border bg-background relative z-[100]">
      {menus.map((menu) => (
        <div key={menu.label} className="relative h-full flex items-center">
          <button 
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            className={`px-3 h-[85%] rounded flex items-center transition-colors ${activeMenu === menu.label ? 'bg-secondary text-foreground' : 'hover:bg-secondary/50 hover:text-foreground'}`}
          >
            {menu.label}
          </button>
          
          <AnimatePresence>
            {activeMenu === menu.label && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.1 }}
                className="absolute top-[90%] left-0 w-64 bg-card border border-border rounded-md shadow-2xl py-1 mt-1 z-[101]"
              >
                {menu.options.map((option, index) => (
                  option.divider ? (
                    <div key={index} className="h-px bg-border my-1 mx-2" />
                  ) : (
                    <button
                      key={index}
                      disabled={option.disabled}
                      onClick={() => {
                        option.action?.();
                        setActiveMenu(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-[12px] transition-colors group ${option.disabled ? 'opacity-30 cursor-default' : 'hover:bg-primary hover:text-primary-foreground'}`}
                    >
                      <span className={`${!option.disabled && 'group-hover:font-medium'}`}>{option.label}</span>
                      {option.shortcut && <span className="opacity-40 text-[10px] ml-4 font-mono">{option.shortcut}</span>}
                    </button>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
};

export default MenuBar;
