// import styles from '@/styles/Home.module.css';
import styles from '../styles/Home.module.scss';

import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <main className={styles.main}>Sākums</main>
    </>
  );
}
