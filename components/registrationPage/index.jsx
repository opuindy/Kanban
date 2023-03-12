import React from 'react';
import styles from './registrationPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toogleMobileNav } from '../../app/features/SideBarSlice';
import Header from '../Header';
import Layout from '../Layout';
import RegistrationForm from './registrationForm';
import SideBar from '../SideBar';
import HideSideBar from '../HideSideBar';
import MobileNav from '../mobileNav';
import RedirectModal from '../HomePage/redirectModal';

const RegistrationPage = () => {
  const { theme } = useSelector((state) => state.theme);
  const { openSideBar } = useSelector((state) => state.sideBar);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const handleMobileNav = () => {
    dispatch(toogleMobileNav());
  };

  return (
    <Layout>
      <Header homePage={true} zIndex='head' />
      <RedirectModal />
      {openSideBar && <SideBar nav={true} />}
      {openMobileNav && <MobileNav onClick={handleMobileNav} nav={true} />}
      <HideSideBar />
      <section
        className={`${styles[theme]}  ${styles.registration} ${
          !openSideBar && styles.removeMargin
        }`}
      >
        <RegistrationForm />
      </section>
    </Layout>
  );
};

export default RegistrationPage;
