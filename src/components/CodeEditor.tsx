import React, { useEffect, useRef } from 'react';
import Editor, { loader, Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  content: string;
  filePath?: string;
  onChange: (value: string | undefined) => void;
  onSave: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ content, filePath, onChange, onSave }) => {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;

    // Define "Astronia Night" theme for Monaco
    monaco.editor.defineTheme('astronia-night', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '546E7A', fontStyle: 'italic' },
        { token: 'keyword', foreground: '82AAFF' },
        { token: 'variable', foreground: 'E5E9F0' },
        { token: 'string', foreground: 'C3E88D' },
        { token: 'number', foreground: 'F07178' },
        { token: 'type', foreground: 'FFCB6B' },
        { token: 'function', foreground: '82AAFF' },
      ],
      colors: {
        'editor.background': '#0F111A',
        'editor.foreground': '#E5E9F0',
        'editor.lineHighlightBackground': '#1A1D27',
        'editorCursor.foreground': '#5EBCDB',
        'editorWhitespace.foreground': '#2D313F',
        'editor.selectionBackground': '#51587B80',
        'editorLineNumber.foreground': '#464B5D',
        'editorLineNumber.activeForeground': '#8F9BB3',
      }
    });

    monaco.editor.setTheme('astronia-night');

    // Add Ctrl+S keybinding
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave();
    });
  }

  // Determine language based on file extension
  const getLanguage = (path?: string) => {
    if (!path) return 'cpp';
    const ext = path.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx': return 'typescript';
      case 'js':
      case 'jsx': return 'javascript';
      case 'asx':
      case 'ino':
      case 'cpp':
      case 'h': return 'cpp';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'css': return 'css';
      case 'html': return 'html';
      default: return 'plaintext';
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0F111A]">
      <Editor
        height="100%"
        defaultLanguage="cpp"
        language={getLanguage(filePath)}
        value={content}
        onChange={onChange}
        onMount={handleEditorDidMount}
        loading={<div className="flex items-center justify-center h-full text-[var(--text-muted)] animate-pulse">Initializing Monaco...</div>}
        options={{
          minimap: { enabled: true, scale: 0.75, side: 'right' },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          lineHeight: 1.7,
          fontLigatures: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: true,
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;
