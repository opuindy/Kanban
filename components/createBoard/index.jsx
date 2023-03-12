import React, { useState } from 'react';
import Modal from '../modal';
import styles from './createBoard.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { createNewBoard } from '../../app/features/boardSlice';
import { handleCloseCreateNewBoard } from '../../app/features/modifyBoardSlice';
import { handleActiveIndex } from '../../app/features/boardSlice';
import UtilityButton from '../utilityButton';
import TextInput from '../Inputs/TextInput';
import AddInput from '../Inputs/AddInput';
import { iD } from '../../utilities/function';
import { randomHexColor } from '../../utilities/color';
import { motion } from 'framer-motion';

const CreateBoard = () => {
  const { theme } = useSelector((state) => state.theme);
  const { data } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [name, setName] = useState('');
  const [inputFields, setInputFields] = useState([
    {
      name: '',
    },
  ]);

  const onChange = (e) => {
    setName(() =>
      e.target.value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    );
  };

  const handleChange = (event, indexnum) => {
    setInputFields(
      inputFields.map((inputField, index) => {
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
    setInputFields([
      ...inputFields,
      {
        name: '',
      },
    ]);
  };

  const handleRemoveInputField = (fieldIndex) => {
    const newFields = inputFields.filter(
      (column, index) => index !== fieldIndex
    );
    setInputFields([...newFields]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && inputFields.every((inputField) => Boolean(inputField.name))) {
      const inputs = inputFields.map((inputField) => {
        return {
          id: nanoid(),
          name: inputField.name,
          color: randomHexColor(),
          tasks: [],
        };
      });
      dispatch(createNewBoard(name, inputs));
      setName('');
      const index = data.boards.length;
      dispatch(handleActiveIndex({ index }));
      dispatch(handleCloseCreateNewBoard());
      setIsSubmitted(true);
    }

    setIsSubmitted(false);
  };

  return (
    <Modal onClick={() => dispatch(handleCloseCreateNewBoard())}>
      <form
        className={`${styles.createBoardContainer} ${styles[theme]}`}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.createBoardContainer__title}>Add New Board</h2>
        <TextInput
          label='Name'
          id={inputFields.name}
          name={inputFields.name}
          value={name}
          onChange={onChange}
          error='error'
          isSubmitted={isSubmitted}
        />
        <AddInput
          title='Columns'
          buttonTitle='+ Add New Column'
          fields={inputFields}
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
          <UtilityButton onClick={handleSubmit}>
            {' '}
            + Create New Board
          </UtilityButton>
        </motion.div>
      </form>
    </Modal>
  );
};

export default CreateBoard;
