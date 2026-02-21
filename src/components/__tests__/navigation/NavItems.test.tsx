import NavItems from '@/components/navigation/NavItems';
import { render } from '@/utils/test-utils';

describe('NavItems component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<NavItems currentPath='/' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
