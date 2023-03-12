import React, { useState, useEffect } from 'react';
import styles from './textInput.module.scss';
import { useSelector } from 'react-redux';

const TextInput = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (props.isSubmitted) {
      setFocused(false);
    }
    if (props.isSubmitted === false) {
      setFocused(true);
    }
  }, [props.isSubmitted]);

  const handleFocused = (e) => {
    setFocused(true);
  };

  const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;

  return (
    <>
      <div className={`${styles.labelInputContainer} ${styles[theme]}`}>
        <label
          htmlFor={props.name}
          className={`${styles.labelInputContainer__label} ${styles.label}`}
        >
          {props.label}
        </label>
        <input
          type={props.type ? props.type : 'text'}
          name={props.name}
          placeholder={props.placeholder}
          id={props.id}
          value={props.value}
          onChange={
            props.index
              ? (event) => props.onChange(event, props.index)
              : props.onChange
          }
          required
          disabled={props.disabled}
          focused={focused.toString()}
          onBlur={handleFocused}
          className={styles.labelInputContainer__input}
        />
        <span
          className={`${styles.labelInputContainer__span} ${
            styles[props.error]
          }`}
        >
          *Required*
        </span>
      </div>
    </>
  );
};

export default TextInput;
