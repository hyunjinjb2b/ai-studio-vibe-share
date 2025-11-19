export interface Project {
  id: string;
  title: string;
  description: string;
  prompt: string;
  builderUrl: string;
  repoUrl: string;
  deployUrl: string;
  author: string;
  createdAt: number;
  tags: string[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  prompt: string;
  builderUrl: string;
  repoUrl: string;
  deployUrl: string;
  author: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CREATE = 'CREATE',
  DETAILS = 'DETAILS' // Optional expansion
}
