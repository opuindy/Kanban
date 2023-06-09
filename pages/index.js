import Head from 'next/head';
import Image from 'next/image';
import HomePage from '../components/HomePage/Home';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        ></link>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;0,800;1,300&display=swap'
          rel='stylesheet'
        ></link>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage />
    </div>
  );
}
