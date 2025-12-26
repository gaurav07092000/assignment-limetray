import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskStats from './components/TaskStats';
import TaskList from './components/TaskList';
import styles from './App.module.css';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`${styles.appContainer} ${isDark ? styles.dark : styles.light}`}>
      <Header />
      <main className={styles.mainContent}>
        <div className={`${styles.contentWrapper} ${styles.componentSpacing}`}>
          <TaskForm />
          <TaskStats />
          <TaskFilter />
          <TaskList />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;



