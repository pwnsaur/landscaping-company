import styled from 'styled-components';

import Footer from '@components/Footer';
import Navigation from '@components/navigation/Navigation';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Navigation />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
