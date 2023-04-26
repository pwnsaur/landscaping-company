import { render } from '@/utils/test-utils';
import DesktopNav from '@/components/navigation/DesktopNav';

describe('DesktopNav component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<DesktopNav />);
    expect(asFragment()).toMatchSnapshot();
  });
});
