import React from 'react';
import styles from './editDelete.module.scss';
import { useSelector } from 'react-redux';

const EditDelete = ({ children, move }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <section
      className={`${styles.buttonContainer}  ${styles[theme]} ${styles[move]}`}
    >
      {children}
    </section>
  );
};

export default EditDelete;
