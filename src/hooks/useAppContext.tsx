import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, SearchResult, ProgressData } from '../types';
import { categories, getAllLessons } from '../data/lessons';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  searchResults: SearchResult[];
  progressData: ProgressData;
}

type AppAction =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_LESSON'; payload: string }
  | { type: 'COMPLETE_LESSON'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_SHORTCUTS' }
  | { type: 'RESET_PROGRESS' };

const initialState: AppState = {
  currentCategory: 'python',
  currentLesson: 'core-concepts',
  completedLessons: new Set(),
  searchQuery: '',
  showShortcuts: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CATEGORY':
      const category = categories.find(c => c.id === action.payload);
      return {
        ...state,
        currentCategory: action.payload,
        currentLesson: category?.lessons[0]?.id || state.currentLesson,
      };
    
    case 'SET_LESSON':
      return {
        ...state,
        currentLesson: action.payload,
      };
    
    case 'COMPLETE_LESSON':
      const newCompleted = new Set(state.completedLessons);
      newCompleted.add(action.payload);
      return {
        ...state,
        completedLessons: newCompleted,
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case 'TOGGLE_SHORTCUTS':
      return {
        ...state,
        showShortcuts: !state.showShortcuts,
      };
    
    case 'RESET_PROGRESS':
      return {
        ...state,
        completedLessons: new Set(),
      };
    
    default:
      return state;
  }
}

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Calculate search results
  const allLessons = getAllLessons();
  const searchResults: SearchResult[] = state.searchQuery.length >= 2 
    ? allLessons
        .filter(lesson => 
          lesson.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          lesson.categoryName.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
        .map(lesson => ({
          lessonId: lesson.id,
          title: lesson.title,
          category: lesson.categoryName,
          categoryId: lesson.categoryId,
        }))
    : [];

  // Calculate progress data
  const totalLessons = allLessons.length;
  const completedCount = state.completedLessons.size;
  const progressData: ProgressData = {
    completed: completedCount,
    total: totalLessons,
    percentage: Math.round((completedCount / totalLessons) * 100),
  };

  const value = {
    state,
    dispatch,
    searchResults,
    progressData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Explicit exports for better Fast Refresh compatibility
export { AppProvider, useAppContext };