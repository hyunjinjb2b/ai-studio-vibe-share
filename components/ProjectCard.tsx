import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Copy, Check, Code, Terminal, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-indigo-900/10 group animate-fade-in">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
             <div className="flex items-center space-x-2 mb-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400">
                  {project.author}
                </span>
                <span className="text-xs text-slate-600">• {formatDate(project.createdAt)}</span>
             </div>
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors truncate">
              {project.title}
            </h3>
          </div>
          <button 
             onClick={() => onDelete(project.id)}
             className="text-slate-600 hover:text-red-400 transition-colors p-1"
             title="Delete"
          >
              <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded-md text-xs text-indigo-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
           <LinkButton href={project.deployUrl} label="Live" icon={<ExternalLink className="w-4 h-4" />} active={!!project.deployUrl} />
           <LinkButton href={project.repoUrl} label="Repo" icon={<Github className="w-4 h-4" />} active={!!project.repoUrl} />
           <LinkButton href={project.builderUrl} label="Builder" icon={<Code className="w-4 h-4" />} active={!!project.builderUrl} />
        </div>
        
        {/* Prompt Toggle */}
        <button 
            onClick={() => setShowPrompt(!showPrompt)}
            className="w-full mt-2 flex items-center justify-center text-xs text-slate-500 hover:text-indigo-400 transition-colors py-2 border-t border-slate-800"
        >
            <Terminal className="w-3 h-3 mr-1.5" />
            {showPrompt ? 'Hide Prompt' : 'View Prompt'}
        </button>

        {showPrompt && (
            <div className="mt-3 relative bg-slate-950 rounded-lg p-3 border border-slate-800">
                <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono max-h-32 overflow-y-auto custom-scrollbar">
                    {project.prompt}
                </pre>
                <button
                    onClick={() => copyToClipboard(project.prompt, 'prompt')}
                    className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Copy Prompt"
                >
                    {copiedField === 'prompt' ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

const LinkButton = ({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active: boolean }) => {
    if (!active) {
        return (
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 opacity-50 cursor-not-allowed">
                {icon}
                <span className="text-[10px] mt-1 font-medium">{label}</span>
            </div>
        )
    }
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-indigo-900/30 border border-slate-700 hover:border-indigo-500/30 text-slate-300 hover:text-white transition-all group"
        >
            <div className="group-hover:scale-110 transition-transform duration-200">
             {icon}
            </div>
            <span className="text-[10px] mt-1 font-medium">{label}</span>
        </a>
    )
}
