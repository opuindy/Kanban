import React, { useState } from 'react';
import Modal from '../../modal';
import styles from './taskCardBody.module.scss';
import EllipsisButton from '../../ellipsisButton';
import { useSelector } from 'react-redux';
import Checked from '../../Inputs/Checked';
import SelectOption from '../../Inputs/Select';
import EditDelete from '../../Modify';
import Button from '../../Modify/Button';

const TaskCardBody = ({
  onClick,
  title,
  description,
  status,
  subtasks,
  num,
  columnIndex,
  taskIndex,
  handleOpenEditTask,
  handleOpenDeleteTask,
}) => {
  const [openEditDelete, setOpenEditDelete] = useState(false);
  const handleOpenEditDelete = () => {
    setOpenEditDelete(!openEditDelete);
  };
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <Modal onClick={onClick}>
        <div
          className={`${styles.taskCardBody} ${styles[theme]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.taskCardBody__titleButtonContainer}>
            <h3 className={styles.title}>{title}</h3>

            <EllipsisButton
              margin='margin'
              onClick={() => handleOpenEditDelete()}
            />
          </div>
          <p className={styles.taskCardBody__description}>
            {description !== '' ? description : 'No description'}
          </p>
          <div className={styles.taskCardBody__subtaskContainer}>
            <p className={styles.taskCardBody__subtask}>
              Subtasks {`( ${num} of ${subtasks.length} )`}
            </p>
            {subtasks.map((subtask, index) => (
              <Checked
                key={index}
                subtask={subtask}
                index={index}
                columnIndex={columnIndex}
              />
            ))}
          </div>
          <div className={styles.taskCardBody__status}>
            <p className={styles.taskCardBody__subtask}>Current Status</p>
            <SelectOption
              status={status}
              columnIndex={columnIndex}
              taskIndex={taskIndex}
            />
          </div>
          {openEditDelete && (
            <EditDelete move={'right'}>
              <Button
                onClick={() => {
                  handleOpenEditDelete(), handleOpenEditTask();
                }}
              >
                Edit Task
              </Button>
              <Button
                coloredtext={'red'}
                onClick={() => handleOpenDeleteTask()}
              >
                Delete Task
              </Button>
            </EditDelete>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TaskCardBody;
