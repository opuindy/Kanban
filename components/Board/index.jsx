import React from 'react';
import SideBar from '../SideBar';
import HideSideBar from '../HideSideBar';
import { useSelector, useDispatch } from 'react-redux';
import { toogleMobileNav } from '../../app/features/SideBarSlice';
import styles from './board.module.scss';
import MobileNav from '../mobileNav';
import MainBoard from '../MainBoard';

const Board = () => {
  const { theme } = useSelector((state) => state.theme);
  const { openSideBar } = useSelector((state) => state.sideBar);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const handleMobileNav = () => {
    dispatch(toogleMobileNav());
  };

  return (
    <main className={`boardLayout ${styles[theme]}`}>
      {openSideBar && <SideBar />}
      <HideSideBar />
      {openMobileNav && <MobileNav onClick={handleMobileNav} />}
      <MainBoard />
    </main>
  );
};

export default Board;
