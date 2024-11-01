import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskData } from "../../constants/data";
import { RootState } from "../store";

// Define the shape of a task
interface ITask {
  title: string;
  dueDate: Date | string | null; // Format: YYYY-MM-DD
  createdDate: string; // Format: YYYY-MM-DD
  description: string;
  completed: boolean; // New property to indicate completion status
}

// Define the initial state using that type
interface TasksState {
  data: ITask[];
}

const initialState: TasksState = {
  data: TaskData,
};

// Create the slice
const salesTasksSlice = createSlice({
  name: "salesTasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.data.unshift(action.payload);
    },
  },
});

// Export the actions
export const { addTask } = salesTasksSlice.actions;

// Export the reducer
export default salesTasksSlice.reducer;

// Selector to get tasks based on completion status
export const getTasksByStatus = (state: RootState, isCompleted: boolean) => {
  return state.tasks.data.filter((task) => task.completed === isCompleted);
};

// Helper function to get today and yesterday's dates in "YYYY-MM-DD" format
const getTodayAndYesterdayDates = () => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  return { today, yesterday };
};

// Selector to get tasks created today and yesterday
export const getTasks = createSelector(
  (state: RootState) => state.tasks.data,
  (tasks) => {
    const { today, yesterday } = getTodayAndYesterdayDates();
    return tasks.filter((task) => {
      const createdDateOnly = task.createdDate.split(" ")[0];
      return createdDateOnly === today || createdDateOnly === yesterday;
    });
  }
);
