import type { Metadata } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

import cato from '@/assets/cato.jpg';

export const metadata: Metadata = {
  title: 'Par mums',
  description: 'Par mums',
};

const AboutPage = () => {
  return (
    <Container>
      <LeftDiv>
        <StyledImage
          src={cato}
          alt='a cute cato'
          height={2688 / 4}
          width={1920 / 4}
          priority
          quality={40}
        />
      </LeftDiv>
      <RightDiv>
        <Heading>Hey it&apos;s us</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit
          amet purus ac eros luctus dictum vel id dui. Nunc suscipit est vel
          augue euismod, quis tristique mauris luctus. Integer fringilla elit a
          eros mollis, nec dignissim eros efficitur. Sed eget eleifend lorem.
          Sed non arcu ac tortor consectetur lobortis vel vel arcu.
        </Paragraph>
      </RightDiv>
    </Container>
  );
};

export default AboutPage;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem 4em;

  ${({ theme }) =>
    theme.isMobile &&
    `
      flex-direction: column;
      margin: 0.5rem;
      margin: 6rem 1rem 2rem;
  `}
`;

const LeftDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40%;
  align-self: center;

  ${({ theme }) =>
    theme.isMobile &&
    `
      max-width: 70%;
  `}
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 60%;
  padding: 0 4rem;

  ${({ theme }) =>
    theme.isMobile &&
    `
      max-width: 100%;
      padding: 1rem;
      text-align: center;
  `}
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  max-width: 20rem;
  object-fit: contain;
`;
