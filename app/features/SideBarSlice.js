import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openSideBar: true,
  openMobileNav: false,
};

const SideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toogleSideBar: (state) => {
      state.openSideBar = !state.openSideBar;
    },

    toogleMobileNav: (state) => {
      state.openMobileNav = !state.openMobileNav;
    },
  },
});

export const { toogleSideBar, toogleMobileNav } = SideBarSlice.actions;

export default SideBarSlice.reducer;
