// store/tasks.store.ts

export type TaskStatus = 'current' | 'upcoming' | 'completed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

/* ------------------ In-memory Store ------------------ */

let tasks: Task[] = [
  { id: '1', title: 'Finish math homework', status: 'current' },
  { id: '2', title: 'Fix Expo Router bug', status: 'current' },
  { id: '3', title: 'Prepare presentation', status: 'upcoming' },
  { id: '4', title: 'Buy groceries', status: 'completed' },
];

/* ------------------ Getters ------------------ */

export const getTasks = (): Task[] => {
  return tasks;
};

export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};

/* ------------------ Actions ------------------ */

export const addTask = (
  title: string,
  status: TaskStatus = 'current'
) => {
  if (!title.trim()) return;

  tasks = [
    ...tasks,
    {
      id: Date.now().toString(),
      title,
      status,
    },
  ];
};

export const deleteTask = (id: string) => {
  tasks = tasks.filter(task => task.id !== id);
};

export const markTaskDone = (id: string) => {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: 'completed' }
      : task
  );
};

export const moveTaskToUpcoming = (id: string) => {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: 'upcoming' }
      : task
  );
};
