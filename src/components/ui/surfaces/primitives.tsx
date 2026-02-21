import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const SoftPanel = styled.section<{ $padding?: string }>`
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.panel};
  padding: ${({ $padding }) => $padding || '1.45rem 1.35rem'};
`;

export const MutedPanel = styled.article<{ $padding?: string }>`
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.colors.surfaceElevatedMuted};
  padding: ${({ $padding }) => $padding || '1.35rem 1.25rem'};
`;

export const MediaFrame = styled.div`
  position: relative;
  border: 1px solid ${theme.colors.lineSoft};
  overflow: hidden;
  box-shadow: ${theme.shadows.raised};
`;
