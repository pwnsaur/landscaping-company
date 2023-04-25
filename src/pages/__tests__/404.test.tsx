import { render } from '@/utils/test-utils';
import NotFound from '@/pages/404';

describe('About Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
