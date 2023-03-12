import React from 'react';
import NewBoardButton from './createBoardButton';
import styles from './nav.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { handleUpdateLinkIndex } from '../../app/features/navLinkIndexSlice';
import TaskTitle from './TaskTitle';
import Links from './link';
import ThemeButton from './ThemeButton';
import { handleActiveIndex } from '../../app/features/boardSlice';
import { toogleMobileNav } from '../../app/features/SideBarSlice';
import { handleOpenCreateNewBoard } from '../../app/features/modifyBoardSlice';
import { links } from '../../utilities/links';
import BackHome from './BackHome';

const Nav = ({ data, activeIndex, openMobileNav, nav }) => {
  const { linkIndex } = useSelector((state) => state.linkIndex);
  const dispatch = useDispatch();
  const { boards } = data;

  const handleActiveNav = (index) => {
    dispatch(handleActiveIndex({ index }));
  };

  const createNewBoard = () => {
    dispatch(handleOpenCreateNewBoard());
    openMobileNav && dispatch(toogleMobileNav());
  };

  return (
    <nav className={styles.nav}>
      {!nav ? (
        <>
          {' '}
          <h3 className={styles.nav__title}>
            ALL BOARDS {`(${boards.length})`}
          </h3>
          <ul className={styles.nav__listContainer}>
            {boards.map((board, index) => {
              return (
                <TaskTitle
                  board={board}
                  index={index}
                  onclick={handleActiveNav}
                  key={index}
                  activeIndex={activeIndex}
                />
              );
            })}
          </ul>
          <BackHome />
          <NewBoardButton onClick={createNewBoard} />
          <ThemeButton />
        </>
      ) : (
        <>
          {' '}
          <ul className={styles.nav__listContainer}>
            {links.map((linkItem, index) => {
              const { id, link, name } = linkItem;
              return (
                <Links
                  key={id}
                  id={id}
                  link={link}
                  name={name}
                  index={index}
                  linkIndex={linkIndex}
                  onClick={() => dispatch(handleUpdateLinkIndex({ index }))}
                />
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
