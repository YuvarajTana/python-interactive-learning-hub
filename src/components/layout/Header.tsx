import React, { useState, useRef, useEffect } from 'react';
import { Search, Keyboard, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../hooks/useAppContext';

export function Header() {
  const { state, dispatch, searchResults, progressData } = useAppContext();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
    setShowSearchResults(e.target.value.length >= 2);
  };

  const handleSearchResultClick = (categoryId: string, lessonId: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: categoryId });
    dispatch({ type: 'SET_LESSON', payload: lessonId });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    setShowSearchResults(false);
  };

  const toggleShortcuts = () => {
    dispatch({ type: 'TOGGLE_SHORTCUTS' });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/' key
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Close modals on Escape
      if (e.key === 'Escape') {
        setShowSearchResults(false);
        if (state.showShortcuts) {
          dispatch({ type: 'TOGGLE_SHORTCUTS' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.showShortcuts, dispatch]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="header-title">🐍 Python Web Dev Academy</h1>
          <p className="header-subtitle">
            Master Python, Flask & FastAPI with beautiful, interactive code examples
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="search-container" ref={searchInputRef}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search lessons..."
              value={state.searchQuery}
              onChange={handleSearchChange}
              ref={searchInputRef}
            />
            {state.searchQuery && (
              <button
                className="search-clear"
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  setShowSearchResults(false);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                className="search-results"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {searchResults.map((result) => (
                  <div
                    key={result.lessonId}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result.categoryId, result.lessonId)}
                  >
                    <div className="search-result-title">{result.title}</div>
                    <div className="search-result-category">{result.category}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shortcuts Help */}
        <div className="shortcuts-help">
          <button className="btn btn-secondary" onClick={toggleShortcuts}>
            <Keyboard size={16} />
            Shortcuts
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressData.percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="progress-text">
            {progressData.percentage}% Complete ({progressData.completed}/{progressData.total})
          </div>
        </div>
      </header>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {state.showShortcuts && (
          <motion.div
            className="shortcuts-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleShortcuts}
          >
            <motion.div
              className="shortcuts-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Keyboard Shortcuts</h3>
              <div className="shortcut-list">
                <div>
                  <span>Run code</span>
                  <kbd>Ctrl/Cmd + Enter</kbd>
                </div>
                <div>
                  <span>Reset code</span>
                  <kbd>Ctrl/Cmd + R</kbd>
                </div>
                <div>
                  <span>Next lesson</span>
                  <kbd>→</kbd>
                </div>
                <div>
                  <span>Previous lesson</span>
                  <kbd>←</kbd>
                </div>
                <div>
                  <span>Focus search</span>
                  <kbd>/</kbd>
                </div>
                <div>
                  <span>Close modals</span>
                  <kbd>Esc</kbd>
                </div>
              </div>
              <button className="btn btn-primary" onClick={toggleShortcuts}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 