import { motion } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';
import { categories } from '../../data/lessons';

export function Sidebar() {
  const { state, dispatch } = useAppContext();

  const currentCategory = categories.find(cat => cat.id === state.currentCategory);

  const handleLessonClick = (lessonId: string) => {
    dispatch({ type: 'SET_LESSON', payload: lessonId });
  };

  if (!currentCategory) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <span>{currentCategory.icon}</span>
          <span>{currentCategory.name}</span>
        </div>
        <div className="sidebar-content">
          {currentCategory.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`step-item ${
                state.currentLesson === lesson.id ? 'active' : ''
              } ${
                state.completedLessons.has(lesson.id) ? 'completed' : ''
              }`}
              onClick={() => handleLessonClick(lesson.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <div className="step-title">{lesson.title}</div>
                <div className="step-subtitle">{lesson.meta.duration}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 