import React, { useMemo } from 'react';
import { CheckCircle, Circle, Target } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './TaskStats.module.css';

const TaskStats = () => {
  const { taskStats } = useTask();
  const { isDark } = useTheme();

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  }, [taskStats.completed, taskStats.total]);

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className={`${styles.statCard} ${isDark ? styles.dark : styles.light}`}>
          <div className={`${styles.iconContainer} ${styles.total} ${isDark ? styles.dark : styles.light}`}>
            <Target size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${styles.statValue} ${isDark ? styles.dark : styles.light}`}>
              {taskStats.total}
            </span>
            <span className={`text-sm ${styles.statLabel} ${isDark ? styles.dark : styles.light}`}>
              Total Tasks
            </span>
          </div>
        </div>

        <div className={`${styles.statCard} ${isDark ? styles.dark : styles.light}`}>
          <div className={`${styles.iconContainer} ${styles.pending} ${isDark ? styles.dark : styles.light}`}>
            <Circle size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${styles.statValue} ${isDark ? styles.dark : styles.light}`}>
              {taskStats.pending}
            </span>
            <span className={`text-sm ${styles.statLabel} ${isDark ? styles.dark : styles.light}`}>
              Pending
            </span>
          </div>
        </div>

        <div className={`${styles.statCard} ${isDark ? styles.dark : styles.light}`}>
          <div className={`${styles.iconContainer} ${styles.completed} ${isDark ? styles.dark : styles.light}`}>
            <CheckCircle size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${styles.statValue} ${isDark ? styles.dark : styles.light}`}>
              {taskStats.completed}
            </span>
            <span className={`text-sm ${styles.statLabel} ${isDark ? styles.dark : styles.light}`}>
              Completed
            </span>
          </div>
        </div>
      </div>

      {taskStats.total > 0 && (
        <div className={`${styles.progressSection} ${isDark ? styles.dark : styles.light}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`font-semibold ${styles.progressLabel} ${isDark ? styles.dark : styles.light}`}>
              Progress
            </span>
            <span className="font-bold text-blue-500">{completionPercentage}%</span>
          </div>
          <div className={`${styles.progressBar} ${isDark ? styles.dark : styles.light}`}>
            <div 
              className={styles.progressFill}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskStats);