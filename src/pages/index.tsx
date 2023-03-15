import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import backgroundImageOne from '../../public/backgroundImageOne.jpg';
import backgroundImageTwo from '../../public/backgroundImageTwo.jpg';

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
          <Wrapper>
            <BackgroundImage
              src={backgroundImageOne}
              alt='background'
              priority
            />
          </Wrapper>

          <Wrapper>
            <BackgroundImage
              src={backgroundImageTwo}
              alt='background'
              priority
            />
          </Wrapper>
        </Parallax>

        <SectionsGrid>
          <Section>
            <TransparentContainer />
            <SectionContent>
              <Title>Section 1</Title>
              <p>Something, something</p>
            </SectionContent>
          </Section>

          <Section>
            <TransparentContainer />
            <SectionContent>
              <Title>Section 2</Title>
              <p>Something, something</p>
            </SectionContent>
          </Section>

          <Section>
            <TransparentContainer />
            <SectionContent>
              <Title>Section 3</Title>
              <p>Something, something</p>
            </SectionContent>
          </Section>
        </SectionsGrid>
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  padding-bottom: 55vh;
`;

const BackgroundImage = styled(Image)`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: -1;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 3rem;
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 100vh);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const TransparentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: calc(100% - 2rem);
  margin: auto;
  overflow: hidden;
  position: relative;
`;
