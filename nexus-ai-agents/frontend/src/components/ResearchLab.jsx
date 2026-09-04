import React, { useState } from 'react';
import { Microscope, Play, Loader2, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Mermaid from './Mermaid';

const ResearchLab = () => {
  const [query, setQuery] = useState('');
  const [report, setReport] = useState('');
  const [status, setStatus] = useState('idle'); // idle, running, complete, error

  const handleResearch = async () => {
    if (!query.trim()) return;
    setStatus('running');
    setReport('');

    try {
      const response = await fetch('http://localhost:8000/api/research/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setReport(data.report);
        setStatus('complete');
      } else {
        setReport(`**Error:** ${data.message}`);
        setStatus('error');
      }
    } catch (err) {
      setReport('**Error:** Could not connect to backend server.');
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Microscope className="text-accent" size={32} />
          Research Lab
        </h1>
        <p className="text-slate-400 mt-2">Enter a topic to dispatch the autonomous web-research agent.</p>
      </div>

      <div className="glass-panel p-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            className="glass-input flex-1 text-lg py-3"
            placeholder="e.g., How is generative AI changing cybersecurity?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={status === 'running'}
            onKeyDown={(e) => e.key === 'Enter' && status !== 'running' && handleResearch()}
          />
          <button 
            className="glass-button flex items-center gap-2 px-8 font-bold text-lg"
            onClick={handleResearch}
            disabled={status === 'running'}
          >
            {status === 'running' ? <Loader2 className="animate-spin" /> : <Play fill="currentColor" size={20} />}
            {status === 'running' ? 'RESEARCHING...' : 'START MISSION'}
          </button>
        </div>
      </div>

      {(status !== 'idle' || report) && (
        <div className="flex-1 glass-panel flex flex-col min-h-0 relative overflow-hidden">
          {/* Status Header */}
          <div className="border-b border-white/10 p-4 bg-black/20 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {status === 'running' && <Loader2 className="animate-spin text-accent" />}
              {status === 'complete' && <CheckCircle2 className="text-success" />}
              <span className="font-semibold uppercase tracking-wider text-sm">
                {status === 'running' ? 'Mission Active: Autonomous Agent is searching sources...' : 
                 status === 'complete' ? 'Mission Complete: Report Generated' : 
                 status === 'error' ? 'Mission Failed' : 'Idle'}
              </span>
            </div>
          </div>
          
          {/* Report Area */}
          <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none">
            {status === 'running' && !report ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="animate-pulse">Synthesizing findings...</p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (!inline && match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return <code className={className} {...props}>{children}</code>;
                  }
                }}
              >
                {report}
              </ReactMarkdown>
            </div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchLab;
