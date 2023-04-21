import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import useIsMobile from '@/utils/hooks/useIsMobile';

function TestWrapper() {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider theme={{ ...theme, isMobile }}>
      <Footer />
    </ThemeProvider>
  );
}

describe('Footer snapshot', () => {
  test('matches the snapshot', () => {
    const { asFragment } = render(<TestWrapper />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Footer copyright', () => {
  test('say my name', () => {
    render(<TestWrapper />);
    const copyrightText = screen.getByText(/Copyright 2023 Hackerman/i);
    expect(copyrightText).toBeInTheDocument();
  });
});
