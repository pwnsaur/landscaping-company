import DesktopNav from '@/components/navigation/DesktopNav';
import { render } from '@/utils/test-utils';

describe('DesktopNav component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<DesktopNav currentPath='/' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
