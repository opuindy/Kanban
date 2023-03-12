import React from 'react';
import styles from './deleteButtons.module.scss';
import { useSelector } from 'react-redux';
import UtilityButton from '../../utilityButton';
import { motion } from 'framer-motion';

const DeleteButtons = ({ onClick, id, cancelDelete }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      {' '}
      <motion.div
        className={`${styles.button} ${styles.redButton}`}
        whileTap={{ scale: 0.9 }}
      >
        <UtilityButton onClick={() => onClick(id)}>Delete</UtilityButton>
      </motion.div>
      <motion.div
        className={`${styles.button} ${styles[theme]}`}
        whileTap={{ scale: 0.9 }}
      >
        <UtilityButton onClick={cancelDelete}>Cancel</UtilityButton>
      </motion.div>
    </>
  );
};

export default DeleteButtons;
