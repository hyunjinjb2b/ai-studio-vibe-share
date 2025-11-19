import React, { useState } from 'react';
import { ProjectFormData } from '../types';
import { Wand2, Save, Loader2, Link as LinkIcon, Github, Terminal, FileText, Sparkles } from 'lucide-react';
import { generateDescriptionFromPrompt, generateTagsFromPrompt } from '../services/geminiService';

interface ProjectFormProps {
  currentUser: string;
  onSubmit: (data: ProjectFormData, tags: string[]) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ currentUser, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    prompt: '',
    builderUrl: '',
    repoUrl: '',
    deployUrl: '',
    author: currentUser,
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutoGenerate = async () => {
    if (!formData.prompt) return;
    
    setIsGenerating(true);
    try {
      const description = await generateDescriptionFromPrompt(formData.prompt);
      setFormData(prev => ({ ...prev, description }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Auto-generate tags before submission
    let tags: string[] = ["VibeCoding"];
    if (formData.prompt) {
        const aiTags = await generateTagsFromPrompt(formData.prompt);
        if (aiTags.length > 0) tags = aiTags;
    }

    onSubmit(formData, tags);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
      <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Sparkles className="w-6 h-6 text-indigo-400 mr-2" />
          Share New Artifact
        </h2>
        <p className="text-slate-400 mt-1">Document your Vibe Coding session results.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Primary Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Project Title</label>
                <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. HR Analytics Dashboard"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Author</label>
                <input
                readOnly
                type="text"
                name="author"
                value={formData.author}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed"
                />
            </div>
        </div>

        {/* Prompt Section */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300 flex items-center">
                    <Terminal className="w-4 h-4 mr-2 text-slate-500" />
                    Original Prompt
                </label>
            </div>
            <textarea
                required
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                rows={6}
                placeholder="Paste the prompt you used here..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600 resize-y custom-scrollbar"
            />
        </div>

        {/* Description Section with AI Magic */}
        <div className="space-y-2 relative">
             <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                <span className="flex items-center"><FileText className="w-4 h-4 mr-2 text-slate-500" />Description</span>
                <button
                    type="button"
                    onClick={handleAutoGenerate}
                    disabled={!formData.prompt || isGenerating}
                    className={`text-xs flex items-center px-3 py-1 rounded-full transition-colors ${
                        !formData.prompt 
                        ? 'text-slate-600 bg-slate-800 cursor-not-allowed' 
                        : 'text-indigo-300 bg-indigo-900/30 hover:bg-indigo-900/50 hover:text-indigo-200'
                    }`}
                >
                    {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
                    Auto-Fill with AI
                </button>
            </label>
            <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Briefly describe what the app does..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-600"
            />
        </div>

        {/* Links Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Resource Links</h3>
            
            <div className="grid gap-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="url"
                        name="builderUrl"
                        value={formData.builderUrl}
                        onChange={handleChange}
                        placeholder="Builder URL (e.g. Vibe Tool Link)"
                        className="block w-full pl-10 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="url"
                        name="repoUrl"
                        value={formData.repoUrl}
                        onChange={handleChange}
                        placeholder="Repository URL (e.g. GitHub)"
                        className="block w-full pl-10 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Sparkles className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="url"
                        name="deployUrl"
                        value={formData.deployUrl}
                        onChange={handleChange}
                        placeholder="Deployment URL (Live Demo)"
                        className="block w-full pl-10 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-800">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isGenerating}
                className="flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Publish Artifact
            </button>
        </div>
      </form>
    </div>
  );
};