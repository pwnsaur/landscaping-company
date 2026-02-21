import styled, { css } from 'styled-components';

import { theme } from '@/styles/theme';

type PageSurface = 'page' | 'detail' | 'home';
type PageVariant = 'default' | 'listing' | 'detail';
type ContainerSize = 'narrow' | 'content' | 'wide';
type ViewportWidth = 'default' | 'compact';

const pageSurface = {
  page: theme.gradients.page,
  detail: theme.gradients.pageDetail,
  home: theme.gradients.homePage,
} satisfies Record<PageSurface, string>;

const getPageBottomDesktop = (variant: PageVariant) => {
  if (variant === 'listing') {
    return theme.layout.page.bottomLarge;
  }

  if (variant === 'detail') {
    return theme.layout.page.detailBottom;
  }

  return theme.layout.page.bottom;
};

const getPageBottomMobile = (variant: PageVariant) => {
  if (variant === 'detail') {
    return theme.layout.page.detailBottomCompact;
  }

  return theme.layout.page.bottomCompact;
};

const containerWidth = {
  narrow: theme.layout.container.narrow,
  content: theme.layout.container.content,
  wide: theme.layout.container.wide,
} satisfies Record<ContainerSize, string>;

const viewportWidth = {
  default: theme.layout.container.viewport,
  compact: theme.layout.container.compactViewport,
} satisfies Record<ViewportWidth, string>;

export const PageShell = styled.main<{
  $surface?: PageSurface;
  $variant?: PageVariant;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $variant = 'default' }) =>
    `${theme.layout.page.top} ${theme.spacing.md} ${getPageBottomDesktop($variant)}`};
  background: ${({ $surface = 'page' }) => pageSurface[$surface]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${({ $variant = 'default' }) =>
      `${theme.layout.page.topCompact} ${theme.spacing.md} ${getPageBottomMobile(
        $variant
      )}`};
  }
`;

export const ContentContainer = styled.section<{
  $size?: ContainerSize;
  $viewport?: ViewportWidth;
}>`
  width: ${({ $size = 'content', $viewport = 'default' }) =>
    `min(${containerWidth[$size]}, ${viewportWidth[$viewport]})`};
`;

export const SectionStack = styled.section<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || theme.spacing.md};
`;

export const CardGrid = styled.section<{ $min?: string }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $min }) => $min || theme.layout.grid.cardMinWidth}, 1fr)
  );
  gap: ${theme.layout.grid.gap};
`;

export const CenteredPanel = styled.section`
  width: 100%;
  text-align: center;
  line-height: ${theme.typography.lineHeightRelaxed};
  border: 1px solid ${theme.semantic.border.subtle};
  background: ${theme.colors.surfaceElevatedSoft};
  padding: ${theme.spacing.lg} ${theme.spacing.md};
`;

export const DarkCtaPanel = styled.section`
  width: 100%;
  text-align: center;
  border: 1px solid ${theme.semantic.border.strong};
  background: ${theme.gradients.panelDark};
  color: ${theme.semantic.text.onAccent};
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
`;

export const InteractiveLink = styled.a`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: ${theme.typography.trackingWide};
  transition:
    background-color ${theme.motion.normal} ${theme.motion.easing},
    color ${theme.motion.normal} ${theme.motion.easing};
`;

export const PlainSection = styled.section<{ $mt?: string }>`
  width: 100%;
  ${({ $mt }) =>
    $mt
      ? css`
          margin-top: ${$mt};
        `
      : ''}
`;
