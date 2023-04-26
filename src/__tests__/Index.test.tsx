import { render } from '@/utils/test-utils';
import Home from '@/pages/index';

describe('Home Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
