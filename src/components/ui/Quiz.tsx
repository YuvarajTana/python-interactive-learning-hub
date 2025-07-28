import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quiz as QuizType } from '../../types';

interface QuizProps {
  quiz: QuizType;
  lessonId: string;
}

export function Quiz({ quiz }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (index: number) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswered(false);
  };

  return (
    <div className="quiz-section">
      <div className="quiz-title">
        <Brain size={20} />
        Quick Check
      </div>
      
      <div className="quiz-question">
        {quiz.question}
      </div>
      
      <div className="quiz-options">
        {quiz.options.map((option, index) => (
          <motion.div
            key={index}
            className={`quiz-option ${
              answered && selectedAnswer === index
                ? option.isCorrect
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleOptionClick(index)}
            whileHover={!answered ? { y: -2 } : {}}
            whileTap={!answered ? { scale: 0.98 } : {}}
            style={{
              cursor: answered ? 'default' : 'pointer',
              pointerEvents: answered ? 'none' : 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {answered && selectedAnswer === index && (
                option.isCorrect ? (
                  <CheckCircle size={20} color="#28a745" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )
              )}
              <span>{option.text}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {showExplanation && selectedAnswer !== null && (
          <motion.div
            className="quiz-explanation show"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>Explanation:</strong> {quiz.options[selectedAnswer].explanation}
            <div style={{ marginTop: '15px' }}>
              <motion.button
                className="btn btn-secondary"
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: '12px', padding: '8px 16px' }}
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 