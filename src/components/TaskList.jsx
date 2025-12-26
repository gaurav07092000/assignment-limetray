import React, { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { GripVertical } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';
import { useTheme } from '../contexts/ThemeContext';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

// Draggable Task Item Component
const DraggableTaskItem = ({ task }) => {
  const { isDark } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  return (
    <div 
      ref={setNodeRef} 
      className={`${styles.draggableItem} ${isDark ? styles.dark : styles.light} ${isDragging ? styles.dragging : ''} group`}
      style={{
        transform: isDragging ? `${CSS.Transform.toString(transform)} rotate(1deg)` : CSS.Transform.toString(transform),
        transition: transition || 'all 0.3s ease',
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : 'auto'
      }}
    >
      <div 
        className={`${styles.gripHandle} ${isDark ? styles.dark : styles.light}`}
        {...attributes} 
        {...listeners}
      >
        <GripVertical size={16} />
      </div>
      <div className="flex-1">
        <TaskItem task={task} />
      </div>
    </div>
  );
};

const TaskList = () => {
  const { filteredTasks, reorderTasks } = useTask();
  const { isDark } = useTheme();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = filteredTasks.findIndex(task => task.id === active.id);
      const newIndex = filteredTasks.findIndex(task => task.id === over.id);
      
      const newTasks = arrayMove(filteredTasks, oldIndex, newIndex);
      reorderTasks(newTasks);
    }
  }, [filteredTasks, reorderTasks]);

  if (filteredTasks.length === 0) {
    return (
      <div className={`${styles.emptyState} ${isDark ? styles.dark : styles.light}`}>
        <div className="max-w-xs mx-auto">
          <div className="text-6xl mb-6">📝</div>
          <h3 className={`text-xl font-semibold mb-2 ${styles.emptyTitle} ${isDark ? styles.dark : styles.light}`}>
            No tasks yet
          </h3>
          <p className={`${styles.emptyMessage} ${isDark ? styles.dark : styles.light}`}>
            Add your first task to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext 
          items={filteredTasks.map(task => task.id)} 
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.map((task) => (
            <DraggableTaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default React.memo(TaskList);