import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Microscope, 
  ShieldAlert, 
  Network, 
  Files, 
  Activity, 
  Database,
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'docs', label: 'Document Intelligence', icon: FileText },
    { id: 'research', label: 'Research Lab', icon: Microscope },
    { id: 'security', label: 'Security Center', icon: ShieldAlert },
    { id: 'multi', label: 'Multi-Agent Mission', icon: Network },
  ];

  return (
    <div className="w-72 h-full glass-panel flex flex-col m-4 mr-0 p-4 border-r-0 rounded-r-none">
      <div className="mb-8 px-2 mt-2">
        <h1 className="text-2xl font-black tracking-widest holo-text">
          NEXUS AI
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Command Center</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div key={item.id} className="relative group cursor-pointer mb-2">
              {/* Animated active/hover vertical bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ease-out z-10 ${
                isActive 
                  ? 'bg-accent shadow-[0_0_10px_#06b6d4]' 
                  : 'bg-transparent group-hover:bg-purple-500/50'
              }`}></div>
              
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 text-sm font-medium relative overflow-hidden ${
                  isActive 
                    ? 'text-white bg-accent/10 border-r border-y border-transparent' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {/* Background scanning effect on active tab */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
                )}
                
                <Icon size={18} className={`relative z-10 transition-transform duration-300 ${isActive ? 'text-accent scale-110' : 'text-slate-500 group-hover:scale-110 group-hover:text-purple-400'}`} />
                <span className="relative z-10 tracking-wide">{item.label}</span>
                
                {/* Futuristic bracket that slides in on hover */}
                <span className={`absolute right-4 text-xs font-mono opacity-0 transition-all duration-300 transform translate-x-4 ${isActive ? 'opacity-100 translate-x-0 text-accent' : 'group-hover:opacity-100 group-hover:translate-x-0 text-purple-400'}`}>
                  [ACTIVATE]
                </span>
              </button>
            </div>
          );
        })}
      </nav>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] animate-pulse"></div>
            <span className="text-xs text-slate-400 font-mono">SYS.ONLINE</span>
          </div>
          <span className="text-[10px] text-accent font-mono">v9.2.1</span>
        </div>
        
        {/* Fake system metrics */}
        <div className="px-2 space-y-2">
          <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono uppercase">
              <span>CPU Core</span>
              <span className="text-purple-400">42%</span>
            </div>
            <div className="h-1 bg-black rounded overflow-hidden">
              <div className="h-full bg-purple-500/80 w-[42%] shadow-[0_0_5px_#8b5cf6]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono uppercase">
              <span>Memory Array</span>
              <span className="text-accent">78%</span>
            </div>
            <div className="h-1 bg-black rounded overflow-hidden">
              <div className="h-full bg-accent/80 w-[78%] shadow-[0_0_5px_#06b6d4]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
