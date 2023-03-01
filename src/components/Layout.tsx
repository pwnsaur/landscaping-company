import { ReactNode } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='content'>
      <Navigation />

      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
