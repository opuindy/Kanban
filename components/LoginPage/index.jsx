import React from 'react';
import styles from './loginPage.module.scss';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toogleMobileNav } from '../../app/features/SideBarSlice';
import { handleUpdateLinkIndex } from '../../app/features/navLinkIndexSlice';
import Header from '../Header';
import Layout from '../Layout';
import LoginForm from './loginForm';
import SideBar from '../SideBar';
import HideSideBar from '../HideSideBar';
import MobileNav from '../mobileNav';
import { links } from '../../utilities/links';
import RedirectModal from '../HomePage/redirectModal';

const LoginPage = () => {
  const { theme } = useSelector((state) => state.theme);
  const { openSideBar } = useSelector((state) => state.sideBar);
  const { openMobileNav } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigate = () => {
    const link = links.filter((link) => link.name == 'Register');
    const index = links.indexOf(link[0]);
    dispatch(handleUpdateLinkIndex({ index }));
    router.push('/register');
  };

  const handleMobileNav = () => {
    dispatch(toogleMobileNav());
  };

  return (
    <Layout>
      <Header homePage={true} />
      <RedirectModal />
      {openSideBar && <SideBar nav={true} />}
      {openMobileNav && <MobileNav onClick={handleMobileNav} nav={true} />}
      <HideSideBar />
      <section
        className={`${styles[theme]}  ${styles.loginPage} ${
          !openSideBar && styles.removeMargin
        }`}
      >
        <LoginForm onClick={handleNavigate} />
      </section>
    </Layout>
  );
};

export default LoginPage;
