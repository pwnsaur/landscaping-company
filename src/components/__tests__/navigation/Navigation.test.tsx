import MobileNav from '@/components/navigation/MobileNav';
import Navigation from '@/components/navigation/Navigation';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { fireEvent, render, screen } from '@/utils/test-utils';

jest.mock('../../../utils/hooks/useIsMobile');

const mockUseIsMobile = useIsMobile as jest.Mock;

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation component', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<Navigation />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders mobile navigation when in mobile view', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(
      <MobileNav
        currentPath='/'
        isOpen={true}
        isVisible={true}
        handleItemClick={() => {}}
      />
    );

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });
});
