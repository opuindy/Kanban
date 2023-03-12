import React from 'react';
import EditBoard from '../editBoard';
import styles from './newColumn.module.scss';

const NewColumn = (props) => {
  return (
    <>
      <div
        className={styles.columnContainer}
        onClick={props.handleOpenAddColumnModal}
      >
        {' '}
        + New Column
      </div>
      {props.addColumn && (
        <EditBoard
          title='Add New Column'
          disabled={true}
          onClick={props.onClick}
        />
      )}
    </>
  );
};

export default NewColumn;
