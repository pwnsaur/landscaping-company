import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;
