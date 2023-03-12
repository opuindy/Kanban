import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openCreateNewBoard: false,
  editDeleteModal: false,
  editBoard: false,
  deleteModal: false,
  addColumn: false,
  addTask: false,
};

const modifyBoardSlice = createSlice({
  name: 'modifyBoard',
  initialState,
  reducers: {
    handleOpenCreateNewBoard: (state) => {
      state.openCreateNewBoard = true;
    },
    handleCloseCreateNewBoard: (state) => {
      state.openCreateNewBoard = false;
    },
    handleOpenEditBoard: (state) => {
      state.editBoard = true;
      state.editDeleteModal = false;
    },
    handleCloseEditBoard: (state) => {
      state.editBoard = false;
    },
    handleOpenEditDeleteModal: (state) => {
      state.editDeleteModal = true;
    },
    handleCloseEditDeleteModal: (state) => {
      state.editDeleteModal = false;
    },
    handleOpenDeleteModal: (state) => {
      state.deleteModal = true;
      state.editDeleteModal = false;
    },
    handleCloseDeleteModal: (state) => {
      state.deleteModal = false;
    },

    handleOpenAddColumnModal: (state) => {
      state.addColumn = true;
    },
    handleCloseAddColumnModal: (state) => {
      state.addColumn = false;
    },
    handleOpenAddTaskModal: (state) => {
      state.addTask = true;
    },
    handleCloseAddTaskModal: (state) => {
      state.addTask = false;
    },
  },
});

export const {
  handleOpenCreateNewBoard,
  handleCloseCreateNewBoard,
  handleOpenEditBoard,
  handleCloseEditBoard,
  handleOpenEditDeleteModal,
  handleCloseEditDeleteModal,
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  handleOpenAddColumnModal,
  handleCloseAddColumnModal,
  handleOpenAddTaskModal,
  handleCloseAddTaskModal,
} = modifyBoardSlice.actions;

export default modifyBoardSlice.reducer;
