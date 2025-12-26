import React, { createContext, useContext, useCallback, useMemo, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TASK_ACTIONS, FILTER_TYPES } from '../utils/constants';

// Task Context
const TaskContext = createContext();

// Task Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
      
    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      
    case TASK_ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
      
    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      
    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };
      
    case TASK_ACTIONS.SET_FILTER:
      return {
        ...state,
        currentFilter: action.payload
      };
      
    case TASK_ACTIONS.REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
      
    default:
      return state;
  }
};

// Initial State
const initialState = {
  tasks: [],
  currentFilter: FILTER_TYPES.ALL
};

// Task Provider Component
export const TaskProvider = ({ children }) => {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  const [state, dispatch] = useReducer(taskReducer, {
    ...initialState,
    tasks: storedTasks
  });

  // Sync tasks with localStorage whenever tasks change
  React.useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  // Action Creators (Memoized for performance)
  const addTask = useCallback((title) => {
    if (!title.trim()) return false; // Form validation
    
    const newTask = {
      id: Date.now() + Math.random(), // Simple ID generation
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask });
    return true;
  }, []);

  const toggleTask = useCallback((taskId) => {
    dispatch({ type: TASK_ACTIONS.TOGGLE_TASK, payload: taskId });
  }, []);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    dispatch({ 
      type: TASK_ACTIONS.UPDATE_TASK, 
      payload: { id: taskId, updates: { ...updates, updatedAt: new Date().toISOString() } }
    });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: TASK_ACTIONS.SET_FILTER, payload: filter });
  }, []);

  const reorderTasks = useCallback((newTasks) => {
    dispatch({ type: TASK_ACTIONS.REORDER_TASKS, payload: newTasks });
  }, []);

  // Filtered Tasks (Memoized for performance)
  const filteredTasks = useMemo(() => {
    switch (state.currentFilter) {
      case FILTER_TYPES.COMPLETED:
        return state.tasks.filter(task => task.completed);
      case FILTER_TYPES.PENDING:
        return state.tasks.filter(task => !task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.currentFilter]);

  // Task Statistics (Memoized for performance)
  const taskStats = useMemo(() => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    return { total, completed, pending };
  }, [state.tasks]);

  // Context Value (Memoized for performance)
  const value = useMemo(() => ({
    tasks: state.tasks,
    filteredTasks,
    currentFilter: state.currentFilter,
    taskStats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    setFilter,
    reorderTasks
  }), [
    state.tasks,
    filteredTasks,
    state.currentFilter,
    taskStats,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    setFilter,
    reorderTasks
  ]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use Task Context
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;