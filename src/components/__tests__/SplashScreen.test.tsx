import SplashScreen from '@/components/SplashScreen';
import { render } from '@/utils/test-utils';

describe('SplashScreen component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<SplashScreen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
