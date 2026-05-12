import React, { useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

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

    monaco.editor.defineTheme('astronia-pro', {
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
        'editor.background': '#0B0E14',
        'editor.foreground': '#E5E9F0',
        'editor.lineHighlightBackground': '#11141B',
        'editorCursor.foreground': '#5EBCDB',
        'editorWhitespace.foreground': '#1E232E',
        'editor.selectionBackground': '#51587B60',
        'editorLineNumber.foreground': '#3D4455',
        'editorLineNumber.activeForeground': '#8F9BB3',
      }
    });

    monaco.editor.setTheme('astronia-pro');

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave();
    });
  }

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
      default: return 'cpp';
    }
  };

  return (
    <div className="h-full w-full bg-[#0B0E14]">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="cpp"
        language={getLanguage(filePath)}
        value={content}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
