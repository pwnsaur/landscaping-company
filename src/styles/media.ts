import { css, type DefaultTheme } from 'styled-components';

type Breakpoint = keyof DefaultTheme['breakpoints'];
type CssArgs = Parameters<typeof css>;

const down = (breakpoint: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `;

const up = (breakpoint: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints[breakpoint]}) {
      ${css(...args)}
    }
  `;

const between = (min: Breakpoint, max: Breakpoint) =>
  (...args: CssArgs) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints[min]}) and (max-width: ${({ theme }) => theme.breakpoints[max]}) {
      ${css(...args)}
    }
  `;

export const media = {
  down,
  up,
  between,
};
