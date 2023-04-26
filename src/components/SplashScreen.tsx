import styled from 'styled-components';

const SplashScreen = () => {
  return (
    <SplashContainer>
      <h1>Loading, be patient pls!</h1>
    </SplashContainer>
  );
};

export default SplashScreen;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  z-index: 6;
`;
