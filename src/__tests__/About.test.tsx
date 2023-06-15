import About from '@/pages/about';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { render } from '@/utils/test-utils';

jest.mock('../utils/hooks/useIsMobile');

describe('About Page', () => {
  test('matches the snapshot in desktop view', () => {
    (useIsMobile as jest.Mock).mockReturnValue(false);
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches the snapshot in mobile view', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);
    const { asFragment } = render(<About />);
    expect(asFragment()).toMatchSnapshot();
  });
});
