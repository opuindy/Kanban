import React from 'react';
import styles from './mainBoard.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleCloseTaskCardBody,
  handleOpenEditTask,
  handleCloseEditTask,
  handleCloseDeleteTask,
  handleOpenDeleteTask,
} from '../../app/features/taskCardBodySlice';
import {
  handleCloseDeleteModal,
  handleCloseEditBoard,
  handleOpenAddColumnModal,
  handleCloseAddColumnModal,
  handleCloseAddTaskModal,
  handleOpenCreateNewBoard,
} from '../../app/features/modifyBoardSlice';
import {
  handleDeleteBoard,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
} from '../../app/features/boardSlice';
import Column from '../SingleColumn';
import SingleTaskBody from '../singleTaskBody';
import CreateBoard from '../createBoard';
import EditBoard from '../editBoard';
import DeleteBoard from '../deleteBoard';
import NewColumn from '../newColumn';
import AddNewTask from '../addNewTask';
import EditTask from '../editTask';
import { title, text, taskTexts, taskTitle } from '../../utilities/function';
import EmptyBoard from '../emptyBoard';

const MainBoard = () => {
  const { openSideBar } = useSelector((state) => state.sideBar);
  const { data, activeIndex, taskId } = useSelector((state) => state.board);
  const { deleteModal, addColumn, addTask, openCreateNewBoard, editBoard } =
    useSelector((state) => state.modifyBoard);
  const { openTaskCardBody, editTask, deleteTask } = useSelector(
    (state) => state.taskCardBody
  );

  const dispatch = useDispatch();
  const board = data.boards[activeIndex];

  const boardTitle = 'board';
  const boardText =
    data.boards[activeIndex] !== undefined ? data.boards[activeIndex].name : '';

  if (data.boards.length <= 0) {
    return (
      <section
        className={
          openSideBar
            ? `${styles.mainBoard}`
            : `${styles.mainBoard} ${styles.removeMargin}`
        }
      >
        {openCreateNewBoard && <CreateBoard />}
        <EmptyBoard onClick={() => dispatch(handleOpenCreateNewBoard())} />
      </section>
    );
  }

  return (
    <section
      className={
        openSideBar
          ? `${styles.mainBoard}`
          : `${styles.mainBoard} ${styles.removeMargin}`
      }
    >
      {board.columns.map((column) => (
        <Column column={column} key={column.id} columnIndex={column.id} />
      ))}
      {openTaskCardBody && (
        <SingleTaskBody
          board={board}
          taskId={taskId}
          deleteTask={deleteTask}
          taskTexts={taskTexts}
          taskTitle={taskTitle}
          onClick={() => {
            dispatch(handleCloseTaskCardBody());
          }}
          handleOpenEditTask={() => {
            dispatch(handleOpenEditTask());
          }}
          closeDeleteModal={() => {
            dispatch(handleCloseDeleteTask());
          }}
          handleOpenDeleteTask={() => {
            dispatch(handleOpenDeleteTask());
          }}
          handleDeleteTask={(id) => {
            dispatch(handleDeleteTask({ id }));
            dispatch(handleCloseDeleteTask());
          }}
        />
      )}
      {board.columns.length < 6 && (
        <NewColumn
          addColumn={addColumn}
          onClick={() => dispatch(handleCloseAddColumnModal())}
          handleOpenAddColumnModal={() => dispatch(handleOpenAddColumnModal())}
        />
      )}

      {openCreateNewBoard && <CreateBoard />}
      {editBoard && (
        <EditBoard
          title='Edit Board'
          onClick={() => dispatch(handleCloseEditBoard())}
        />
      )}
      {deleteModal && (
        <DeleteBoard
          closeDeleteModal={() => dispatch(handleCloseDeleteModal())}
          deleteBoard={(id) =>
            dispatch(
              handleDeleteBoard({ id }),
              dispatch(handleCloseDeleteModal())
            )
          }
          cancelDelete={() => dispatch(handleCloseDeleteModal())}
          text={text(boardText, boardTitle)}
          title={title(boardTitle)}
        />
      )}
      {addTask && (
        <AddNewTask
          board={board}
          handleAddTask={(inputs, title, description, status) => {
            dispatch(handleAddTask(inputs, title, description, status)),
              dispatch(handleCloseAddTaskModal());
          }}
          onClick={() => dispatch(handleCloseAddTaskModal())}
        />
      )}
      {editTask && (
        <EditTask
          board={board}
          taskId={taskId}
          handleEditTask={(editInputs, editTitle, description, status) => {
            dispatch(
              handleEditTask(editInputs, editTitle, description, status)
            );
          }}
          onClick={() => dispatch(handleCloseEditTask())}
        />
      )}
    </section>
  );
};

export default MainBoard;
