import React, { useState } from 'react';
import styles from './editBoard.module.scss';
import Modal from '../modal';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { editBoard } from '../../app/features/boardSlice';
import { handleCloseEditBoard } from '../../app/features/modifyBoardSlice';
import UtilityButton from '../utilityButton';
import TextInput from '../Inputs/TextInput';
import AddInput from '../Inputs/AddInput';
import { motion } from 'framer-motion';
import { randomHexColor } from '../../utilities/color';

const EditBoard = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { data, activeIndex } = useSelector((state) => state.board);
  const board = data.boards[activeIndex];
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [editName, setEditName] = useState(board.name);
  const [editInputFields, setEditInputFields] = useState(
    board.columns.map((column) => {
      return { ...column, name: column.name };
    })
  );
  const [editId, setEditId] = useState(board.id);

  const onChange = (e) => {
    setEditName(() =>
      e.target.value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    );
  };

  const handleChange = (event, indexnum) => {
    setEditInputFields(
      editInputFields.map((inputField, index) => {
        if (index === indexnum) {
          const input = event.target.value.replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          );
          return { ...inputField, name: input };
        }
        return inputField;
      })
    );
  };

  const handleAddInputField = () => {
    setEditInputFields([
      ...editInputFields,
      {
        name: '',
      },
    ]);
  };

  const handleRemoveInputField = (fieldIndex) => {
    const newFields = editInputFields.filter(
      (column, index) => index !== fieldIndex
    );
    setEditInputFields([...newFields]);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (
      editName &&
      editInputFields.every((inputField) => Boolean(inputField.name))
    ) {
      const newInputs = editInputFields.map((inputField) => {
        if (!inputField.id && !inputField.color && !inputField.tasks) {
          return {
            id: nanoid(),
            name: inputField.name,
            color: randomHexColor(),
            tasks: [],
          };
        }
        return inputField;
      });
      dispatch(editBoard(editId, editName, newInputs));
      dispatch(handleCloseEditBoard());
      setIsSubmitted(true);
    }

    setIsSubmitted(false);
  };

  return (
    <Modal onClick={props.onClick}>
      <form
        className={`${styles.createBoardContainer} ${styles[theme]}`}
        onSubmit={handleEdit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.createBoardContainer__title}>{props.title}</h2>
        <TextInput
          label='Name'
          id='name'
          name='name'
          value={editName}
          onChange={onChange}
          error='error'
          isSubmitted={isSubmitted}
          disabled={props.disabled}
        />
        <AddInput
          title='Columns'
          name='name'
          buttonTitle='+ Add New Column'
          disabled={props.disabled}
          fields={editInputFields}
          onChange={(event, index) => handleChange(event, index)}
          onHandleAddNew={() => handleAddInputField()}
          isSubmitted={isSubmitted}
          onHandleRemoveInputField={(fieldIndex) =>
            handleRemoveInputField(fieldIndex)
          }
        />
        <motion.div
          className={styles.createBoardContainer__createNew}
          whileTap={{ scale: 0.9 }}
        >
          <UtilityButton onClick={handleEdit}> Save Changes</UtilityButton>
        </motion.div>
      </form>
    </Modal>
  );
};

export default EditBoard;
