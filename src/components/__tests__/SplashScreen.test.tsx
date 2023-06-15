import LoadingScreen from '@/components/LoadingScreen';
import { render } from '@/utils/test-utils';

describe('LoadingScreen component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<LoadingScreen />);
    expect(asFragment()).toMatchSnapshot();
  });
});
