import { render } from '@/utils/test-utils';
import About from '@/pages/about';

describe('About Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });
});
