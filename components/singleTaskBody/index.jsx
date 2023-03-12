import React from 'react';
import DeleteBoard from '../deleteBoard';
import TaskCardBody from '../TaskCard/TaskCardBody';

const SingleTaskBody = ({
  board,
  onClick,
  taskId,
  deleteTask,
  handleOpenEditTask,
  handleOpenDeleteTask,
  handleDeleteTask,
  closeDeleteModal,
  taskTitle,
  taskTexts,
}) => {
  const [activeTaskColumn] = board.columns.filter((column) =>
    column.tasks.find((task) => task.id === taskId)
  );

  const [activeTask] = activeTaskColumn.tasks.filter(
    (task) => task.id === taskId
  );

  const num = activeTask.subtasks.filter(
    (subtask) => subtask.isCompleted.toString() === 'true'
  ).length;

  return (
    <>
      {!deleteTask ? (
        <TaskCardBody
          {...activeTask}
          num={num}
          columnIndex={activeTaskColumn.id}
          taskIndex={taskId}
          onClick={onClick}
          handleOpenEditTask={handleOpenEditTask}
          handleOpenDeleteTask={handleOpenDeleteTask}
        />
      ) : (
        <DeleteBoard
          title={taskTitle('task ')}
          text={taskTexts(activeTask.title, 'task')}
          deleteBoard={handleDeleteTask}
          cancelDelete={closeDeleteModal}
          taskId={activeTask.id}
        />
      )}
    </>
  );
};

export default SingleTaskBody;
