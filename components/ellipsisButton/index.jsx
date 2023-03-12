import React from 'react';
import Image from 'next/image';
import verticalEllipsis from '../../public/assets/icon-vertical-ellipsis.svg';
import styles from './ellipsisButton.module.scss';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const EllipsisButton = ({ onClick, margin }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={styles.buttonContainer}>
      <motion.button
        type='button'
        onClick={onClick}
        className={`${styles.button} ${styles[theme]} ${styles[margin]}`}
        whileTap={{ scale: 0.8 }}
      >
        <Image src={verticalEllipsis} alt='vertical-ellipsis-icon' />
      </motion.button>
    </div>
  );
};

export default EllipsisButton;
