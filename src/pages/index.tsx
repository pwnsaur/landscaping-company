import styled from 'styled-components';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <>
      <NextSeo
        title='Sākums'
        titleTemplate='Brasika | %s'
        description='Sākums'
      />

      <Main>Sākums</Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  height: 100%;
`;
