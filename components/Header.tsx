import React from 'react';
import { Sparkles, Plus, LayoutGrid } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Area */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNavigate(ViewState.DASHBOARD)}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white tracking-tight">VibeShare</h1>
              <p className="text-xs text-slate-400">Internal Artifact Repo</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {currentView === ViewState.CREATE ? (
              <button
                onClick={() => onNavigate(ViewState.DASHBOARD)}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            ) : (
              <button
                onClick={() => onNavigate(ViewState.CREATE)}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4 mr-2" />
                Share Output
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};