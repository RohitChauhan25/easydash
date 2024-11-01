import { createSlice } from "@reduxjs/toolkit";

// Define the shape of a task
interface IThem {
  darkMode: boolean;
}

const initialState: IThem = {
  darkMode: true,
};

// Create the slice
const themSlice = createSlice({
  name: "salesTasks",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

// Export the actions
export const { changeTheme } = themSlice.actions;

export default themSlice.reducer;
