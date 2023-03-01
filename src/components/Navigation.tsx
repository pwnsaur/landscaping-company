import styles from '@/styles/Navigation.module.scss';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <div className={styles.container}>
      <Image src={Logo} alt='logo' />
      <Link href='/'>Sākums</Link>
      <Link href='/about'>Par mums</Link>
      <Link href='/services'>Pakalpojumi</Link>
      <Link href='/projects'>Projekti</Link>
      <Link href='/contact'>Kontakti</Link>
    </div>
  );
};

export default Navigation;
