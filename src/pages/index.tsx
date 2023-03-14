import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import backgroundImage from '../../public/backgroundImage.jpg';

const Home = () => {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <Main>
        <Parallax translateY={[-150, 220]}>
          <BackgroundImage src={backgroundImage} alt='bg' priority />
        </Parallax>
        <Content>
          <Title>Sākums</Title>
        </Content>
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  height: 100%;
  width: 100%;
`;

const BackgroundImage = styled(Image)`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: -1;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 3rem;
`;
