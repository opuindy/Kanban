import React from 'react';
import Link from 'next/link';
import styles from './link.module.scss';
import BoardSvg from '../../SVG/boardSvg';
import { motion } from 'framer-motion';

const Links = (props) => {
  return (
    <motion.li
      key={props.id}
      className={`${styles.navTitle} ${
        props.index === props.linkIndex && styles.active
      }`}
      whileTap={{ scale: 0.9 }}
      onClick={props.onClick}
    >
      <Link href={props.link} className={styles.navTitle__link}>
        <BoardSvg
          props={props.index === props.linkIndex ? 'active' : 'normal'}
        />
        {props.name}
      </Link>
    </motion.li>
  );
};

export default Links;
