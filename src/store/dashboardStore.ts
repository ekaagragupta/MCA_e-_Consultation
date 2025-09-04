import { create } from 'zustand';
import { Comment, mockComments, getCommentsByFilters, getAnalytics } from '@/data/mockData';

interface DashboardFilters {
  sentiment: string[];
  intent: string[];
  stakeholderType: string[];
  dateRange?: { start: string; end: string };
  searchQuery: string;
}

interface DashboardState {
  // Data
  allComments: Comment[];
  filteredComments: Comment[];
  analytics: ReturnType<typeof getAnalytics>;
  
  // Filters
  filters: DashboardFilters;
  
  // UI State
  sidebarCollapsed: boolean;
  
  // Actions
  setFilters: (filters: Partial<DashboardFilters>) => void;
  clearFilters: () => void;
  toggleSidebar: () => void;
  addComment: (comment: Omit<Comment, 'id'>) => void;
  updateComment: (id: string, updates: Partial<Comment>) => void;
  deleteComment: (id: string) => void;
  applyFilters: () => void;
}

const initialFilters: DashboardFilters = {
  sentiment: [],
  intent: [],
  stakeholderType: [],
  searchQuery: '',
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  allComments: mockComments,
  filteredComments: mockComments,
  analytics: getAnalytics(mockComments),
  filters: initialFilters,
  sidebarCollapsed: false,

  // Actions
  setFilters: (newFilters) => {
    const currentFilters = get().filters;
    const updatedFilters = { ...currentFilters, ...newFilters };
    
    set({ filters: updatedFilters });
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: initialFilters });
    get().applyFilters();
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  addComment: (commentData) => {
    const newComment: Comment = {
      ...commentData,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    const allComments = [...get().allComments, newComment];
    set({ allComments });
    get().applyFilters();
  },

  updateComment: (id, updates) => {
    const allComments = get().allComments.map(comment =>
      comment.id === id ? { ...comment, ...updates } : comment
    );
    
    set({ allComments });
    get().applyFilters();
  },

  deleteComment: (id) => {
    const allComments = get().allComments.filter(comment => comment.id !== id);
    set({ allComments });
    get().applyFilters();
  },

  applyFilters: () => {
    const { allComments, filters } = get();
    const filteredComments = getCommentsByFilters(allComments, filters);
    const analytics = getAnalytics(filteredComments);
    
    set({ filteredComments, analytics });
  },
}));