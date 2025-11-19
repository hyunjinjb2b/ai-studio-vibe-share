import { Project } from '../types';

const STORAGE_KEY = 'vibeshare_projects_v1';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Inventory Dashboard',
    description: 'A real-time inventory tracking system with charts and CSV export capabilities.',
    prompt: 'Create a dark mode inventory dashboard using React and Recharts. It should list products, allow adding stock, and visualize trends.',
    builderUrl: 'https://vibe.dev/builder/123',
    repoUrl: 'https://github.com/org/inventory-dash',
    deployUrl: 'https://inventory-dash.vercel.app',
    author: 'Sarah Kim',
    createdAt: Date.now() - 10000000,
    tags: ['Dashboard', 'React', 'Data Viz']
  },
  {
    id: '2',
    title: 'AI Meeting Summarizer',
    description: 'Upload audio files to get instant summaries and action items using Gemini API.',
    prompt: 'Build a tool that takes mp3 uploads, sends them to Gemini 1.5 Flash, and outputs a markdown summary.',
    builderUrl: 'https://vibe.dev/builder/456',
    repoUrl: 'https://github.com/org/ai-summarizer',
    deployUrl: 'https://ai-meet.netlify.app',
    author: 'David Park',
    createdAt: Date.now() - 5000000,
    tags: ['AI', 'Gemini', 'Productivity']
  }
];

export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with mock data for the demo
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROJECTS));
    return MOCK_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const newProjects = [project, ...projects];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
};

export const deleteProject = (id: string): void => {
    const projects = getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
