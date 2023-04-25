import { render } from '@/utils/test-utils';
import NavItems from '@/components/navigation/NavItems';

describe('NavItems component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<NavItems />);
    expect(asFragment()).toMatchSnapshot();
  });
});
