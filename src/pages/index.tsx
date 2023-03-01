import styles from '@/styles/Home.module.css';
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='A short description goes here.'
      />
      <main>
        <div>Sākums</div>
      </main>
    </>
  );
}
