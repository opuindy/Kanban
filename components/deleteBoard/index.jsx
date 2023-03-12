import React from 'react';
import Modal from '../modal';
import styles from './deleteBoard.module.scss';
import { useSelector } from 'react-redux';
import DeleteButtons from './deleteButtons';

const DeleteBoard = ({
  closeDeleteModal,
  deleteBoard,
  cancelDelete,
  text,
  title,
  taskId,
}) => {
  const { theme } = useSelector((state) => state.theme);
  const { data, activeIndex } = useSelector((state) => state.board);
  const { boards } = data;
  const id = Boolean(taskId) ? taskId : boards[activeIndex].id;

  return (
    <Modal onClick={closeDeleteModal}>
      <div
        className={`${styles.deleteBoardContainer}  ${styles[theme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.deleteBoardContainer__title}>{title}</h2>
        <p className={styles.deleteBoardContainer__paragraph}>{text}</p>
        <div className={styles.deleteBoardContainer__buttonContainer}>
          <DeleteButtons
            onClick={deleteBoard}
            cancelDelete={cancelDelete}
            id={id}
          ></DeleteButtons>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBoard;
