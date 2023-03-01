import styles from '@/styles/Navigation.module.scss';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

type Props = {
  children: string;
};

const Navigation = (props: Props) => {
  return (
    <div className={styles.container}>
      <Link href='/'>Sākums</Link>
      <Link href='/about'>Par mums</Link>
      <Link href='/services'>Pakalpojumi</Link>
      <Link href='/projects'>Projekti</Link>
      <Link href='/contact'>Kontakti</Link>
    </div>
  );
};

export default Navigation;
