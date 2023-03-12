import React from 'react';
import styles from './columnTitle.module.scss';

const ColumnTitle = ({ name, color, num }) => {
  return (
    <div className={styles.container}>
      <span
        className={styles.container__color}
        style={{ backgroundColor: color }}
      ></span>{' '}
      <p className={styles.container__title}> {`${name} (${num})`}</p>
    </div>
  );
};

export default ColumnTitle;
