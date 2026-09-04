import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Activity, Terminal } from 'lucide-react';

const SecurityCenter = () => {
  const [logs, setLogs] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!logs.trim()) return;
    setLoading(true);
    setReport(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/security/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs }),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setReport(data.report);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleLogs = () => {
    setLogs(
`[2026-09-01 10:15:32] INFO - User 'admin' logged in successfully from 192.168.1.105
[2026-09-01 10:17:11] WARNING - Multiple failed login attempts for user 'root' from 45.33.22.11
[2026-09-01 10:17:13] WARNING - Multiple failed login attempts for user 'root' from 45.33.22.11
[2026-09-01 10:17:15] ERROR - Unauthorized access attempt to /etc/passwd from 45.33.22.11
[2026-09-01 10:18:02] WARNING - Suspicious outbound connection to known malicious IP 104.24.11.22 over port 4444`
    );
  };

  const getSeverityColor = (sev) => {
    switch (sev.toUpperCase()) {
      case 'CRITICAL': return 'text-red-500 border-red-500/30 bg-red-500/10';
      case 'HIGH': return 'text-threat border-threat/30 bg-threat/10';
      case 'MEDIUM': return 'text-warning border-warning/30 bg-warning/10';
      case 'LOW': return 'text-info border-info/30 bg-info/10';
      default: return 'text-slate-400 border-slate-700 bg-slate-800/50';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShieldAlert className="text-threat" size={32} />
          Security Center
        </h1>
        <p className="text-slate-400 mt-2">Paste raw logs to analyze and detect anomalies using LLM reasoning.</p>
      </div>

      <div className="flex gap-6 h-full min-h-0">
        <div className="w-1/3 glass-panel flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold">
              <Terminal size={18} /> Raw Logs
            </div>
            <button onClick={loadSampleLogs} className="text-xs text-accent hover:underline">Load Sample</button>
          </div>
          <textarea 
            className="flex-1 bg-transparent text-slate-300 p-4 font-mono text-xs resize-none focus:outline-none"
            placeholder="Paste server/authentication logs here..."
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
          />
          <div className="p-4 border-t border-white/10 bg-black/20">
            <button 
              className="w-full glass-button font-bold flex justify-center items-center gap-2"
              onClick={handleAnalyze}
              disabled={loading || !logs.trim()}
            >
              {loading ? 'ANALYZING...' : 'ANALYZE LOGS'}
            </button>
          </div>
        </div>

        <div className="w-2/3 glass-panel flex flex-col p-6 overflow-y-auto">
          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
              <Activity className="animate-pulse text-threat" size={48} />
              <p>Parsing logs and detecting threats...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 flex items-start gap-3">
              <AlertTriangle />
              <div>
                <h3 className="font-bold">Analysis Error</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading && !report && !error && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <ShieldCheck size={48} className="opacity-20" />
              <p>Awaiting logs for analysis.</p>
            </div>
          )}

          {report && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-white/10 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm">Events Analyzed</p>
                  <p className="text-3xl font-bold">{report.total_events_analyzed}</p>
                </div>
                <div className={`border p-4 rounded-xl ${report.threat_detected ? 'bg-threat/10 border-threat/30' : 'bg-success/10 border-success/30'}`}>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className={`text-3xl font-bold ${report.threat_detected ? 'text-threat' : 'text-success'}`}>
                    {report.threat_detected ? 'THREATS DETECTED' : 'SECURE'}
                  </p>
                </div>
              </div>

              {report.threats && report.threats.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2">Identified Threats</h3>
                  {report.threats.map((threat, idx) => (
                    <div key={idx} className={`border rounded-xl p-5 space-y-3 ${getSeverityColor(threat.severity)}`}>
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold">{threat.threat_name}</h4>
                        <span className="px-2 py-1 rounded-md bg-black/30 text-xs font-bold">{threat.severity}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <div>
                          <p className="font-semibold text-slate-400 uppercase tracking-wider text-xs mb-1">Description</p>
                          <p>{threat.description}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-400 uppercase tracking-wider text-xs mb-1">Evidence</p>
                          <p className="font-mono text-xs bg-black/30 p-2 rounded">{threat.evidence}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-current/20">
                        <p className="font-semibold text-slate-400 uppercase tracking-wider text-xs mb-2">Recommended Mitigation</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                          {threat.mitigation.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
