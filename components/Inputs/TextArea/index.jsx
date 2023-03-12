import React from 'react';
import styles from './textArea.module.scss';
import { useSelector } from 'react-redux';

const TextArea = (props) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <>
      <div className={`${styles.textAreaContainer} ${styles[theme]}`}>
        <label
          htmlFor='description'
          className={styles.textAreaContainer__label}
        >
          {props.label}
        </label>
        <textarea
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          cols='20'
          rows='10'
          className={styles.textAreaContainer__input}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;
