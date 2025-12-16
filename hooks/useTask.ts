import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function useTasks() {
  const tasks = useSelector((state: RootState) => state.tasks);

  return {
    currentTasks: tasks.filter(t => t.status === 'current'),
    upcomingTasks: tasks.filter(t => t.status === 'upcoming'),
    completedTasks: tasks.filter(t => t.status === 'completed'),
  };
}
