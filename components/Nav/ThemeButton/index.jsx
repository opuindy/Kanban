import React from 'react';
import Image from 'next/image';
import styles from './themeButton.module.scss';
import DarkThemeIcon from '../../../public/assets/icon-dark-theme.svg';
import LightThemeIcon from '../../../public/assets/icon-light-theme.svg';
import { useSelector, useDispatch } from 'react-redux';
import { toogleTheme } from '../../../app/features/themeSlice';

const ThemeButton = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const move = theme === 'light' ? 'moveLeft' : 'moveRight';
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.ThemeButtonContainer} ${styles[theme]} ${
        styles[props.homePage ? props.homePage.toString() : '']
      }`}
    >
      <Image
        src={LightThemeIcon}
        alt='light-theme-icon'
        className={styles.ThemeButtonContainer__themeIcon}
      />
      <button
        className={styles.ThemeButtonContainer__button}
        onClick={() => {
          dispatch(toogleTheme());
        }}
      >
        <span
          className={`${styles.ThemeButtonContainer__span} ${styles[move]}`}
        ></span>
      </button>
      <Image
        src={DarkThemeIcon}
        alt='dark-theme-icon'
        className={styles.ThemeButtonContainer__themeIcon}
      />
    </div>
  );
};

export default ThemeButton;
