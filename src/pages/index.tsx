import Image from 'next/image';
import { NextSeo } from 'next-seo';
import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import styled from 'styled-components';

import SqareButton from '@/components/reusables/SquareButton';
import backgroundImageOne from '@assets/backgroundImageOne.jpg';
import backgroundImageTwo from '@assets/backgroundImageTwo.jpg';

const Home = () => {
  const { ref: refOne } = useParallax<HTMLDivElement>({ speed: 10 });
  const { ref: refTwo } = useParallax<HTMLDivElement>({ speed: 10 });

  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <Container>
        {/* <ParallaxProvider> */}
        <Background>
          <Parallax translateY={[-15, 20]}>
            <BackgroundImage ref={refOne}>
              <StyledImage
                style={{ overflow: 'hidden' }}
                src={backgroundImageOne}
                alt='Background image'
                // fill
                // objectFit='cover'
                width={1920}
                height={1080}
              />
            </BackgroundImage>
            <BackgroundImage ref={refTwo}>
              <StyledImage
                src={backgroundImageTwo}
                alt='Background image'
                // fill
                // objectFit='cover'
                width={1920}
                height={1080}
              />
            </BackgroundImage>
          </Parallax>
        </Background>
        <Foreground>
          <TitleContainer>
            <Title>The Company</Title>
          </TitleContainer>
          <Section>
            {/* <Heading>Section 1</Heading> */}
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              officiis.
            </Text>
            <SqareButton
              name='Pakalpojumi'
              destination='services'
            ></SqareButton>
          </Section>
          <Spacer />
          <Section>
            {/* <Heading>Section 2</Heading> */}
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
              officiis.
            </Text>
            <SqareButton name='Projekti' destination='projects'></SqareButton>
          </Section>
          {/* <Spacer /> */}
        </Foreground>
        {/* </ParallaxProvider> */}
      </Container>
    </>
  );
};

export default Home;

const Background = styled.div`
  height: 200vh;
`;

const BackgroundImage = styled.div`
  /* top: 80px; */
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  /* vertical-align: middle; */
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* justify-content: center; */
  align-items: center;
  ${({ theme }) => theme.isMobile && `flex-direction: column;`};
  /* margin: 3rem 0; */
  margin: 0 50rem;
  margin-bottom: 5rem;

  padding: 2rem;
  text-align: center;
  /* height: calc(100vh - 20rem); */
  min-height: 10rem;
  width: 100%;

  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: #fff;
`;

const Spacer = styled.div`
  height: 25rem;
`;

const Text = styled.div`
  font-size: 1.2rem;
  text-align: center;
  width: 60%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.isMobile && `width: 90%;`};
`;

const Heading = styled.h1`
  /* color: white; */
`;

const Title = styled.h1`
  margin-top: 10vh;
  /* margin-bottom: 40vh; */

  font-size: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  /* ${({ theme }) => theme.isMobile && `font-size: 2.5rem;`} */
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: calc(155vh - 0rem); */
  height: 70rem;
`;
