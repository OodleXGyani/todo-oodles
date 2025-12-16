// store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskStatus = 'current' | 'upcoming' | 'completed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

const initialState: Task[] = [
  { id: '1', title: 'Finish math homework', status: 'current' },
  { id: '2', title: 'Fix Expo Router bug', status: 'current' },
  { id: '3', title: 'Prepare presentation', status: 'upcoming' },
  { id: '4', title: 'Buy groceries', status: 'completed' },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare(title: string, status: TaskStatus = 'current') {
        return {
          payload: {
            id: Date.now().toString(),
            title,
            status,
          },
        };
      },
      reducer(state, action: PayloadAction<Task>) {
        state.push(action.payload);
      },
    },

    deleteTask(state, action: PayloadAction<string>) {
      return state.filter(task => task.id !== action.payload);
    },

    markTaskDone(state, action: PayloadAction<string>) {
      const task = state.find(t => t.id === action.payload);
      if (task) task.status = 'completed';
    },

    moveTaskToUpcoming(state, action: PayloadAction<string>) {
      const task = state.find(t => t.id === action.payload);
      if (task) task.status = 'upcoming';
    },
  },
});

export const {
  addTask,
  deleteTask,
  markTaskDone,
  moveTaskToUpcoming,
} = tasksSlice.actions;

export default tasksSlice.reducer;
