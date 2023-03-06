import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import styles from '../styles/Navigation.module.scss';

const Navigation = () => {
  return (
    <StyledContainer className={styles.container}>
      {/* <ImageWrapper> */}
      <Image src={Logo} alt='logo' priority />
      {/* </ImageWrapper> */}
      <Link href='/'>Sākums</Link>
      <Link href='/projects'>Projekti</Link>
      <Link href='/services'>Pakalpojumi</Link>
      <Link href='/about'>Par mums</Link>
      <Link href='/contacts'>Kontakti</Link>
    </StyledContainer>
  );
};

export default Navigation;

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 100px;
  align-items: center;
  padding: 5px;
  padding-right: 100px;
  background-color: white;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  max-height: 100%;
  width: auto;

  img {
    max-height: 100%;
    width: auto;
  }
`;
