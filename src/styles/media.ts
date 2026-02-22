import { css } from 'styled-components';

import { theme } from '@/styles/theme';

type Breakpoint = keyof typeof theme.breakpoints;
type CssArgs = Parameters<typeof css>;

const down = (bp: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (max-width: ${theme.breakpoints[bp]}) {
      ${css(...args)}
    }
  `;

const up = (bp: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (min-width: ${theme.breakpoints[bp]}) {
      ${css(...args)}
    }
  `;

const between = (min: Breakpoint, max: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (min-width: ${theme.breakpoints[min]}) and (max-width: ${theme.breakpoints[max]}) {
      ${css(...args)}
    }
  `;

export const media = { down, up, between };
