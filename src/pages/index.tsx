import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import SqareButton from '@/components/reusables/SquareButton';
import { getServerSideProps as getProps } from '@/utils/getServerSideProps';
import useIsMobile from '@/utils/hooks/useIsMobile';
import bacgroundImageThree from '@assets/bacgroundImageThree.jpg';
import { isMobileUserAgent } from '@utils/userAgent';

export const getServerSideProps = getProps;

const Home = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const parallaxOffset = 400 * scrollFraction;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />
      <Container>
        <Background ref={imageRef}>
          <StyledImage
            src={bacgroundImageThree}
            alt='Background Image'
            width={2400}
            height={3600}
            quality={50}
            priority
          />
        </Background>
        <Foreground>
          <Title>THE COMPANY</Title>
          <SectionOne>
            <SqareButton destination='services' name='Pakalpojumi' />
            <Spacer />
            <StyledText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt luctus libero, a pharetra ipsum consequat eu.
            </StyledText>
          </SectionOne>
          <SectionTwo>
            <StyledText>
              Mauris id risus felis. Sed semper, mauris at consequat tincidunt,
              mauris nisl interdum lectus, in convallis mauris nisl a nunc.
            </StyledText>
            <Spacer />
            <SqareButton destination='projects' name='Projekti' />
          </SectionTwo>
        </Foreground>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  position: relative;
  margin-top: -80px;
  width: 100%;
  min-height: 250vh;
  max-height: 3600px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  min-height: 200vh;
  width: auto;
  object-fit: cover;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Background = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  position: absolute;
  top: 45vh;
  font-size: ${({ theme }) => theme.fontSizes.superLarge};
  color: ${({ theme }) => theme.colors.white};
`;

const Section = styled.section`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  min-height: 7rem;
  padding: 1rem 6rem;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.isMobile && `flex-direction: column;`};
  ${({ theme }) => theme.isMobile && `padding: 1.5rem 0;`};
`;

const SectionOne = styled(Section)`
  top: calc(100vh);
  ${({ theme }) => theme.isMobile && `top: 100vh;`};
`;

const SectionTwo = styled(Section)`
  top: 175vh;
`;

const Spacer = styled.div`
  height: 2rem;
`;

const StyledText = styled.p`
  max-width: 50%;
  text-align: center;
  ${({ theme }) => theme.isMobile && `max-width: 90%;`}
`;
