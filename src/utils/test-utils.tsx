import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme';
import useIsMobile from '@/utils/hooks/useIsMobile';
import { render, RenderOptions } from '@testing-library/react';

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

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export { customRender as render };
