import React, { useState } from 'react';
import styles from './editTask.module.scss';
import Modal from '../modal';
import { useSelector } from 'react-redux';
import TextInput from '../Inputs/TextInput';
import TextArea from '../Inputs/TextArea';
import AddInput from '../Inputs/AddInput';
import SelectOption from '../Inputs/Select';
import UtilityButton from '../utilityButton';
import { motion } from 'framer-motion';

const EditTask = (props) => {
  const [activeTaskColumn] = props.board.columns.filter((column) =>
    column.tasks.find((task) => task.id === props.taskId)
  );

  const [activeTask] = activeTaskColumn.tasks.filter(
    (task) => task.id === props.taskId
  );

  const { theme } = useSelector((state) => state.theme);
  const [editTitle, setEditTitle] = useState(activeTask.title);
  const [description, setDescription] = useState(activeTask.description);
  const [status, setStatus] = useState(activeTask.status);
  const [inputFields, setInputFields] = useState(
    activeTask.subtasks.map((subtask) => {
      return { ...subtask, name: subtask.title };
    })
  );
  const [isSubmitted, setIsSubmitted] = useState(undefined);

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()));
  };

  const handleDescriptionChange = (e) => {
    setDescription(
      e.target.value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    );
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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

    if (
      editTitle &&
      inputFields.every((inputField) => Boolean(inputField.name))
    ) {
      const editInputs = inputFields.map((inputField) => {
        if (!inputField.isCompleted) {
          return {
            title: inputField.name,
            isCompleted: false,
          };
        }
        return inputField;
      });
      props.handleEditTask(editInputs, editTitle, description, status);
      props.onClick();
      setIsSubmitted(true);
    }
    setIsSubmitted(false);
  };

  return (
    <>
      <Modal onClick={props.onClick}>
        <form
          className={`${styles.editTaskContainer} ${styles[theme]}`}
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={`${styles.editTaskContainer__title}`}>Edit Task</h2>
          <TextInput
            label='Title'
            error='error'
            name='title'
            value={editTitle}
            onChange={handleTitleChange}
            isSubmitted={isSubmitted}
          />
          <TextArea
            label='Description'
            name='description'
            id='description'
            value={description}
            onChange={handleDescriptionChange}
          />
          <AddInput
            showDelete={true}
            fields={inputFields}
            title='subtasks'
            buttonTitle='+ Add New Subtask'
            onChange={(event, index) => handleChange(event, index)}
            onHandleAddNew={() => handleAddInputField()}
            isSubmitted={isSubmitted}
            onHandleRemoveInputField={(fieldIndex) =>
              handleRemoveInputField(fieldIndex)
            }
          />
          <div className={styles.editTaskContainer__status}>
            <p className={styles.editTaskContainer__subtask}>Status</p>
            <SelectOption status={status} onChange={handleStatusChange} />
          </div>
          <motion.div
            className={`${styles.editTaskContainer__createTask} `}
            whileTap={{ scale: 0.9 }}
          >
            <UtilityButton onClick={(e) => handleSubmit(e)}>
              Save Changes
            </UtilityButton>
          </motion.div>
        </form>
      </Modal>
    </>
  );
};

export default EditTask;
