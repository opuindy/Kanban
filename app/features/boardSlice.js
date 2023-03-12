import { createSlice, current, nanoid } from '@reduxjs/toolkit';
import data from '../../data.json';

const initialState = {
  data: data,
  activeIndex: 0,
  taskId: undefined,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    handleActiveIndex: (state, { payload }) => {
      state.activeIndex = payload.index;
    },
    handleTaskId: (state, { payload }) => {
      state.taskId = payload.id;
    },
    handleCompletedTask: (state, { payload }) => {
      state.data.boards[state.activeIndex].columns.map((column) => {
        if (column.id === payload.columnIndex) {
          column.tasks.map((task) => {
            if (task.id === state.taskId) {
              task.subtasks[payload.index].isCompleted = payload.isMarked;
            }
          });
        }
      });
    },
    handleSelectStatus: (state, { payload }) => {
      let status = undefined;
      let taskToMove = [];
      let taskIndex = undefined;
      state.data.boards[state.activeIndex].columns.map((column) => {
        if (payload.columnIndex === column.id) {
          column.tasks.map((task) => {
            if (task.id === state.taskId) {
              task.status = payload.newStatus;
              status = task.status;
              taskIndex = column.tasks.indexOf(task);

              if (column.name !== task.status) {
                taskToMove.push(
                  column.tasks.find((task) => task.status !== column.name)
                );

                state.data.boards[state.activeIndex].columns.map((column) => {
                  if (column.name === task.status) {
                    column.tasks.unshift(taskToMove[0]);
                  }
                });
                column.tasks.splice(taskIndex, 1);
              }
            }
          });
        }
      });
    },

    createNewBoard: {
      reducer(state, action) {
        state.data.boards.push(action.payload);
      },
      prepare(name, inputs) {
        return {
          payload: {
            id: nanoid(),
            name,
            columns: inputs,
          },
        };
      },
    },
    editBoard: {
      reducer(state, action) {
        state.data.boards.map((board) => {
          if (board.id === action.payload.id) {
            board.name = action.payload.editName;
            board.columns = action.payload.columns;
          }
          return board;
        });
      },
      prepare(editId, editName, newInputs) {
        return {
          payload: {
            id: editId,
            editName,
            columns: newInputs,
          },
        };
      },
    },
    handleDeleteBoard: (state, { payload }) => {
      const newBoard = state.data.boards.filter(
        (board) => board.id !== payload.id
      );

      state.data.boards = newBoard;
      state.activeIndex = 0;
    },
    handleAddTask: {
      reducer(state, { payload }) {
        const task = {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          status: payload.status,
          subtasks: payload.subtasks,
        };
        state.data.boards[state.activeIndex].columns.map((column) => {
          if (column.name === payload.status) {
            column.tasks.push(task);
          }
          return column;
        });
      },
      prepare(inputs, title, description, status) {
        return {
          payload: {
            id: nanoid(),
            title: title,
            description: description,
            status: status,
            subtasks: inputs,
          },
        };
      },
    },
    handleEditTask: {
      reducer(state, { payload }) {
        let taskToMove = [];
        state.data.boards[state.activeIndex].columns.map((column) => {
          if (Boolean(column.tasks.map((task) => task.id === state.taskId))) {
            column.tasks.map((task) => {
              if (task.id === state.taskId) {
                task.title = payload.title;
                task.description = payload.description;
                task.status = payload.status;
                task.subtasks = payload.subtasks;
                task.id = state.taskId;
                if (task.status !== column.name) {
                  const taskIndex = column.tasks.indexOf(task);
                  taskToMove.push(task);
                  state.data.boards[state.activeIndex].columns.map((column) => {
                    if (column.name === task.status) {
                      column.tasks.unshift(taskToMove[0]);
                    }
                  });
                  column.tasks.splice(taskIndex, 1);
                }
              }
              return task;
            });
          }
        });
      },
      prepare(editInputs, editTitle, description, status) {
        return {
          payload: {
            title: editTitle,
            description: description,
            status: status,
            subtasks: editInputs,
          },
        };
      },
    },

    handleDeleteTask: (state, { payload }) => {
      const newColumns = state.data.boards[state.activeIndex].columns.map(
        (column) => {
          if (Boolean(column.tasks.find((task) => task.id === payload.id))) {
            const index = column.tasks.findIndex(
              (task) => task.id === payload.id
            );

            column.tasks.splice(index, 1);
          }
          return column;
        }
      );

      state.data.boards[state.activeIndex].columns = newColumns;
    },
  },
});

export const {
  handleActiveIndex,
  handleCompletedTask,
  handleSelectStatus,
  handleTaskId,
  handleDeleteBoard,
  createNewBoard,
  editBoard,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
} = boardSlice.actions;

export default boardSlice.reducer;
