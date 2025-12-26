import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const { addTask } = useTask();
  const { isDark } = useTheme();

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    // Form validation - prevent empty tasks
    if (!inputValue.trim()) {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
      return;
    }

    // Add task and clear form
    const success = addTask(inputValue);
    if (success) {
      setInputValue('');
      setIsError(false);
    }
  }, [inputValue, addTask]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    if (isError && e.target.value.trim()) {
      setIsError(false);
    }
  }, [isError]);

  return (
    <form onSubmit={handleSubmit} className={`${styles.formContainer} ${isDark ? styles.dark : styles.light}`}>
      <div className={`${styles.inputContainer} ${isError ? styles.error : ''}`}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className={`${styles.taskInput} ${isDark ? styles.dark : styles.light} ${isError ? styles.error : ''}`}
          maxLength={200}
        />
        <button 
          type="submit" 
          className={`${styles.submitButton} ${!inputValue.trim() ? styles.disabled : ''}`}
          disabled={!inputValue.trim()}
        >
          <Plus size={20} />
        </button>
      </div>
      {isError && (
        <div className={`${styles.errorMessage} ${isDark ? styles.dark : styles.light}`}>
          Task cannot be empty. Please enter a valid task.
        </div>
      )}
    </form>
  );
};

export default React.memo(TaskForm);