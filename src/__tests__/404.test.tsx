import NotFound from '@/pages/404';
import { render } from '@/utils/test-utils';

describe('NotFound Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
