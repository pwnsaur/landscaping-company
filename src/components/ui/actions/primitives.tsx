import Link from 'next/link';
import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';

type ActionVariant = 'primary' | 'outline' | 'inverse';
type ActionSize = 'sm' | 'md';

export const ActionLink = styled(Link)<{
  $variant?: ActionVariant;
  $size?: ActionSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.bold};
  border: 1px solid;
  border-radius: ${theme.radii.full};
  transition:
    transform ${theme.motion.normal} ${theme.motion.easing},
    box-shadow ${theme.motion.normal} ${theme.motion.easing},
    background-color ${theme.motion.normal} ${theme.motion.easing},
    color ${theme.motion.normal} ${theme.motion.easing},
    border-color ${theme.motion.normal} ${theme.motion.easing};

  ${({ $size = 'md' }) =>
    $size === 'sm'
      ? css`
          padding: 0.62rem 1rem;
          font-size: 0.8rem;
          letter-spacing: 0.06rem;
        `
      : css`
          padding: 0.75rem 1.2rem;
          font-size: 0.84rem;
          letter-spacing: 0.07rem;
        `}

  ${({ $variant = 'outline' }) => {
    if ($variant === 'primary') {
      return css`
        background: ${theme.colors.darkGreen};
        border-color: ${theme.colors.darkGreen};
        color: ${theme.semantic.text.onAccent};

        &:hover {
          transform: translateY(-2px);
          box-shadow: ${theme.shadows.softLift};
        }
      `;
    }

    if ($variant === 'inverse') {
      return css`
        background: transparent;
        border-color: ${theme.colors.lineOnDarkStrong};
        color: ${theme.colors.white};

        &:hover {
          background: ${theme.colors.white};
          color: ${theme.colors.darkGreen};
        }
      `;
    }

    return css`
      background: transparent;
      border-color: ${theme.semantic.border.accent};
      color: ${theme.colors.darkGreen};

      &:hover {
        transform: translateY(-1px);
        background: ${theme.semantic.interactive.ghost};
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${theme.semantic.border.strong};
    outline-offset: 2px;
  }
`;
