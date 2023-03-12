import React from 'react';
import styles from './taskTitle.module.scss';
import { motion } from 'framer-motion';
import BoardSvg from '../../SVG/boardSvg';

const TaskTitle = ({ board, index, onclick, activeIndex }) => {
  const { name } = board;
  const active = index === activeIndex;

  return (
    <motion.li
      className={
        active ? `${styles.taskTitle} ${styles.active}` : `${styles.taskTitle} `
      }
      whileTap={{ scale: 0.9 }}
      onClick={() => onclick(index)}
    >
      <BoardSvg props={active ? 'active' : 'normal'} />
      {name}
    </motion.li>
  );
};

export default TaskTitle;
