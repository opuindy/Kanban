import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openRedirectModal: false,
};

const redirectModalSlice = createSlice({
  name: 'redirectModal',
  initialState,
  reducers: {
    handleOpenRedirectModal: (state) => {
      state.openRedirectModal = true;
    },
    handleCloseRedirectModal: (state) => {
      state.openRedirectModal = false;
    },
  },
});

export const { handleOpenRedirectModal, handleCloseRedirectModal } =
  redirectModalSlice.actions;

export default redirectModalSlice.reducer;
