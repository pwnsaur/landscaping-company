import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const SoftPanel = styled.section<{ $padding?: string }>`
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.lg};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.panel};
  padding: ${({ $padding }) => $padding || '2rem 1.75rem'};
`;

export const MutedPanel = styled.article<{ $padding?: string }>`
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.lg};
  background: ${theme.semantic.surface.elevatedMuted};
  padding: ${({ $padding }) => $padding || '1.75rem 1.5rem'};
`;

export const MediaFrame = styled.div`
  position: relative;
  border: 1px solid ${theme.semantic.border.subtle};
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.raised};
`;
