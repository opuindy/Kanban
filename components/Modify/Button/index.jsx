import React from 'react';
import styles from './button.module.scss';

const Button = ({ children, onClick, coloredtext }) => {
  return (
    <button
      type='button'
      className={`${styles.button} ${styles[coloredtext]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
