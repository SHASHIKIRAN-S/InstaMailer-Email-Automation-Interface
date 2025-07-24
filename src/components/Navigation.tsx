import React from 'react';
import { Mail, History, BarChart3, Settings, PenTool } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'compose', label: 'Compose', icon: PenTool },
    { id: 'history', label: 'History', icon: History },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 px-6 py-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              EmailFlow
            </h1>
            <p className="text-xs text-purple-300">AI-Powered Email Automation</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 font-medium ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 transform scale-105'
                    : 'text-purple-200 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;