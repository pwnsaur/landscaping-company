import styles from '@/styles/Navigation.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';

const Navigation = () => {
  return (
    <div className={styles.container} style={{ position: 'sticky', top: 0 }}>
      <Image className='image' src={Logo} alt='logo' priority />
      <Link href='/'>Sākums</Link>
      <Link href='/about'>Par mums</Link>
      <Link href='/services'>Pakalpojumi</Link>
      <Link href='/projects'>Projekti</Link>
      <Link href='/contacts'>Kontakti</Link>

      {/* <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          height: 100px;
          align-items: center;
          padding: 5px;

          img {
            max-height: 100px;
            width: auto;
          }
        }
      `}</style> */}
    </div>
  );
};

export default Navigation;
