import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme';
import useIsMobile from '@/utils/hooks/useIsMobile';

interface TestWrapperProps {
  children: ReactNode;
}

const TestWrapper = ({ children }: TestWrapperProps) => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider theme={{ ...theme, isMobile }}>{children}</ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
