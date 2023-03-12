import React from 'react';
import Modal from '../modal';
import styles from './mobileNav.module.scss';
import useWindowWidth from '../Hooks/windowWidth';
import { useSelector } from 'react-redux';
import Nav from '../Nav';

const MobileNav = ({ onClick, nav }) => {
  const windowWidth = useWindowWidth();
  const { theme } = useSelector((state) => state.theme);
  const { data, activeIndex } = useSelector((state) => state.board);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  return (
    <>
      {windowWidth < 768 && (
        <Modal onClick={onClick}>
          <div
            className={`${styles.MobileNavContainer} ${styles[theme]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Nav
              data={data}
              activeIndex={activeIndex}
              openMobileNav={openMobileNav}
              nav={nav}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default MobileNav;
