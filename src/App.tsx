import React, { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import MenuBar from './components/MenuBar';
import ActionToolbar from './components/ActionToolbar';
import ActivityBar from './components/ActivityBar';
import PrimarySidebar from './components/PrimarySidebar';
import CodeEditor from './components/CodeEditor';
import BottomPanel from './components/BottomPanel';
import AISidebar from './components/AISidebar';
import StatusBar from './components/StatusBar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(true);
  const [activeFilePath, setActiveFilePath] = useState<string | undefined>();
  const [editorContent, setEditorContent] = useState<string>('// Welcome to Astronia Pro');
  const [workspaceRoot, setWorkspaceRoot] = useState<string>('');

  const handleFileSelect = async (filePath: string) => {
    try {
      const content = await window.ipcRenderer.readFile(filePath);
      setActiveFilePath(filePath);
      setEditorContent(content);
    } catch (error) { console.error('Error reading file:', error); }
  };

  const handleSave = async () => {
    if (activeFilePath) {
      try { 
        await window.ipcRenderer.writeFile(activeFilePath, editorContent); 
      } 
      catch (error) { console.error('Error saving file:', error); }
    }
  };

  const handleAction = async (action: string) => {
    switch (action) {
      case 'open-folder':
        const dirPath = await window.ipcRenderer.openFolderDialog();
        if (dirPath) setWorkspaceRoot(dirPath);
        break;
      case 'save': handleSave(); break;
      case 'toggle-sidebar': setSidebarOpen(!sidebarOpen); break;
      case 'toggle-bottom-panel': setBottomPanelOpen(!bottomPanelOpen); break;
      case 'toggle-ai': setAiSidebarOpen(!aiSidebarOpen); break;
    }
  };

  const fileName = activeFilePath ? activeFilePath.split(/[\\/]/).pop() : undefined;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0B0E14] text-[#CED1E3] font-sans border border-[#1E232E]">
      <TitleBar currentFile={fileName} />
      <MenuBar onAction={handleAction} />
      <ActionToolbar />
      
      <main className="flex flex-1 overflow-hidden">
        <ActivityBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {sidebarOpen && (
          <div className="w-64 flex-shrink-0 border-r border-[#1E232E]">
             <PrimarySidebar onFileSelect={handleFileSelect} activeFilePath={activeFilePath} workspaceRoot={workspaceRoot} />
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E14]">
           <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center h-9 bg-[#11141B] border-b border-[#1E232E]/50">
                {activeFilePath && (
                  <div className="flex items-center px-4 h-full bg-[#0B0E14] border-r border-[#1E232E] relative min-w-fit">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500 shadow-[0_0_8px_#0ea5e9]" />
                    <span className="text-[12px] font-medium mr-3">{fileName}</span>
                    <button onClick={() => setActiveFilePath(undefined)} className="hover:bg-white/10 rounded px-1">✕</button>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                 <CodeEditor content={editorContent} filePath={activeFilePath} onChange={setEditorContent} onSave={handleSave} />
              </div>
           </div>
           
           {bottomPanelOpen && (
             <div className="h-64 flex-shrink-0 border-t border-[#1E232E]">
                <BottomPanel onMinimize={() => setBottomPanelOpen(false)} />
             </div>
           )}
        </div>
        
        {aiSidebarOpen && (
          <div className="w-80 flex-shrink-0 border-l border-[#1E232E]">
             <AISidebar onClose={() => setAiSidebarOpen(false)} />
          </div>
        )}
      </main>
      
      <StatusBar onToggleAI={() => setAiSidebarOpen(!aiSidebarOpen)} />
    </div>
  );
}

export default App;
