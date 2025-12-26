import React from 'react';
import { Moon, Sun, ListTodo } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <ListTodo size={32} />
          <h1 className={styles.title}>
            Advanced Task Manager
          </h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className={`${styles.themeButton} ${isDark ? styles.dark : styles.light}`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span className={styles.buttonText}>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);