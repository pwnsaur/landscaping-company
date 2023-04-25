import { render } from '@/utils/test-utils';
import DesktopNav from '@/components/navigation/DesktopNav';

describe('MobileNav component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<DesktopNav />);
    expect(asFragment()).toMatchSnapshot();
  });
});
