import { motion } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';
import { categories } from '../../data/lessons';
import { Sidebar } from './Sidebar';
import { LessonContent } from '../lessons/LessonContent';

export function MainInterface() {
  const { state, dispatch } = useAppContext();

  const handleTabClick = (categoryId: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
  };

  return (
    <div className="main-interface">
      {/* Tabs */}
      <div className="tabs-container">
        <div></div> {/* Empty div for the first grid column (sidebar space) */}
        <div className="tabs-wrapper">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`tab ${state.currentCategory === category.id ? 'active' : ''}`}
              onClick={() => handleTabClick(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="tab-icon">{category.icon}</span>
              <span>{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="content-wrapper">
        <Sidebar />
        <LessonContent />
      </div>
    </div>
  );
} 