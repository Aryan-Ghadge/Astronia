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
  const [aiSidebarOpen, setAiSidebarOpen] = useState(true);
  const [activeFilePath, setActiveFilePath] = useState<string | undefined>();
  const [editorContent, setEditorContent] = useState<string>('// Select a file to start coding');

  // Handle file selection from Explorer
  const handleFileSelect = async (filePath: string) => {
    try {
      const content = await window.ipcRenderer.readFile(filePath);
      setActiveFilePath(filePath);
      setEditorContent(content);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  // Handle manual Save (Ctrl+S)
  const handleSave = async () => {
    if (activeFilePath) {
      try {
        await window.ipcRenderer.writeFile(activeFilePath, editorContent);
        console.log('File saved successfully');
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    }
  };

  const fileName = activeFilePath ? activeFilePath.split(/[\\/]/).pop() : 'No file open';

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)]">
      <TitleBar currentFile={fileName} />
      <MenuBar />
      <ActionToolbar />
      
      <main className="flex flex-1 overflow-hidden">
        <ActivityBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {sidebarOpen && (
          <PrimarySidebar 
            onFileSelect={handleFileSelect} 
            activeFilePath={activeFilePath} 
          />
        )}
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Tabs Area */}
          <div className="flex border-b-custom bg-[#0F111A]">
            <button className="px-3 py-2 text-[var(--text-muted)] hover-bg-custom border-r-custom">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </button>
            {activeFilePath && (
              <div className="flex items-center px-4 py-2 border-r-custom border-t-2 border-t-[var(--accent-color)] bg-[#0F111A] text-white animate-in slide-in-from-left-2">
                <span className="mr-2 text-sm">{fileName}</span>
                <svg onClick={() => setActiveFilePath(undefined)} className="w-3 h-3 text-[var(--text-muted)] cursor-pointer hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" x2="6" y1="6" y2="18"></line>
                  <line x1="6" x2="18" y1="6" y2="18"></line>
                </svg>
              </div>
            )}
            <div className="flex-1 border-b-custom"></div>
          </div>
          
          <CodeEditor 
            content={editorContent} 
            filePath={activeFilePath} 
            onChange={(val) => setEditorContent(val || '')} 
            onSave={handleSave}
          />
          <BottomPanel />
        </div>
        
        {aiSidebarOpen && <AISidebar onClose={() => setAiSidebarOpen(false)} />}
      </main>
      
      <StatusBar onToggleAI={() => setAiSidebarOpen(!aiSidebarOpen)} />
    </div>
  );
}

export default App;
