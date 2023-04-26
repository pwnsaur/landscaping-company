import { render } from '@/utils/test-utils';
import SplashScreen from '@/components/SplashScreen';

describe('SplashScreen component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<SplashScreen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
