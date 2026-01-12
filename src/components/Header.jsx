import React from 'react';
import { Moon, Sun, ListTodo, Undo } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTask } from '../contexts/TaskContext';
import styles from './Header.module.css';

const Header = () => {
  const { toggleTheme, isDark } = useTheme();
  const { undoTask, hasHistory } = useTask();

  return (
    <header className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <ListTodo size={32} />
          <h1 className={styles.title}>
            Advanced Task Manager
          </h1>
        </div>
        
        <div className={styles.actionButtons}>
          {hasHistory && (
            <button 
              onClick={undoTask}
              className={`${styles.undoButton} ${isDark ? styles.dark : styles.light}`}
              aria-label="Undo last action"
            >
              <Undo size={20} />
              <span className={styles.buttonText}>Undo</span>
            </button>
          )}
          <button 
            onClick={toggleTheme}
            className={`${styles.themeButton} ${isDark ? styles.dark : styles.light}`}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className={styles.buttonText}>{isDark ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);