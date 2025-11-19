import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { Search, Filter } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ projects, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).slice(0, 8);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.author.toLowerCase().includes(lowerQuery);
      
      const matchesTag = activeTag ? project.tags.includes(activeTag) : true;

      return matchesSearch && matchesTag;
    });
    setFilteredProjects(filtered);
  }, [searchQuery, projects, activeTag]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Stats / Welcome */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/20 p-6 rounded-2xl">
            <h2 className="text-3xl font-bold text-white">{projects.length}</h2>
            <p className="text-indigo-300 text-sm">Total Artifacts Shared</p>
        </div>
        <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-white">Welcome to VibeShare</h3>
            <p className="text-slate-400 text-sm">Discover what your team is building. Search by prompt keywords, technology tags, or author.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-20 z-40 bg-slate-950/90 backdrop-blur-sm py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b border-slate-800/50 md:border-none">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 bg-slate-900 border border-slate-800 rounded-full py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Search projects, prompts, or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                <Filter className="w-4 h-4 text-slate-500 shrink-0" />
                <button 
                    onClick={() => setActiveTag(null)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeTag ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                    All
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTag === tag ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <div className="bg-slate-900/50 inline-block p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-white">No artifacts found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search or add a new project.</p>
        </div>
      )}
    </div>
  );
};