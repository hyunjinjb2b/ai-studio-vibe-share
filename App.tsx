import React, { useState, useEffect } from 'react';
import { Project, ProjectFormData, ViewState } from './types';
import { getProjects, saveProject, deleteProject } from './services/storageService';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ProjectForm } from './components/ProjectForm';
import { Login } from './components/Login';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    setProjects(getProjects());
    
    // Check for saved user
    const savedUser = localStorage.getItem('vibeshare_user');
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('vibeshare_user', username);
    setUser(username);
  };

  const handleCreateProject = (data: ProjectFormData, tags: string[]) => {
    const newProject: Project = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36),
      createdAt: Date.now(),
      tags: tags,
      ...data
    };
    
    saveProject(newProject);
    setProjects(getProjects()); // Reload to ensure sync
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleDeleteProject = (id: string) => {
      if(window.confirm("Are you sure you want to delete this artifact?")) {
          deleteProject(id);
          setProjects(getProjects());
      }
  }

  if (isLoading) return <div className="min-h-screen bg-slate-950" />;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      <main className="flex-1 w-full">
        {currentView === ViewState.DASHBOARD && (
          <Dashboard projects={projects} onDelete={handleDeleteProject} />
        )}
        
        {currentView === ViewState.CREATE && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <ProjectForm 
                currentUser={user}
                onSubmit={handleCreateProject}
                onCancel={() => setCurrentView(ViewState.DASHBOARD)}
             />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-auto">
         <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} VibeShare Internal Tools. Logged in as <span className="text-indigo-400">{user}</span></p>
         </div>
      </footer>
    </div>
  );
};

export default App;