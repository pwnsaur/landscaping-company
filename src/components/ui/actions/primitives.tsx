import Link from 'next/link';
import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';

type ActionVariant = 'primary' | 'outline' | 'inverse';
type ActionSize = 'sm' | 'md';

const sizeStyles = {
  sm: css`
    padding: 0.62rem 1rem;
    font-size: 0.8rem;
    letter-spacing: 0.06rem;
  `,
  md: css`
    padding: 0.75rem 1.2rem;
    font-size: 0.84rem;
    letter-spacing: 0.07rem;
  `,
} satisfies Record<ActionSize, ReturnType<typeof css>>;

export const ActionLink = styled(Link)<{
  $variant?: ActionVariant;
  $size?: ActionSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: ${theme.radii.sm};
  transition:
    transform ${theme.motion.normal} ${theme.motion.easing},
    box-shadow ${theme.motion.normal} ${theme.motion.easing},
    background-color ${theme.motion.normal} ${theme.motion.easing},
    color ${theme.motion.normal} ${theme.motion.easing},
    border-color ${theme.motion.normal} ${theme.motion.easing};

  ${({ $size = 'md' }) => sizeStyles[$size]}

  ${({ $variant = 'outline' }) => {
    if ($variant === 'primary') {
      return css`
        background: ${theme.colors.darkGreen};
        border-color: ${theme.colors.darkGreen};
        color: ${theme.colors.white};

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
      border-color: ${theme.colors.lineAccent};
      color: ${theme.colors.darkGreen};

      &:hover {
        background: ${theme.colors.interactiveSoft};
      }
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${theme.colors.lineStrong};
    outline-offset: 2px;
  }
`;
