import React, { useState } from 'react';
import { Network, Play, Loader2, Target, CheckCircle2, Search, BrainCircuit, FileOutput } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Mermaid from './Mermaid';

const MultiAgent = () => {
  const [query, setQuery] = useState('');
  const [report, setReport] = useState('');
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, running, complete, error

  const handleMission = async () => {
    if (!query.trim()) return;
    setStatus('running');
    setReport('');

    try {
      const response = await fetch('http://localhost:8000/api/mission/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setReport(data.report);
        setTasks(data.tasks || []);
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
          <Network className="text-purple-400" size={32} />
          Multi-Agent Mission
        </h1>
        <p className="text-slate-400 mt-2">Deploy a specialized team (Researcher, Analyst, Reporter) using CrewAI orchestration.</p>
      </div>

      <div className="glass-panel p-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            className="glass-input flex-1 text-lg py-3"
            placeholder="e.g., Research AI cybersecurity threats and create a security-focused report."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={status === 'running'}
            onKeyDown={(e) => e.key === 'Enter' && status !== 'running' && handleMission()}
          />
          <button 
            className="glass-button border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500 flex items-center gap-2 px-8 font-bold text-lg"
            onClick={handleMission}
            disabled={status === 'running'}
          >
            {status === 'running' ? <Loader2 className="animate-spin" /> : <Play fill="currentColor" size={20} />}
            {status === 'running' ? 'EXECUTING...' : 'DISPATCH CREW'}
          </button>
        </div>
      </div>

      {(status !== 'idle' || report) && (
        <div className="flex-1 glass-panel flex flex-col min-h-0 relative overflow-hidden">
          {/* Agent Workflow Visualization */}
          <div className="border-b border-white/10 p-6 bg-black/20 flex justify-around items-center z-10">
            <div className={`flex flex-col items-center gap-2 transition-opacity ${status === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`p-4 rounded-full border-2 ${status === 'running' ? 'border-accent bg-accent/20 text-accent animate-pulse' : 'border-success bg-success/20 text-success'}`}>
                <Target size={24} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Orchestrator</span>
            </div>
            
            <div className={`flex-1 h-0.5 bg-gradient-to-r from-accent to-transparent mx-4 ${status === 'running' ? 'animate-pulse' : ''}`}></div>

            <div className={`flex flex-col items-center gap-2 transition-opacity ${status === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`p-4 rounded-full border-2 ${status === 'running' ? 'border-info bg-info/20 text-info animate-bounce' : 'border-success bg-success/20 text-success'}`}>
                <Search size={24} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Researcher</span>
            </div>

            <div className={`flex-1 h-0.5 bg-gradient-to-r from-info to-transparent mx-4 ${status === 'running' ? 'animate-pulse delay-75' : ''}`}></div>

            <div className={`flex flex-col items-center gap-2 transition-opacity ${status === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`p-4 rounded-full border-2 ${status === 'running' ? 'border-warning bg-warning/20 text-warning animate-bounce delay-75' : 'border-success bg-success/20 text-success'}`}>
                <BrainCircuit size={24} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Analyst</span>
            </div>

            <div className={`flex-1 h-0.5 bg-gradient-to-r from-warning to-transparent mx-4 ${status === 'running' ? 'animate-pulse delay-150' : ''}`}></div>

            <div className={`flex flex-col items-center gap-2 transition-opacity ${status === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              <div className={`p-4 rounded-full border-2 ${status === 'running' ? 'border-purple-400 bg-purple-400/20 text-purple-400 animate-bounce delay-150' : 'border-success bg-success/20 text-success'}`}>
                <FileOutput size={24} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase">Reporter</span>
            </div>
          </div>
          
          {/* Report Area */}
          <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none">
            {status === 'running' && !report ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <p className="animate-pulse">Agents are collaborating in the background. Check backend terminal for live agent trace...</p>
              </div>
            ) : (
              <div>
                {status === 'complete' && (
                  <div className="mb-6 flex justify-end">
                    <button 
                      onClick={() => {
                        const blob = new Blob([report], { type: 'text/markdown' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'nexus_multi_agent_report.md';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="glass-button text-sm px-4 py-2 flex items-center gap-2 border-accent text-accent hover:bg-accent/20"
                    >
                      <FileOutput size={16} />
                      Download Report (Markdown)
                    </button>
                  </div>
                )}
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
                
                {tasks.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-accent">
                      <Network size={24} />
                      Agent Operation Trace
                    </h2>
                    <p className="text-slate-400 mb-6">See exactly what each autonomous agent contributed to the final report below.</p>
                    <div className="space-y-6">
                      {tasks.map((task, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 rounded-lg p-6 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                            <div className="p-3 rounded-full bg-white/5 text-white/70">
                              <BrainCircuit size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl m-0 text-white">{task.agent}</h3>
                              <p className="text-sm text-accent m-0 mt-1 font-mono">Mission: {task.description}</p>
                            </div>
                          </div>
                          <div className="prose prose-sm prose-invert max-w-none text-slate-300">
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
                              {task.output}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiAgent;
