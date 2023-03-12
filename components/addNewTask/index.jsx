import { useState } from 'react';
import Modal from '../modal';
import { useSelector, useDispatch } from 'react-redux';
import styles from './addNewTask.module.scss';
import TextInput from '../Inputs/TextInput';
import TextArea from '../Inputs/TextArea';
import AddInput from '../Inputs/AddInput';
import SelectOption from '../Inputs/Select';
import UtilityButton from '../utilityButton';
import { motion } from 'framer-motion';

const AddNewTask = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(props.board.columns[0].name);
  const [inputFields, setInputFields] = useState([
    {
      name: '',
    },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(undefined);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()));
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

    if (title && inputFields.every((inputField) => Boolean(inputField.name))) {
      const inputs = inputFields.map((inputField) => {
        return {
          title: inputField.name,
          isCompleted: false,
        };
      });

      setTitle('');
      setDescription('');

      props.handleAddTask(inputs, title, description, status);
      setIsSubmitted(true);
    }

    setIsSubmitted(false);
  };

  return (
    <>
      <Modal onClick={props.onClick}>
        <form
          className={`${styles.addTaskContainer} ${styles[theme]}`}
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={`${styles.addTaskContainer__title}`}>Add New Task</h2>
          <TextInput
            label='Title'
            error='error'
            name='title'
            value={title}
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
          <div className={styles.addTaskContainer__status}>
            <p className={styles.addTaskContainer__subtask}>Status</p>
            <SelectOption status={status} onChange={handleStatusChange} />
          </div>
          <motion.div
            className={`${styles.addTaskContainer__createTask} `}
            whileTap={{ scale: 0.9 }}
          >
            <UtilityButton onClick={(e) => handleSubmit(e)}>
              Create Task
            </UtilityButton>
          </motion.div>
        </form>
      </Modal>
    </>
  );
};

export default AddNewTask;
