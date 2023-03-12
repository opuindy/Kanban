import styles from './header.module.scss';
import Image from 'next/image';
import logoDark from '../../public/assets/logo-dark.svg';
import logoLight from '../../public/assets/logo-light.svg';
import logoMobile from '../../public/assets/logo-mobile.svg';
import iconDown from '../../public/assets/icon-chevron-down.svg';
import iconUp from '../../public/assets/icon-chevron-up.svg';
import iconAdd from '../../public/assets/icon-add-task-mobile.svg';
import EllipsisButton from '../ellipsisButton';
import UtilityButton from '../utilityButton';
import { motion } from 'framer-motion';
import useWindowWidth from '../Hooks/windowWidth';
import { useSelector, useDispatch } from 'react-redux';
import { toogleMobileNav } from '../../app/features/SideBarSlice';
import {
  handleOpenEditBoard,
  handleOpenEditDeleteModal,
  handleCloseEditDeleteModal,
  handleOpenDeleteModal,
  handleOpenAddTaskModal,
} from '../../app/features/modifyBoardSlice';
import EditDelete from '../Modify';
import Button from '../Modify/Button';
import ThemeButton from '../Nav/ThemeButton';

const Header = (props) => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { data, activeIndex } = useSelector((state) => state.board);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  const { editDeleteModal } = useSelector((state) => state.modifyBoard);
  const logoImage = theme === 'light' ? logoDark : logoLight;
  const buttonImage = openMobileNav ? iconUp : iconDown;
  const { boards } = data;
  const image = windowWidth > 767 ? logoImage : logoMobile;

  if (props.homePage) {
    return (
      <header
        className={`${styles.header} ${styles[theme]} ${styles[props.zIndex]}`}
      >
        {' '}
        <div
          className={`${styles.header__logoContainer} ${styles.pad} ${styles[theme]}`}
        >
          <Image
            src={logoImage}
            alt='logo'
            className={styles.header__homeImg}
          />
        </div>
        <div className={styles.header__titleContainer}>
          {windowWidth < 768 && (
            <button
              className={styles.button}
              onClick={() => dispatch(toogleMobileNav())}
            >
              <Image
                src={buttonImage}
                alt='icon'
                className={styles.img}
                width='auto'
              />
            </button>
          )}
        </div>
        <ThemeButton homePage={props.homePage} />
      </header>
    );
  }

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={`${styles.header__logoContainer} ${styles[theme]}`}>
        <Image src={image} alt='logo' className={styles.header__img} />
      </div>
      <div className={styles.header__titleContainer}>
        <h2 className={styles.title}>
          {boards.length < 1 ? 'No Board Found' : boards[activeIndex].name}
        </h2>
        {windowWidth < 768 && (
          <button
            className={styles.button}
            onClick={() => dispatch(toogleMobileNav())}
          >
            <Image
              src={buttonImage}
              alt='icon'
              className={styles.img}
              width='auto'
            />
          </button>
        )}
      </div>
      {boards.length > 0 && (
        <div className={styles.header__addButtonContainer}>
          <motion.div
            className={styles.header__buttonContainer}
            whileTap={{ scale: 0.9 }}
          >
            <UtilityButton onClick={() => dispatch(handleOpenAddTaskModal())}>
              {windowWidth > 767 ? (
                '+ Add New Task'
              ) : (
                <Image
                  src={iconAdd}
                  alt='add-icon'
                  className={styles.addIcon}
                />
              )}
            </UtilityButton>
          </motion.div>
          <EllipsisButton
            onClick={() =>
              !editDeleteModal
                ? dispatch(handleOpenEditDeleteModal())
                : dispatch(handleCloseEditDeleteModal())
            }
          />
          {editDeleteModal && (
            <EditDelete onClick={(event) => event.stopPropagation()}>
              <Button onClick={() => dispatch(handleOpenEditBoard())}>
                Edit Board
              </Button>
              <Button
                coloredtext='red'
                onClick={() => dispatch(handleOpenDeleteModal())}
              >
                Delete Board
              </Button>
            </EditDelete>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
