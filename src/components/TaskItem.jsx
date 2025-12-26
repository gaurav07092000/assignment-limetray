import React, { useState, useCallback } from 'react';
import { Check, X, Edit2, Save, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleTask, deleteTask, updateTask } = useTask();
  const { isDark } = useTheme();

  // Check if text is long (more than 80 characters)
  const isLongText = task.title.length > 80;
  const displayText = isLongText && !isExpanded ? task.title.slice(0, 80) + '...' : task.title;

  // Handle expand/collapse toggle
  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  // Handle task completion toggle
  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [task.id, toggleTask]);

  // Handle task deletion
  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  // Handle edit mode toggle
  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditValue(task.title);
  }, [task.title]);

  // Handle save edit
  const handleSaveEdit = useCallback(() => {
    if (editValue.trim() && editValue.trim() !== task.title) {
      updateTask(task.id, { title: editValue.trim() });
    }
    setIsEditing(false);
  }, [editValue, task.id, task.title, updateTask]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditValue(task.title);
  }, [task.title]);

  // Handle edit input change
  const handleEditChange = useCallback((e) => {
    setEditValue(e.target.value);
  }, []);

  // Handle edit form submit
  const handleEditSubmit = useCallback((e) => {
    e.preventDefault();
    handleSaveEdit();
  }, [handleSaveEdit]);

  return (
    <div className={`${styles.container} ${task.completed ? styles.completed : ''} group`}>
      <button 
        onClick={handleToggle}
        className={`${styles.toggleButton} ${isDark ? styles.dark : styles.light} ${task.completed ? styles.completed : ''}`}
        aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
      >
        {task.completed && <Check size={16} />}
      </button>

      <div className="flex-1 flex items-center justify-between gap-4">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <input
              type="text"
              value={editValue}
              onChange={handleEditChange}
              className={`${styles.editInput} ${isDark ? styles.dark : styles.light}`}
              autoFocus
              maxLength={200}
            />
            <div className={styles.editButtons}>
              <button 
                type="submit" 
                className={`${styles.saveButton} ${isDark ? styles.dark : styles.light} ${!editValue.trim() ? styles.disabled : ''}`}
                disabled={!editValue.trim()}
              >
                <Save size={16} />
              </button>
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className={`${styles.cancelButton} ${isDark ? styles.dark : styles.light}`}
              >
                <XCircle size={16} />
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.textContainer}>
              <span 
                className={`${styles.taskText} ${task.completed ? styles.completed : ''} ${isDark ? styles.dark : styles.light} ${isExpanded ? styles.expanded : ''}`}
                title={isLongText && !isExpanded ? task.title : undefined}
              >
                {displayText}
              </span>
              {isLongText && (
                <button 
                  onClick={handleToggleExpand}
                  className={`${styles.expandButton} ${isDark ? styles.dark : styles.light}`}
                  aria-label={isExpanded ? 'Show less' : 'Show more'}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className={styles.expandText}>{isExpanded ? 'Less' : 'More'}</span>
                </button>
              )}
            </div>
            <div className={styles.actionButtons}>
              <button 
                onClick={handleEdit}
                className={`${styles.editButton} ${isDark ? styles.dark : styles.light}`}
                aria-label="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={handleDelete}
                className={`${styles.deleteButton} ${isDark ? styles.dark : styles.light}`}
                aria-label="Delete task"
              >
                <X size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(TaskItem);