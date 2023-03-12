import React, { useState, useEffect } from 'react';
import styles from './checked.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { handleCompletedTask } from '../../../app/features/boardSlice';
import { newStyle } from '../../../utilities/function';

const Checked = ({ subtask, index, columnIndex }) => {
  const [isMarked, setIsMarked] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { title, isCompleted } = subtask;

  useEffect(() => {
    setIsMarked(isCompleted);
  }, []);

  useEffect(() => {
    dispatch(
      handleCompletedTask({
        isMarked,
        index,
        columnIndex,
      })
    );
  }, [isMarked]);

  return (
    <div
      className={`${styles.checked} ${styles[theme]} ${styles[isCompleted]}`}
      style={newStyle(isCompleted, theme)}
    >
      <label className={styles.checked__label}>
        <input
          type='checkbox'
          checked={isMarked}
          onChange={(e) => setIsMarked(e.target.checked)}
          className={`${styles.checked__input} `}
        />
        {title}
      </label>
    </div>
  );
};

export default Checked;
