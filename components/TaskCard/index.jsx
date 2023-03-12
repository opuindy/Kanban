import styles from './taskCard.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { handleOpenTaskCardBody } from '../../app/features/taskCardBodySlice';
import { handleTaskId } from '../../app/features/boardSlice';

const TaskCard = ({ task, index, handleFinalDrag }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { title, id, subtasks } = task;
  const num = subtasks.filter(
    (subtask) => subtask.isCompleted.toString() === 'true'
  ).length;

  return (
    <>
      <motion.article
        className={`${styles.taskContainer} ${styles[theme]}`}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          dispatch(handleOpenTaskCardBody()), dispatch(handleTaskId({ id }));
        }}
      >
        <h3 className={styles.taskContainer__taskTitle}>{title}</h3>
        <p
          className={styles.taskContainer__completedTask}
        >{`${num} of ${subtasks.length}`}</p>
      </motion.article>
    </>
  );
};

export default TaskCard;
