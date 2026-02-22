import React, { ErrorInfo } from 'react';
import styled from 'styled-components';

import { theme } from '@/styles/theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Fallback>
          <FallbackTitle>Lapu neizdevās ielādēt.</FallbackTitle>
          <ReloadButton onClick={() => window.location.reload()}>
            Mēģināt vēlreiz
          </ReloadButton>
        </Fallback>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  min-height: 50vh;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const FallbackTitle = styled.h1`
  font-size: ${theme.fontSizes.larger};
  color: ${theme.colors.title};
`;

const ReloadButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid ${theme.semantic.border.strong};
  border-radius: ${theme.radii.md};
  background: ${theme.gradients.panelLight};
  color: ${theme.colors.text};
  cursor: pointer;
  font-size: ${theme.fontSizes.normal};
  transition: background ${theme.motion.normal} ${theme.motion.easing};

  &:hover {
    background: ${theme.colors.interactiveSoft};
  }
`;
