import { render } from '@/utils/test-utils';
import Services from '@/pages/services';

describe('Services Page', () => {
  test('matches the snapshot without data', () => {
    const { asFragment } = render(<Services services={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
