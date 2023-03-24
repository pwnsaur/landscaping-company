import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import backgroundTall from '../../public/backgroundTall.jpg';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.pageYOffset;
      document.getElementById('parallax')!.style.backgroundPositionY = `${
        yPos * -0.5
      }px`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <Container id='parallax'>
        <TitleContainer>
          <Title>The Company</Title>
        </TitleContainer>
        <Section>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            officiis. Illo assumenda velit ratione enim, quaerat inventore
            nostrum sequi vel nihil, tempore maxime ad. Quibusdam rerum ducimus
            voluptates provident sit?
          </Text>
        </Section>
        <Section>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque
            dolorum minus quisquam sint sunt ad sit vero, eos repudiandae in
            doloribus est porro veniam enim fugiat ipsam laborum at?
          </Text>
        </Section>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  position: relative;
  background-image: url(${backgroundTall.src});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: repeat-y;
  background-position: top center;
  width: 100%;
  min-height: 100dvh;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 141px);
  ${({ theme }) => theme.isMobile && `min-height: calc(100dvh - 109px);`}
`;

const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  color: white;
  text-transform: uppercase;
  ${({ theme }) => theme.isMobile && `font-size: 2.5rem;`}
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20rem;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: lightgreen;
`;

const Text = styled.div`
  width: 70%;
  padding: 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify;
  ${({ theme }) => theme.isMobile && `width: 100%;`}
`;
