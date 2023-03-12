import React from 'react';
import styles from './utilityButton.module.scss';

const UtilityButton = ({ children, onClick }) => {
  return (
    <button type='button' onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default UtilityButton;
