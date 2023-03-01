import { ReactNode } from 'react';
import Navigation from './Navigation';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation>oh hai, I&#39;m header</Navigation>

      <div>{children}</div>

      <footer>
        <p>Copyright 2023 Hackerman</p>
      </footer>
    </>
  );
};

export default Layout;
