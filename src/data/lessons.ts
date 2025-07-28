import type { Category } from '../types';
import { pythonCategory } from './lessons/python-lessons';
import { flaskCategory } from './lessons/flask-lessons';
import { fastapiCategory } from './lessons/fastapi-lessons';
import { dataAnalystCategory } from './lessons/data-analyst-lessons';

export const categories: Category[] = [
  pythonCategory,
  flaskCategory,
  fastapiCategory,
  dataAnalystCategory
];

export function getAllLessons() {
  return categories.flatMap(category => 
    category.lessons.map(lesson => ({
      ...lesson,
      categoryId: category.id,
      categoryName: category.name
    }))
  );
}

export function findLessonById(id: string) {
  for (const category of categories) {
    const lesson = category.lessons.find(lesson => lesson.id === id);
    if (lesson) {
      return {
        ...lesson,
        categoryId: category.id,
        categoryName: category.name
      };
    }
  }
  return null;
} 