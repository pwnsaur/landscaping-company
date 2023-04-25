import { render } from '@/utils/test-utils';
import Home from '@/pages/index';

const useSplashScreen = () => false;

describe('Home Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
