export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  company?: string;
  website?: string;
  preferences?: UserPreferences;
  savedWorkflows?: SavedWorkflow[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  websiteType?: string;
  primaryGoal?: string;
  budget?: string;
  skillLevel?: string;
  aiNeeds?: string[];
  timeline?: string;
}

export interface SavedWorkflow {
  workflowId: string;
  workflowName: string;
  progress: WorkflowProgress[];
  createdAt: string;
}

export interface WorkflowProgress {
  stepId: string;
  completed: boolean;
  completedAt?: string;
}

export interface Tool {
  _id: string;
  name: string;
  description: string;
  category: ToolCategory;
  subcategory?: string;
  url: string;
  logo?: string;
  pricing: 'free' | 'freemium' | 'paid';
  features: string[];
  rating: number;
  tags: string[];
  affiliateLink?: string;
  isActive: boolean;
  useCases: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export type ToolCategory = 
  | 'design' 
  | 'development' 
  | 'content' 
  | 'marketing' 
  | 'testing' 
  | 'hosting' 
  | 'seo' 
  | 'analytics' 
  | 'ai-builders';

export interface Workflow {
  _id: string;
  name: string;
  description: string;
  category: string;
  websiteType: string;
  steps: WorkflowStep[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  tags: string[];
  isTemplate: boolean;
  targetAudience: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  tools: ToolRecommendation[];
  resources: string[];
  order: number;
}

export interface ToolRecommendation {
  toolId: Tool | string;
  isPrimary: boolean;
  reason: string;
}

export interface QuestionnaireData {
  websiteType: string;
  primaryGoal: string;
  budget: string;
  skillLevel: string;
  aiNeeds: string[];
  timeline: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}
