import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const FieldInput = styled.input`
  width: 100%;
  min-height: 2.9rem;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.lineSoft};
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.glowSoft};
  font-size: ${theme.fontSizes.normal};
  line-height: 1.4;
  outline: none;
  transition:
    border-color ${theme.motion.fast} ${theme.motion.easing},
    box-shadow ${theme.motion.fast} ${theme.motion.easing};

  &:focus {
    border-color: ${theme.colors.darkGreen};
    box-shadow: 0 0 0 3px ${theme.colors.focusRing};
  }

  ::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  min-height: 11rem;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.lineSoft};
  border-radius: ${theme.radii.sm};
  background: ${theme.colors.glowSoft};
  font-size: ${theme.fontSizes.normal};
  line-height: 1.55;
  resize: none;
  outline: none;
  transition:
    border-color ${theme.motion.fast} ${theme.motion.easing},
    box-shadow ${theme.motion.fast} ${theme.motion.easing};

  &:focus {
    border-color: ${theme.colors.darkGreen};
    box-shadow: 0 0 0 3px ${theme.colors.focusRing};
  }

  ::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const PrimaryButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  min-width: 8.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  background-color: ${theme.colors.darkGreen};
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.darkGreen};
  border-radius: ${theme.radii.sm};
  box-shadow: ${theme.shadows.soft};
  font-size: ${theme.fontSizes.normal};
  font-weight: ${theme.fontWeights.bold};
  transition:
    background-color ${theme.motion.normal} ${theme.motion.easing},
    color ${theme.motion.normal} ${theme.motion.easing},
    transform ${theme.motion.normal} ${theme.motion.easing};
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    background-color: transparent;
    color: ${theme.colors.darkGreen};
  }

  &:disabled {
    transform: none;
    background-color: ${theme.colors.interactiveMuted};
    border-color: ${theme.colors.interactiveMutedBorder};
    color: ${theme.colors.grey};
    cursor: not-allowed;
  }
`;
