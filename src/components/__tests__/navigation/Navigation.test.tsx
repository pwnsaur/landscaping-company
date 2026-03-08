import { act } from 'react';

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
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseIsMobile.mockReturnValue(false);
  });

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
        onClose={() => {}}
      />
    );

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  test('locks body scroll while the mobile navigation is open and restores it after close', () => {
    jest.useFakeTimers();
    mockUseIsMobile.mockReturnValue(true);

    render(<Navigation />);

    fireEvent.click(
      screen.getByRole('button', { name: /atv.* navig/i, hidden: true })
    );

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('button', { name: /aizv.* navig/i }));

    expect(document.body.style.overflow).toBe('');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
