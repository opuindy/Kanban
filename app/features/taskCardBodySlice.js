import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openTaskCardBody: false,
  editTask: false,
  deleteTask: false,
};

const taskCardBodySlice = createSlice({
  name: 'taskCardBody',
  initialState,
  reducers: {
    handleOpenTaskCardBody: (state) => {
      state.openTaskCardBody = true;
    },
    handleCloseTaskCardBody: (state) => {
      state.openTaskCardBody = false;
    },
    handleOpenEditTask: (state) => {
      state.editTask = true;
      state.openTaskCardBody = false;
    },
    handleCloseEditTask: (state) => {
      state.editTask = false;
    },
    handleOpenDeleteTask: (state) => {
      state.deleteTask = true;
      state.openTaskCardBody = true;
    },
    handleCloseDeleteTask: (state) => {
      state.deleteTask = false;
      state.openTaskCardBody = false;
    },
  },
});

export const {
  handleOpenTaskCardBody,
  handleCloseTaskCardBody,
  handleOpenEditTask,
  handleCloseEditTask,
  handleOpenDeleteTask,
  handleCloseDeleteTask,
} = taskCardBodySlice.actions;

export default taskCardBodySlice.reducer;
