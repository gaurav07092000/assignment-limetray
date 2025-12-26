import React, { useCallback } from 'react';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import { FILTER_TYPES } from '../utils/constants';
import styles from './TaskFilter.module.css';

const TaskFilter = () => {
  const { currentFilter, setFilter, taskStats } = useTask();
  const { isDark } = useTheme();

  // Handle filter change
  const handleFilterChange = useCallback((filter) => {
    setFilter(filter);
  }, [setFilter]);

  const filterOptions = [
    {
      key: FILTER_TYPES.ALL,
      label: 'All',
      count: taskStats.total
    },
    {
      key: FILTER_TYPES.PENDING,
      label: 'Pending',
      count: taskStats.pending
    },
    {
      key: FILTER_TYPES.COMPLETED,
      label: 'Completed',
      count: taskStats.completed
    }
  ];

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.buttonGroup}>
        {filterOptions.map(({ key, label, count }) => {
          const isActive = currentFilter === key;

          return (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              className={`${styles.filterButton} ${isDark ? styles.dark : styles.light} ${isActive ? styles.active : ''}`}
            >
              {label} <span className={styles.count}>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TaskFilter);