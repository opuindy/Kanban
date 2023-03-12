import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './redirectModal.module.scss';
import Modal from '../../modal';
import { useSelector } from 'react-redux';

const RedirectModal = ({ onClick }) => {
  const { theme } = useSelector((state) => state.theme);
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/demo');
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleNavigate();
      {
        onClick && onClick();
      }
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      <Modal onClick={onClick}>
        <div className={`${styles.redirectContainer} ${styles[theme]}`}>
          <h3 className={styles.redirectContainer__title}>Oops!!!</h3>
          <p className={styles.redirectContainer__text}>
            sorry you can't login or register at the moment.
          </p>
          <p className={styles.redirectContainer__text}>
            Redirecting to demo page...
          </p>
        </div>
      </Modal>
    </>
  );
};

export default RedirectModal;
