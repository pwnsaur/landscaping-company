'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SquareButton from '@/components/reusables/SquareButton';
import { DisplayTitle, LeadText } from '@/components/ui/typography/primitives';
import bacgroundImageThree from '@assets/bacgroundImageThree.jpg';
import { theme } from '@/styles/theme';

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
          quality={55}
          sizes='(max-width: 768px) 112vw, 108vw'
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
            <SquareButton destination='services' name='Pakalpojumi' isInverted />
            <SquareButton destination='projects' name='Projekti' isInverted />
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
  margin-top: calc(${theme.layout.nav.heightDesktop} * -1);
  background: ${theme.gradients.homePage};
  overflow: clip;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-top: calc(${theme.layout.nav.heightMobile} * -1);
  }
`;

const Hero = styled.section`
  position: relative;
  z-index: 1;
  min-height: 122svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.spacing.md} calc(6rem + env(safe-area-inset-bottom));

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 112svh;
    padding: 0 ${theme.spacing.md} calc(3.4rem + env(safe-area-inset-bottom));
  }
`;

const ParallaxLayer = styled.div`
  position: absolute;
  inset: -6%;
  transform: translate3d(0, 0, 0) scale(1.03);
  z-index: 0;
  will-change: transform, opacity;
  transition: opacity ${theme.motion.normal} linear;
  filter: saturate(0.95) contrast(1.1);
  pointer-events: none;

  @media (max-width: ${theme.breakpoints.md}) {
    inset: -4%;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: ${theme.gradients.heroShade};
  pointer-events: none;
`;

const HeroGlow = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  width: min(72rem, 88vw);
  height: min(32rem, 56vw);
  transform: translateX(-50%);
  background: ${theme.gradients.heroGlow};
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  width: min(58rem, 92vw);
  color: ${theme.colors.white};
  text-align: center;
  z-index: 2;
  padding: 2.5rem 1.75rem;
  margin-bottom: clamp(0.75rem, 2.4vh, 2rem);
  border: 1px solid ${theme.colors.lineOnDarkSoft};
  border-radius: ${theme.radii.lg};
  background: ${theme.gradients.heroPanel};
  backdrop-filter: blur(6px);
  box-shadow: ${theme.shadows.heroPanel};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.6rem 1.1rem;
  }
`;

const Eyebrow = styled.p`
  letter-spacing: 0.18rem;
  text-transform: uppercase;
  font-size: ${theme.typography.label};
  margin-bottom: 0.85rem;
  opacity: 0.9;
`;

const Title = styled(DisplayTitle)`
  text-transform: uppercase;
  font-weight: ${theme.fontWeights.superBold};
  color: ${theme.colors.white};
  margin-bottom: 1.25rem;
`;

const Lead = styled(LeadText)`
  max-width: 42rem;
  margin: 0 auto;
  font-size: clamp(1rem, 1.6vw, 1.28rem);
  color: ${theme.colors.textInverse};
`;

const HeroActions = styled.div`
  margin-top: 1.65rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ScrollHint = styled.p<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(${theme.spacing.sm} + env(safe-area-inset-bottom));
  color: ${theme.colors.textInverseSoft};
  text-transform: uppercase;
  letter-spacing: 0.18rem;
  font-size: 0.66rem;
  z-index: ${theme.zIndex.overlay};
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${theme.motion.normal} ${theme.motion.easing};
`;

const Panels = styled.section`
  width: min(${theme.layout.container.wide}, ${theme.layout.container.compactViewport});
  margin: 2.6rem auto 3.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    margin: 1.8rem auto 2.4rem;
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.article<{ $accent?: boolean }>`
  min-height: 19rem;
  padding: 2.6rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  border: 1px solid
    ${({ $accent }) => ($accent ? theme.colors.lineOnDarkSoft : theme.colors.lineSoft)};
  border-radius: ${theme.radii.xl};
  background: ${({ $accent }) => ($accent ? theme.gradients.panelDark : theme.gradients.panelLight)};
  color: ${({ $accent }) => ($accent ? theme.colors.white : theme.colors.title)};
  box-shadow: ${({ $accent }) => ($accent ? theme.shadows.darkStrong : theme.shadows.darkSoft)};

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 15rem;
    padding: 1.9rem;
  }
`;

const PanelTitle = styled.h2`
  letter-spacing: 0.06rem;
  font-size: clamp(1.2rem, 2vw, 1.72rem);
  font-weight: ${theme.fontWeights.bold};
  color: inherit;
  margin-bottom: 1.1rem;
`;

const PanelText = styled.p`
  max-width: 42ch;
  line-height: 1.6;
  margin-bottom: 2rem;
`;
