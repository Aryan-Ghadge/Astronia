import React, { useState, useRef, useEffect } from 'react';

interface MenuOption {
  label: string;
  action?: () => void;
  shortcut?: string;
  divider?: boolean;
}

interface Menu {
  label: string;
  options: MenuOption[];
}

const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const menus: Menu[] = [
    {
      label: 'File',
      options: [
        { label: 'New File', shortcut: 'Ctrl+N' },
        { label: 'New Folder' },
        { divider: true, label: '' },
        { label: 'Open File...', shortcut: 'Ctrl+O' },
        { label: 'Open Folder...' },
        { divider: true, label: '' },
        { label: 'Save', shortcut: 'Ctrl+S' },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
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
      ],
    },
    {
      label: 'View',
      options: [
        { label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
        { label: 'Search', shortcut: 'Ctrl+Shift+F' },
        { label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
        { divider: true, label: '' },
        { label: 'Appearance' },
      ],
    },
    {
      label: 'Sketch',
      options: [
        { label: 'Verify/Compile', shortcut: 'Ctrl+R' },
        { label: 'Upload', shortcut: 'Ctrl+U' },
        { label: 'Upload Using Programmer', shortcut: 'Ctrl+Shift+U' },
        { divider: true, label: '' },
        { label: 'Export Compiled Binary' },
      ],
    },
    { label: 'Tools', options: [{ label: 'Auto Format', shortcut: 'Ctrl+T' }, { label: 'Archive Sketch' }, { label: 'Serial Monitor', shortcut: 'Ctrl+Shift+M' }] },
    { label: 'Run', options: [{ label: 'Start Debugging', shortcut: 'F5' }, { label: 'Run Without Debugging', shortcut: 'Ctrl+F5' }] },
    { label: 'Terminal', options: [{ label: 'New Terminal', shortcut: 'Ctrl+Shift+`' }] },
    { label: 'Help', options: [{ label: 'Welcome' }, { label: 'Documentation' }, { label: 'Check for Updates' }] },
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
    <nav ref={menuRef} className="flex items-center px-2 py-1 space-x-1 text-[var(--text-main)] text-sm border-b-custom bg-[#0F111A] relative z-50">
      {menus.map((menu) => (
        <div key={menu.label} className="relative">
          <button 
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            className={`px-3 py-1 rounded cursor-pointer transition-colors ${activeMenu === menu.label ? 'bg-[var(--bg-selection)]' : 'hover:bg-[var(--bg-selection)]'}`}
          >
            {menu.label}
          </button>
          
          {activeMenu === menu.label && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-[var(--bg-panel)] border border-[var(--border-color)] rounded shadow-xl py-1 animate-in fade-in zoom-in duration-100">
              {menu.options.map((option, index) => (
                option.divider ? (
                  <div key={index} className="h-px bg-[var(--border-color)] my-1 mx-2" />
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      option.action?.();
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs hover:bg-[var(--accent-color)] hover:text-black transition-colors"
                  >
                    <span>{option.label}</span>
                    {option.shortcut && <span className="opacity-50 ml-4">{option.shortcut}</span>}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MenuBar;
