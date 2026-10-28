import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(description) {
        return {
          payload: {
            id: nanoid(),
            description,
            isDone: false,
          },
        };
      },
    },
    editTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) {
        task.description = action.payload.description;
      }
    },
    toggleTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    setTaskFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, editTask, setTaskFilter, toggleTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
