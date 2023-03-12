import React from 'react';
import styles from './newBoardButton.module.scss';
import { motion } from 'framer-motion';
import BoardSvg from '../../SVG/boardSvg';

const NewBoardButton = ({ onClick }) => {
  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <BoardSvg props='createSvg' />+ Create New Board
    </motion.button>
  );
};

export default NewBoardButton;
