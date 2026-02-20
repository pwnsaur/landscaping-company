import styled from 'styled-components';

import { theme } from '@/styles/theme';

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.superLarge};
  font-weight: ${theme.fontWeights.superBold};
`;
