import Image from 'next/image';
import { NextSeo } from 'next-seo';
import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styled from 'styled-components';

import backgroundImageOne from '@assets/backgroundImageOne.jpg';
import backgroundImageTwo from '@assets/backgroundImageTwo.jpg';

const Home = () => {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <Container>
        <ParallaxProvider>
          <Background>
            <Parallax speed={-30}>
              <BackgroundImage>
                <Image
                  src={backgroundImageOne}
                  alt='Background image'
                  // fill
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
              <Heading>Section 1</Heading>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur, officiis. Illo assumenda velit ratione enim, quaerat
                inventore nostrum sequi vel nihil, tempore maxime ad. Quibusdam
                rerum ducimus voluptates provident sit?
              </Text>
            </Section>
            <Section>
              <Heading>Section 2</Heading>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur, officiis. Illo assumenda velit ratione enim, quaerat
                inventore nostrum sequi vel nihil, tempore maxime ad. Quibusdam
                rerum ducimus voluptates provident sit?
              </Text>
            </Section>
          </Foreground>
        </ParallaxProvider>
      </Container>
    </>
  );
};

export default Home;

const Background = styled.div`
  height: 100vh;
`;

const BackgroundImage = styled.div`
  position: relative;
  /* width: 100%; */
  height: 100vh;
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
  margin: 4rem 0;
  /* width: 100%; */

  text-align: center;
  min-height: 8rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Text = styled.div`
  font-size: 1.2rem;
  text-align: center;
  /* width: 70%; */

  ${({ theme }) => theme.isMobile && `width: 100%;`}
`;

const Heading = styled.h1`
  /* color: white; */
`;

const Title = styled.h1`
  margin-top: 50vh;
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
  min-height: calc(100vh + 255px);
`;
