import React from 'react';
import styles from './registrationForm.module.scss';
import { useSelector } from 'react-redux';
import TextInput from '../../Inputs/TextInput';
import UtilityButton from '../../utilityButton';
import { motion } from 'framer-motion';

const RegistrationForm = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <form className={`${styles[theme]}  ${styles.form}`}>
      <h2>Register</h2>
      <TextInput
        id='name'
        name='name'
        label='name'
        type='text'
        error='error'
        placeholder='peter'
      />
      <TextInput
        name='surname'
        id='surname'
        label='surname'
        type='text'
        error='error'
        placeholder='stone'
      />
      <TextInput
        name='username'
        id='username'
        label='username'
        type='text'
        error='error'
        placeholder='peterstone'
      />
      <TextInput
        name='email'
        id='email'
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
      <TextInput
        name='password'
        label='confirm password'
        type='password'
        error='error'
        placeholder='******'
      />

      <motion.div
        className={styles.form__buttonContainer}
        whileTap={{ scale: 0.9 }}
      >
        <UtilityButton>register</UtilityButton>
      </motion.div>
    </form>
  );
};

export default RegistrationForm;
