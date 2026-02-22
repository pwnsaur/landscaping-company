export const layoutTokens = {
  page: {
    top: '7.5rem',
    topCompact: '6rem',
    bottom: '7.5rem',
    bottomLarge: '9rem',
    bottomCompact: '6rem',
    detailBottom: '6.5rem',
    detailBottomCompact: '5.5rem',
  },
  container: {
    narrow: '60rem',
    content: '70rem',
    wide: '75rem',
    viewport: '96vw',
    compactViewport: '94vw',
  },
  grid: {
    cardMinWidth: '17.5rem',
    gap: '1.35rem',
    columnGap: '1.35rem',
    rowGap: '2rem',
  },
  rhythm: {
    tight: '0.9rem',
    related: '1.5rem',
    section: '3.5rem',
  },
  nav: {
    hiddenOffset: '-106px',
    mobilePanelTopOffset: '5.7rem',
    heightDesktop: '84px',
    heightMobile: '72px',
  },
} as const;

export const typographyTokens = {
  eyebrowSize: '0.74rem',
  labelStrong: '0.84rem',
  eyebrowTracking: '0.12rem',
  trackingTight: '0.01rem',
  trackingNormal: '0.03rem',
  trackingWide: '0.06rem',
  trackingDisplay: '0.08rem',
  headingMaxWidth: '46rem',
  leadMaxWidth: '44rem',
  bodySmall: '0.92rem',
  bodyBase: '1rem',
  bodyLead: 'clamp(1.05rem, 1.5vw, 1.18rem)',
  pageHeading: 'clamp(1.5rem, 3.6vw, 2.7rem)',
  pageLead: 'clamp(1rem, 1.5vw, 1.18rem)',
  sectionHeading: 'clamp(1.15rem, 2.4vw, 1.75rem)',
  display: 'clamp(2rem, 4.4vw, 4rem)',
  featureTitle: '1.05rem',
  meta: '0.75rem',
  lineHeightTight: '1.16',
  lineHeightHeading: '1.22',
  lineHeightBody: '1.68',
  lineHeightRelaxed: '1.72',
} as const;

export const motionTokens = {
  fast: '0.18s',
  normal: '0.2s',
  slow: '0.3s',
  easing: 'ease',
  easingEmphasized: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export const zIndexTokens = {
  nav: 6,
  overlay: 7,
  floating: 8,
} as const;
