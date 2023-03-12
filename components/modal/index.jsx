import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ children, opacity, onClick }) => {
  return (
    <section
      className={`${styles.modalContainer}  ${styles[opacity]}`}
      onClick={onClick}
    >
      {children}
    </section>
  );
};

export default Modal;
