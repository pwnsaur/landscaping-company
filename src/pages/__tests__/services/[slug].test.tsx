import { render } from '@/utils/test-utils';
import Service from '@/pages/services';

describe('Service Page', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Service services={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
