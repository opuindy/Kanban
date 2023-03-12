import React from 'react';
import Nav from '../Nav';
import styles from './sidebar.module.scss';
import { useSelector } from 'react-redux';

const SideBar = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { data, activeIndex } = useSelector((state) => state.board);
  const { openMobileNav } = useSelector((state) => state.sideBar);

  return (
    <aside className={`${styles.sideBar} ${styles[theme]}`}>
      <Nav
        data={data}
        activeIndex={activeIndex}
        openMobileNav={openMobileNav}
        nav={props.nav}
      />
    </aside>
  );
};

export default SideBar;
