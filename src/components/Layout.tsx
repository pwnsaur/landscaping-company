import Footer from './Footer';
import Navigation from './Navigation';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className='content'>
      <Navigation />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
