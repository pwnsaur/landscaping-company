import styled from 'styled-components';
import Footer from './Footer';
import Navigation from './Navigation';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <Content>
      <Navigation />
      {children}
      <Footer />
    </Content>
  );
};

export default Layout;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;
