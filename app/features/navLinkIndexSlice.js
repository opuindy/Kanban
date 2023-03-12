import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  linkIndex: 0,
};

const navLinkIndexSlice = createSlice({
  name: 'linkIndex',
  initialState,
  reducers: {
    handleUpdateLinkIndex: (state, { payload }) => {
      state.linkIndex = payload.index;
    },
  },
});

export const { handleUpdateLinkIndex } = navLinkIndexSlice.actions;

export default navLinkIndexSlice.reducer;
