import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocIntelligence from './components/DocIntelligence';
import ResearchLab from './components/ResearchLab';
import SecurityCenter from './components/SecurityCenter';
import MultiAgent from './components/MultiAgent';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('docs');

  const renderContent = () => {
    switch (activeTab) {
      case 'docs':
        return <DocIntelligence />;
      case 'research':
        return <ResearchLab />;
      case 'security':
        return <SecurityCenter />;
      case 'multi':
        return <MultiAgent />;
      default:
        return <div className="p-8"><h1>Coming Soon</h1></div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col m-4 rounded-l-none overflow-hidden relative">
        <div className="absolute inset-0 bg-panel backdrop-blur-xl border border-white/10 rounded-2xl rounded-l-none shadow-2xl"></div>
        <div className="relative z-10 w-full h-full overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
