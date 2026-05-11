import React from 'react';

const CodeEditor: React.FC = () => {
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Code Editor Content */}
      <div className="flex-1 overflow-y-auto font-mono text-[14px] leading-6 flex bg-[#0F111A]">
        {/* Line Numbers */}
        <div className="w-12 py-4 text-right pr-4 text-[var(--text-muted)] bg-[#0F111A] select-none border-r border-[var(--border-color)]">
          1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14
        </div>
        {/* Code Placeholder */}
        <div className="flex-1 py-4 pl-4 whitespace-pre overflow-x-auto text-[var(--text-main)]">
          <span className="syn-comment">// Hardware definition</span><br/>
          <span className="syn-keyword">const</span> <span className="syn-type">int</span> LED_PIN = <span className="syn-number">13</span>;<br/>
          <br/>
          <span className="syn-type">void</span> <span className="syn-function">setup</span>() {'{'}<br/>
          {'  '}<span className="syn-function">pinMode</span>(LED_PIN, <span className="syn-constant">OUTPUT</span>);<br/>
          {'}'}<br/>
          <br/>
          <span className="syn-type">void</span> <span className="syn-function">loop</span>() {'{'}<br/>
          {'  '}<span className="syn-function">digitalWrite</span>(LED_PIN, <span className="syn-constant">HIGH</span>);<br/>
          {'  '}<span className="syn-function">delay</span>(<span className="syn-number">1000</span>);<br/>
          {'  '}<span className="syn-function">digitalWrite</span>(LED_PIN, <span className="syn-constant">LOW</span>);<br/>
          {'  '}<span className="syn-function">delay</span>(<span className="syn-number">1000</span>);<br/>
          {'}'}
        </div>
      </div>
      
      {/* Minimap Placeholder */}
      <div className="w-24 border-l-custom bg-[#0F111A] hidden md:block opacity-50 relative">
        <div className="h-full w-full py-4 px-2">
          <div className="w-full h-1 bg-[var(--syn-comment)] mb-1"></div>
          <div className="w-3/4 h-1 bg-white mb-3"></div>
          <div className="w-1/2 h-1 bg-[var(--syn-type)] mb-1"></div>
          <div className="w-2/3 h-1 bg-white ml-2 mb-1"></div>
          <div className="w-1/4 h-1 bg-white mb-3"></div>
          <div className="w-1/2 h-1 bg-[var(--syn-type)] mb-1"></div>
          <div className="w-4/5 h-1 bg-white ml-2 mb-1"></div>
          <div className="w-2/3 h-1 bg-[var(--syn-function)] ml-2 mb-1"></div>
          <div className="w-4/5 h-1 bg-white ml-2 mb-1"></div>
          <div className="w-2/3 h-1 bg-[var(--syn-function)] ml-2 mb-1"></div>
          <div className="w-1/4 h-1 bg-white mb-1"></div>
          {/* Highlight box in minimap */}
          <div className="absolute top-10 right-0 w-24 h-16 bg-[var(--bg-selection)] border border-[var(--border-color)]"></div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
