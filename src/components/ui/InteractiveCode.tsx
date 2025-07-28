import { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';

interface InteractiveCodeProps {
  lessonId: string;
  defaultCode: string;
  simulatedOutput: string;
}

export function InteractiveCode({ lessonId, defaultCode, simulatedOutput }: InteractiveCodeProps) {
  const { dispatch } = useAppContext();
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Reset code when lesson changes
  useEffect(() => {
    setCode(defaultCode);
    setOutput('');
  }, [lessonId, defaultCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOutput(simulatedOutput);
    setIsRunning(false);
    
    // Mark lesson as completed when code is run successfully
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
  };

  const handleResetCode = () => {
    setCode(defaultCode);
    setOutput('');
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleRunCode();
        } else if (e.key === 'r') {
          e.preventDefault();
          handleResetCode();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="interactive-section">
      <div className="interactive-header">
        <Zap size={20} />
        Try it Yourself!
      </div>
      
      <textarea
        className="try-it-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
        spellCheck={false}
      />
      
      <div className="button-group">
        <motion.button
          className="btn btn-primary"
          onClick={handleRunCode}
          disabled={isRunning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} />
          {isRunning ? 'Running...' : 'Run Code'}
        </motion.button>
        
        <motion.button
          className="btn btn-secondary"
          onClick={handleResetCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} />
          Reset
        </motion.button>
      </div>
      
      {output && (
        <motion.div
          className={`output-window ${output.includes('Error') ? 'error' : 'success'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {output}
        </motion.div>
      )}
    </div>
  );
} 