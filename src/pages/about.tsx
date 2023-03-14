import { NextSeo } from 'next-seo';
import Image from 'next/image';
import styled from 'styled-components';
import cato from '../../public/cato.jpg';

const About = () => {
  return (
    <>
      <NextSeo
        title='Par mums'
        titleTemplate='Brasika | %s'
        description='Par mums'
      />

      <Container>
        <LeftDiv>
          <StyledImage src={cato} alt='cato' />
        </LeftDiv>
        <RightDiv>
          <Heading>Hey it&#39;s us</Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit
            amet purus ac eros luctus dictum vel id dui. Nunc suscipit est vel
            augue euismod, quis tristique mauris luctus. Integer fringilla elit
            a eros mollis, nec dignissim eros efficitur. Sed eget eleifend
            lorem. Sed non arcu ac tortor consectetur lobortis vel vel arcu.
          </Paragraph>
        </RightDiv>
      </Container>
    </>
  );
};

export default About;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4em;

  @media only screen and (max-width: 40em) {
    flex-direction: column;
    margin: 2em;
  }
`;

const LeftDiv = styled.div`
  width: 40%;

  @media only screen and (max-width: 40em) {
    width: 100%;
  }
`;

const RightDiv = styled.div`
  width: 60%;
  padding: 0 4rem;

  @media only screen and (max-width: 40em) {
    width: 100%;
    padding: 0;
  }
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
`;
