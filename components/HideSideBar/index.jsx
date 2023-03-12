import React from 'react';
import styles from './hideSideBar.module.scss';
import Image from 'next/image';
import hideIcon from '../../public/assets/icon-hide-sidebar.svg';
import openIcon from '../../public/assets/icon-show-sidebar.svg';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toogleSideBar } from '../../app/features/SideBarSlice';

const HideSideBar = () => {
  const { openSideBar } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  return (
    <>
      {openSideBar ? (
        <section
          className={styles.hideSideBar}
          onClick={() => dispatch(toogleSideBar())}
        >
          <Image
            src={hideIcon}
            alt='hide-icon'
            className={styles.sideBarIcon}
          />
          <h3 className={styles.hideSideBar__title}>Hide Sidebar</h3>
        </section>
      ) : (
        <motion.section
          className={styles.openSideBar}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(toogleSideBar())}
        >
          <Image
            src={openIcon}
            alt='open-icon'
            className={styles.sideBarIconOpen}
          />
        </motion.section>
      )}
    </>
  );
};

export default HideSideBar;
