import React from 'react';
import styles from './loginForm.module.scss';
import { useSelector } from 'react-redux';
import TextInput from '../../Inputs/TextInput';
import UtilityButton from '../../utilityButton';
import { motion } from 'framer-motion';

const LoginForm = (props) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <form className={`${styles[theme]} ${styles.form}`}>
      <h2>Login</h2>
      <TextInput
        name='email'
        label='email'
        type='email'
        error='error'
        placeholder='abc@email.com'
      />
      <TextInput
        name='password'
        label='password'
        type='password'
        error='error'
        placeholder='******'
      />

      <motion.div
        className={styles.form__buttonContainer}
        whileTap={{ scale: 0.9 }}
      >
        <UtilityButton>login</UtilityButton>
      </motion.div>

      <p className={styles.form__text}>
        Not registered? click link below to register.
      </p>
      <p className={styles.form__register} onClick={props.onClick}>
        Register.
      </p>
    </form>
  );
};

export default LoginForm;
