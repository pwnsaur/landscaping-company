import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import backgroundTall from '@/../public/backgroundTall.jpg';

const Home = () => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current) return;

      const scrollTop = window.pageYOffset;
      const scrollFraction =
        scrollTop / (document.body.scrollHeight - window.innerHeight);
      const parallaxOffset = scrollFraction * 600;
      backgroundRef.current.style.transform = `translateY(-${
        parallaxOffset * 0.5
      }px)`;
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

      <Background ref={backgroundRef}>
        <StyledImage
          src={backgroundTall}
          alt='Background'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </Background>
      <Container>
        <Section first>
          <Heading>Section 1</Heading>
          <Content>Content</Content>
        </Section>
        <Section>
          <Heading>Section 2</Heading>
          <Content>Content</Content>
        </Section>
      </Container>
    </>
  );
};

export default Home;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const StyledImage = styled(Image)`
  position: absolute !important;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: rgba(248, 249, 250, 1);
`;

const Section = styled.section<{ first?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: ${({ first }) => (first ? 'calc(100vh - 141px) 0 8rem' : '8rem 0')};
  padding: 2rem;
  background-color: rgba(237, 237, 237, 1);
  z-index: 1;

  @media (max-width: 36em) {
    margin: ${({ first }) => (first ? 'calc(100vh - 269px) 0 8rem' : '8rem 0')};
  }
`;

const Heading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #666666;
`;
