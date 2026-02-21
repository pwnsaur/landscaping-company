'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SquareButton from '@/components/reusables/SquareButton';
import { DisplayTitle, LeadText } from '@/components/ui/typography/primitives';
import bacgroundImageThree from '@assets/bacgroundImageThree.jpg';

const HomePageClient = () => {
  const heroRef = useRef<HTMLElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const [isScrollHintVisible, setIsScrollHintVisible] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    const layer = parallaxLayerRef.current;

    if (!hero || !layer) {
      return;
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 768px)').matches
    ) {
      return;
    }

    let rafId = 0;
    let isVisible = true;

    const updateParallax = () => {
      rafId = 0;

      if (!isVisible) {
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const travelRange = hero.offsetHeight + window.innerHeight;
      const progress = Math.min(
        Math.max((window.innerHeight - heroRect.top) / travelRange, 0),
        1
      );

      const translateY = progress * 74;
      const scale = 1.03 + progress * 0.07;
      const opacity = 1 - progress * 0.22;

      layer.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      layer.style.opacity = `${opacity}`;
    };

    const requestUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(updateParallax);
    };

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = Boolean(entry?.isIntersecting);

          if (isVisible) {
            requestUpdate();
          }
        },
        {
          threshold: 0,
          rootMargin: '220px 0px',
        }
      );

      observer.observe(hero);
    }

    requestUpdate();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const updateScrollHintVisibility = () => {
      setIsScrollHintVisible(window.scrollY < 20);
    };

    updateScrollHintVisibility();
    window.addEventListener('scroll', updateScrollHintVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updateScrollHintVisibility);
    };
  }, []);

  return (
    <Page>
      <ParallaxLayer ref={parallaxLayerRef}>
        <StyledImage
          src={bacgroundImageThree}
          alt='Brasika landscaping'
          fill
          quality={60}
          sizes='(max-width: 768px) 130vw, 116vw'
          placeholder='blur'
          priority
        />
      </ParallaxLayer>

      <Hero ref={heroRef}>
        <HeroShade />
        <HeroGlow />

        <HeroContent>
          <Eyebrow>B R A S I K A</Eyebrow>
          <Title>Ainavas, kas izskatas dabiski un kalpo ilgi</Title>
          <Lead>
            Projektejam, veidojam un kopjam teritorijas ar skaidru planu, tiru
            izpildi un minimalu troksni klienta ikdiena.
          </Lead>
          <HeroActions>
            <SquareButton destination='services' name='Pakalpojumi' />
            <SquareButton destination='projects' name='Projekti' />
          </HeroActions>
        </HeroContent>

        <ScrollHint $visible={isScrollHintVisible}>ritiniet uz leju</ScrollHint>
      </Hero>

      <Panels>
        <Panel>
          <PanelTitle>no idejas lidz gatavam darbam</PanelTitle>
          <PanelText>
            No pirmas apskates lidz pabeigtam projektam strada viena komanda.
            Tu redzi skaidru gaitu, terminu un rezultatu bez liekas
            improvizacijas.
          </PanelText>
          <SquareButton destination='services' name='Pakalpojumi' />
        </Panel>

        <Panel $accent>
          <PanelTitle>darbi, kurus vari apskatit</PanelTitle>
          <PanelText>
            Realizeti pagalmi, celi un apzalumosanas risinajumi ar dazadu
            merogu un raksturu. Skaties projektus un atrodi sev atbilstosu
            virzienu.
          </PanelText>
          <SquareButton destination='projects' name='Projekti' isInverted />
        </Panel>
      </Panels>
    </Page>
  );
};

export default HomePageClient;

const Page = styled.main`
  position: relative;
  width: 100%;
  margin-top: ${({ theme }) => `calc(${theme.layout.nav.heightDesktop} * -1)`};
  background: ${({ theme }) => theme.gradients.homePage};
  overflow: clip;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => `calc(${theme.layout.nav.heightMobile} * -1)`};
  }
`;

