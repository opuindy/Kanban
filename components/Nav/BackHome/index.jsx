import React from 'react';
import styles from './backHome.module.scss';
import BoardSvg from '../../SVG/boardSvg';
import { useSelector, useDispatch } from 'react-redux';
import { handleUpdateLinkIndex } from '../../../app/features/navLinkIndexSlice';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { links } from '../../../utilities/links';

const BackHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    const link = links.filter((link) => link.name == 'Home');
    const index = links.indexOf(link[0]);
    dispatch(handleUpdateLinkIndex({ index }));
    router.push('/');
  };

  return (
    <motion.button
      className={styles.button}
      onClick={handleNavigate}
      whileTap={{ scale: 0.9 }}
    >
      <BoardSvg props='createSvg' /> Back Home
    </motion.button>
  );
};

export default BackHome;
