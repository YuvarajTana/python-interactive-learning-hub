export interface LessonMeta {
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CodeExample {
  language: string;
  code: string;
  filename?: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  meta: LessonMeta;
  content: {
    explanation?: string;
    codeExample?: CodeExample;
    interactiveCode: {
      defaultCode: string;
      simulatedOutput: string;
    };
    quiz?: Quiz;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  lessons: Lesson[];
}

export interface AppState {
  currentCategory: string;
  currentLesson: string;
  completedLessons: Set<string>;
  searchQuery: string;
  showShortcuts: boolean;
}

export interface SearchResult {
  lessonId: string;
  title: string;
  category: string;
  categoryId: string;
}

export interface ProgressData {
  completed: number;
  total: number;
  percentage: number;
} 