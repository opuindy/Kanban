import React, { useState } from 'react';
import styles from './selected.module.scss';
import IconDown from '../../SVG/IconDown';
import { useSelector, useDispatch } from 'react-redux';
import { handleSelectStatus } from '../../../app/features/boardSlice';

const SelectOption = ({ status, columnIndex, onChange }) => {
  const [newStatus, setnewStatus] = useState(status);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { data, activeIndex } = useSelector((state) => state.board);
  const board = data.boards[activeIndex];

  return (
    <div className={styles.select}>
      <IconDown props='position' />
      <select
        id='status'
        name='status'
        onChange={onChange ? onChange : (e) => setnewStatus(e.target.value)}
      >
        <option>{newStatus}</option>
        {board.columns.map((column, index) => (
          <option
            value={column.name}
            key={index}
            onClick={() =>
              dispatch(
                handleSelectStatus({
                  column,
                  index,
                  newStatus,
                  status,
                  columnIndex,
                })
              )
            }
            className={styles[theme]}
          >
            {column.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
