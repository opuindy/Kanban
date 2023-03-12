import React from 'react';
import styles from './homePage.module.scss';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { links } from '../../../utilities/links';
import {
  handleOpenRedirectModal,
  handleCloseRedirectModal,
} from '../../../app/features/redirectModalSlice';
import { handleUpdateLinkIndex } from '../../../app/features/navLinkIndexSlice';
import { toogleMobileNav } from '../../../app/features/SideBarSlice';
import Header from '../../Header';
import UtilityButton from '../../utilityButton';
import { motion } from 'framer-motion';
import RedirectModal from '../redirectModal';
import Layout from '../../Layout';
import SideBar from '../../SideBar';
import HideSideBar from '../../HideSideBar';
import MobileNav from '../../mobileNav';

const HomePage = () => {
  const { theme } = useSelector((state) => state.theme);
  const { openSideBar } = useSelector((state) => state.sideBar);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  const { openRedirectModal } = useSelector((state) => state.redirectModal);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/demo');
  };

  const handleLoginNavigate = () => {
    const link = links.filter((link) => link.name == 'Login');
    const index = links.indexOf(link[0]);
    dispatch(handleUpdateLinkIndex({ index }));
    router.push('/login');
  };

  const handleMobileNav = () => {
    dispatch(toogleMobileNav());
  };

  return (
    <Layout>
      <Header homePage={true} />
      {openSideBar && <SideBar nav={true} />}
      {openMobileNav && <MobileNav onClick={handleMobileNav} nav={true} />}
      <HideSideBar />
      <main
        className={`${styles[theme]} ${styles.homePage} ${
          !openSideBar && styles.removeMargin
        }`}
      >
        <p className={styles.homePage__text}>
          Please click the demo button to try Demo or Login to use Kanban
        </p>
        <div className={styles.homePage__buttonContainer}>
          <motion.div
            className={`${styles.homePage__demoButtonContainer} ${styles.demo}`}
            whileTap={{ scale: 0.9 }}
          >
            <UtilityButton onClick={handleNavigate}>View Demo</UtilityButton>
          </motion.div>
          <motion.div
            className={styles.homePage__loginButtonContainer}
            whileTap={{ scale: 0.9 }}
          >
            <UtilityButton onClick={handleLoginNavigate}>login</UtilityButton>
          </motion.div>
        </div>
        {openRedirectModal && (
          <RedirectModal onClick={() => dispatch(handleCloseRedirectModal())} />
        )}
      </main>
    </Layout>
  );
};

export default HomePage;
