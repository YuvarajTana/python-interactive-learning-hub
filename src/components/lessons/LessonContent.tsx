import { motion } from 'framer-motion';
import { Clock, BarChart3 } from 'lucide-react';
import { useAppContext } from '../../hooks/useAppContext';
import { findLessonById } from '../../data/lessons';
import { CodeWindow } from '../ui/CodeWindow';
import { InteractiveCode } from '../ui/InteractiveCode';
import { Quiz } from '../ui/Quiz';

export function LessonContent() {
  const { state } = useAppContext();

  const lesson = findLessonById(state.currentLesson);

  if (!lesson) {
    return (
      <div className="main-content">
        <div className="lesson-not-found">
          <h2>Lesson not found</h2>
          <p>The lesson you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="main-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Lesson Header */}
      <div className="lesson-header">
        <motion.h1
          className="lesson-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {lesson.title}
        </motion.h1>
        
        <motion.p
          className="lesson-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {lesson.subtitle}
        </motion.p>

        <motion.div
          className="lesson-meta"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="meta-item">
            <Clock size={16} />
            <span>{lesson.meta.duration}</span>
          </div>
          <div className="meta-item">
            <BarChart3 size={16} />
            <span>{lesson.meta.difficulty}</span>
          </div>
        </motion.div>
      </div>

      {/* Lesson Explanation */}
      {lesson.content.explanation && (
        <motion.div
          className="code-explanation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="explanation-icon">💡</span>
          {lesson.content.explanation}
        </motion.div>
      )}

      {/* Code Example */}
      {lesson.content.codeExample && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CodeWindow
            filename={lesson.content.codeExample.filename || 'example.py'}
            language={lesson.content.codeExample.language}
            code={lesson.content.codeExample.code}
          />
        </motion.div>
      )}

      {/* Interactive Code Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <InteractiveCode
          lessonId={lesson.id}
          defaultCode={lesson.content.interactiveCode.defaultCode}
          simulatedOutput={lesson.content.interactiveCode.simulatedOutput}
        />
      </motion.div>

      {/* Quiz Section */}
      {lesson.content.quiz && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Quiz quiz={lesson.content.quiz} lessonId={lesson.id} />
        </motion.div>
      )}
    </motion.div>
  );
} 