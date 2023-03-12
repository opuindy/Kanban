import React from 'react';
import styles from './iconDown.module.scss';

const IconDown = ({ props }) => {
  return (
    <svg
      width='10'
      height='7'
      xmlns='http://www.w3.org/2000/svg'
      className={styles[props]}
    >
      <path stroke='#635FC7' strokeWidth='2' fill='none' d='m1 1 4 4 4-4' />
    </svg>
  );
};

export default IconDown;
