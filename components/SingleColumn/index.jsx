import React from 'react';
import ColumnTitle from '../columnTitle';
import TaskCard from '../TaskCard';
import styles from './column.module.scss';

const Column = ({ column }) => {
  const { name, color, tasks, id } = column;
  const num = tasks.length;

  return (
    <section className={styles.columnContainer}>
      <ColumnTitle name={name} color={color} num={num} />
      <div
        className={`${styles.columnContainer__TaskCardContainer} ${
          num < 1 && styles.emptyColumnContainer
        }`}
      >
        {tasks.map((task, index) => (
          <TaskCard
            task={task}
            key={task.id}
            columnIndex={id}
            index={index}
            taskIndex={task.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Column;
