import styled, { keyframes } from 'styled-components';

const dotFade = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <Dot />
      <Dot />
      <Dot />
    </LoadingContainer>
  );
};

export default LoadingScreen;

const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem;
  animation: ${dotFade} 1.4s infinite ease-in-out both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 6;
  overflow-x: hidden;
`;
