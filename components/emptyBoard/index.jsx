import React from 'react';
import styles from './emptyBoardStyles.module.scss';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import UtilityButton from '../utilityButton';

const EmptyBoard = ({ onClick }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`${styles.emptyBoard} ${styles[theme]}`}>
      <p className={styles.emptyBoard__text}>
        This board is empty. Create a new column to get started.
      </p>
      <motion.div
        className={styles.emptyBoard__buttonContainer}
        whileTap={{ scale: 0.9 }}
      >
        <UtilityButton onClick={onClick}>+ Create New Board</UtilityButton>
      </motion.div>
    </div>
  );
};

export default EmptyBoard;
