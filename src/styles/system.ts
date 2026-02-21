export const layoutTokens = {
  page: {
    top: '6.5rem',
    topCompact: '5.5rem',
    bottom: '6rem',
    bottomLarge: '7rem',
    bottomCompact: '4.5rem',
    detailBottom: '5rem',
    detailBottomCompact: '4rem',
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
    gap: '1rem',
  },
  nav: {
    hiddenOffset: '-106px',
    mobilePanelTopOffset: '5.7rem',
    heightDesktop: '84px',
    heightMobile: '72px',
  },
} as const;

export const componentTokens = {
  home: {
    heroMinHeight: '130svh',
    heroMinHeightCompact: '112svh',
    heroBottom: '8rem',
    heroBottomCompact: '4rem',
    heroContentWidth: 'min(58rem, 92vw)',
    heroContentPadding: '2.5rem 1.75rem',
    heroContentPaddingCompact: '1.6rem 1.1rem',
    heroGlowWidth: 'min(72rem, 88vw)',
    heroGlowHeight: 'min(32rem, 56vw)',
    panelsOffset: '-6rem',
    panelsOffsetCompact: '-3rem',
    panelsBottom: '5rem',
    panelsBottomCompact: '3.5rem',
    heroLeadSize: 'clamp(1rem, 1.6vw, 1.28rem)',
    panelTitleSize: 'clamp(1.2rem, 2vw, 1.72rem)',
    eyebrowTracking: '0.3rem',
    scrollHintSize: '0.66rem',
    panelMinHeight: '18rem',
    panelMinHeightCompact: '14rem',
  },
  card: {
    mediaMinHeight: '14rem',
    mediaMinHeightCompact: '12rem',
    descriptionGap: '0.8rem',
    descriptionPadding: '1.4rem 1.3rem 1.5rem',
    hoverLift: '-4px',
    titleSize: 'clamp(1.3rem, 1.8vw, 1.9rem)',
    metaSize: '0.72rem',
    actionSize: '0.82rem',
  },
  overlay: {
    sideRailWidth: '70px',
    contentWidthOffset: '140px',
    toastBottomOffset: '1rem',
    lightPadding: '1rem',
  },
  gallery: {
    tileMinWidth: '16rem',
    tileAspectPadding: '66%',
    topOffset: '2rem',
  },
  about: {
    heroGap: '1rem',
    heroMediaAspect: '5 / 6',
    heroMediaAspectCompact: '4 / 5',
    heroMediaMinHeight: '28rem',
    heroMediaMinHeightCompact: '16rem',
    sectionCardMinWidth: '18rem',
    valueCardMinWidth: '16rem',
  },
  contacts: {
    infoGridLeft: 'minmax(0, 0.86fr)',
    infoGridRight: 'minmax(0, 1.14fr)',
  },
  iconButton: {
    size: '2.7rem',
    topOffset: '1.25rem',
    lineWidth: '1.3rem',
    lineThickness: '2px',
  },
} as const;

export const typographyTokens = {
  eyebrowSize: '0.76rem',
  eyebrowTracking: '0.2rem',
  headingMaxWidth: '44rem',
  leadMaxWidth: '43rem',
  pageHeading: 'clamp(1.6rem, 4.2vw, 3.15rem)',
  pageLead: 'clamp(1rem, 1.5vw, 1.18rem)',
  sectionHeading: 'clamp(1.08rem, 2.3vw, 1.6rem)',
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
