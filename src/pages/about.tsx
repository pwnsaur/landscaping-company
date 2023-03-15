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
    margin: 0.5rem;
  }
`;

const LeftDiv = styled.div`
  max-width: 40%;
  align-self: center;

  @media only screen and (max-width: 40em) {
    max-width: 80%;
  }
`;

const RightDiv = styled.div`
  max-width: 60%;
  padding: 0 4rem;

  @media only screen and (max-width: 40em) {
    max-width: 100%;
    padding: 1rem;
    text-align: center;
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
  height: 100%;
  object-fit: contain;
`;