const Hero = styled.section`
  position: relative;
  z-index: 1;
  min-height: ${({ theme }) => theme.components.home.heroMinHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md}
    calc(
      ${({ theme }) => theme.components.home.heroBottom} +
        env(safe-area-inset-bottom)
    );

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ theme }) => theme.components.home.heroMinHeightCompact};
    padding: 0 ${({ theme }) => theme.spacing.md}
      calc(
        ${({ theme }) => theme.components.home.heroBottomCompact} +
          env(safe-area-inset-bottom)
      );
  }
`;

const ParallaxLayer = styled.div`
  position: absolute;
  inset: -6%;
  transform: translate3d(0, 0, 0) scale(1.03);
  z-index: 0;
  will-change: transform, opacity;
  transition: opacity ${({ theme }) => theme.motion.normal} linear;
  filter: saturate(0.95) contrast(1.1);
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    inset: -4%;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.gradients.heroShade};
  pointer-events: none;
`;

const HeroGlow = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  width: ${({ theme }) => theme.components.home.heroGlowWidth};
  height: ${({ theme }) => theme.components.home.heroGlowHeight};
  transform: translateX(-50%);
  background: ${({ theme }) => theme.gradients.heroGlow};
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  width: ${({ theme }) => theme.components.home.heroContentWidth};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  z-index: 2;
  padding: ${({ theme }) => theme.components.home.heroContentPadding};
  margin-bottom: clamp(0.75rem, 2.4vh, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.lineOnDarkSoft};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.gradients.heroPanel};
  backdrop-filter: blur(6px);
  box-shadow: ${({ theme }) => theme.shadows.heroPanel};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.components.home.heroContentPaddingCompact};
  }
`;

const Eyebrow = styled.p`
  letter-spacing: ${({ theme }) => theme.components.home.eyebrowTracking};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.label};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: 0.9;
`;

const Title = styled(DisplayTitle)`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.superBold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Lead = styled(LeadText)`
  max-width: 42rem;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.components.home.heroLeadSize};
  color: ${({ theme }) => theme.colors.textInverse};
`;

const HeroActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ScrollHint = styled.p<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(${({ theme }) => theme.spacing.sm} + env(safe-area-inset-bottom));
  color: ${({ theme }) => theme.colors.textInverseSoft};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.components.home.eyebrowTracking};
  font-size: ${({ theme }) => theme.components.home.scrollHintSize};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.motion.normal}
    ${({ theme }) => theme.motion.easing};
`;

const Panels = styled.section`
  width: ${({ theme }) =>
    `min(${theme.layout.container.wide}, ${theme.layout.container.compactViewport})`};
  margin: ${({ theme }) =>
    `${theme.components.home.panelsTop} auto ${theme.components.home.panelsBottom}`};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.layout.grid.gap};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) =>
      `${theme.components.home.panelsTopCompact} auto ${theme.components.home.panelsBottomCompact}`};
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.article<{ $accent?: boolean }>`
  min-height: ${({ theme }) => theme.components.home.panelMinHeight};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  border: 1px solid
    ${({ theme, $accent }) =>
      $accent ? theme.colors.lineOnDarkSoft : theme.colors.lineSoft};
  background: ${({ $accent, theme }) =>
    $accent ? theme.gradients.panelDark : theme.gradients.panelLight};
  color: ${({ $accent, theme }) =>
    $accent ? theme.colors.white : theme.colors.title};
  box-shadow: ${({ theme, $accent }) =>
    $accent ? theme.shadows.darkStrong : theme.shadows.darkSoft};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ theme }) => theme.components.home.panelMinHeightCompact};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const PanelTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.components.home.panelTitleTracking};
  font-size: ${({ theme }) => theme.components.home.panelTitleSize};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PanelText = styled.p`
  max-width: ${({ theme }) => theme.components.home.panelTextMaxWidth};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
