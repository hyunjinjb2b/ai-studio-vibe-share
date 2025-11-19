import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-indigo-900/20 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white w-8 h-8" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to VibeShare</h1>
          <p className="text-slate-400">The internal hub for sharing your Vibe Coding artifacts and prompts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Chen"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600"
              autoFocus
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center shadow-lg shadow-indigo-500/25"
          >
            Start Sharing
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <p className="text-xs text-slate-500">Internal use only. Please do not share sensitive keys.</p>
        </div>
      </div>
    </div>
  );
};