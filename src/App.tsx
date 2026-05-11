import React, { useState } from 'react';
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

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)]">
      <TitleBar />
      <MenuBar />
      <ActionToolbar />
      
      <main className="flex flex-1 overflow-hidden">
        <ActivityBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {sidebarOpen && <PrimarySidebar />}
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Tabs Area */}
          <div className="flex border-b-custom bg-[#0F111A]">
            <button className="px-3 py-2 text-[var(--text-muted)] hover-bg-custom border-r-custom">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </button>
            <div className="flex items-center px-4 py-2 border-r-custom border-t-2 border-t-[var(--accent-color)] bg-[#0F111A] text-white">
              <span className="mr-2 text-sm">main.asx</span>
              <svg className="w-3 h-3 text-[var(--text-muted)] cursor-pointer hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            </div>
            <div className="flex-1 border-b-custom"></div>
          </div>
          
          <CodeEditor />
          <BottomPanel />
        </div>
        
        {aiSidebarOpen && <AISidebar onClose={() => setAiSidebarOpen(false)} />}
      </main>
      
      <StatusBar onToggleAI={() => setAiSidebarOpen(!aiSidebarOpen)} />
    </div>
  );
}

export default App;
