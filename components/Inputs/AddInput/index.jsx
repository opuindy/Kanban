import styles from './addInput.module.scss';
import TextInput from '../TextInput';
import Cross from '../../SVG/CrossIconSvg';
import UtilityButton from '../../utilityButton';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const AddInput = (props) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={styles.addInput}>
      <h3 className={styles.addInput__title}>{props.title}</h3>
      {props.fields.map((inputField, index) => (
        <div className={styles.addInput__columnsContainer} key={index}>
          <TextInput
            id='name'
            name={props.name}
            value={inputField.name}
            index={index}
            onChange={(event) => props.onChange(event, index)}
            key={index}
            isSubmitted={props.isSubmitted}
          />{' '}
          {(props.showDelete && (
            <motion.button
              className={styles.addInput__deleteColumnButton}
              disabled={Boolean(inputField.id) && props.disabled}
              onClick={() => {
                props.onHandleRemoveInputField(index);
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Cross />
            </motion.button>
          )) ||
            (props.fields.length > 1 && (
              <motion.button
                className={styles.addInput__deleteColumnButton}
                disabled={Boolean(inputField.id) && props.disabled}
                onClick={() => {
                  props.onHandleRemoveInputField(index);
                }}
                whileTap={{ scale: 0.8 }}
              >
                <Cross />
              </motion.button>
            ))}
        </div>
      ))}

      {props.fields.length < 6 && (
        <motion.div
          className={`${styles.addInput__addNew} ${styles[theme]}`}
          whileTap={{ scale: 0.9 }}
        >
          <UtilityButton onClick={props.onHandleAddNew}>
            {props.buttonTitle}
          </UtilityButton>
        </motion.div>
      )}
    </div>
  );
};

export default AddInput;
