import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const SoftPanel = styled.section<{ $padding?: string }>`
  border: 1px solid ${theme.semantic.border.subtle};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.panel};
  padding: ${({ $padding }) => $padding || theme.components.surface.softPadding};
`;

export const MutedPanel = styled.article<{ $padding?: string }>`
  border: 1px solid ${theme.semantic.border.subtle};
  background: ${theme.semantic.surface.elevatedMuted};
  padding: ${({ $padding }) => $padding || theme.components.surface.mutedPadding};
`;

export const MediaFrame = styled.div`
  position: relative;
  border: 1px solid ${theme.semantic.border.subtle};
  overflow: hidden;
  box-shadow: ${theme.shadows.raised};
`;
