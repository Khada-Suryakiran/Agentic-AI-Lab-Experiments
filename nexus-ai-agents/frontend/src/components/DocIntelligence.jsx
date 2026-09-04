import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Mermaid from './Mermaid';
import { UploadCloud, FileText, Send, ChevronRight } from 'lucide-react';

const DocIntelligence = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setUploadStatus('Uploading and indexing...');
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/api/rag/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 'success') {
        setUploadStatus(`Indexed ${data.pages} pages into ${data.chunks} chunks.`);
      } else {
        setUploadStatus(`Error: ${data.message}`);
      }
    } catch (err) {
      setUploadStatus('Error connecting to backend.');
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMsg.content }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setMessages(prev => [...prev, { role: 'ai', content: data.answer, sources: data.sources }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: `Error: ${data.message}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error connecting to backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Document Intelligence</h1>
        <p className="text-slate-400 mt-2">Upload documents and ask questions using Retrieval-Augmented Generation (RAG).</p>
      </div>

      <div className="flex gap-6 h-full min-h-0">
        {/* Upload Section */}
        <div className="w-1/3 glass-panel p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="text-info" /> Knowledge Base
          </h2>
          
          <label className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
            <UploadCloud className="text-slate-400 mb-4" size={32} />
            <span className="text-sm font-medium">Click to upload PDF</span>
            <span className="text-xs text-slate-500 mt-1">PDF up to 10MB</span>
            <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
          </label>
          
          {uploadStatus && (
            <div className="text-sm p-3 bg-white/5 rounded-lg border border-white/10">
              {uploadStatus}
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="w-2/3 glass-panel flex flex-col">
          <div className="p-4 border-b border-white/10 flex-1 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-500">
                Upload a document and start asking questions.
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-4 ${msg.role === 'user' ? 'bg-accent/20 border-accent/30 text-white' : 'bg-slate-800 border-white/10 text-slate-200'} border`}>
                  {msg.role === 'ai' ? (
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
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 w-full max-w-[80%] space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <ChevronRight size={14} /> Retrieved Context
                    </div>
                    {msg.sources.map((src, i) => (
                      <div key={i} className="bg-slate-900/80 border border-white/5 p-2 rounded-lg text-xs">
                        <div className="text-accent mb-1 font-medium">{src.source} — Page {src.page}</div>
                        <div className="text-slate-400 italic">"{src.content}"</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 p-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce delay-150"></div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-black/20 flex gap-2">
            <input 
              type="text" 
              className="glass-input flex-1"
              placeholder="Ask a question about the document..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
            />
            <button className="glass-button flex items-center gap-2" onClick={handleQuery}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocIntelligence;
