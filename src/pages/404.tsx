import styled from 'styled-components';

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
  font-size: 3rem;
  font-weight: bold;
`;
