import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const PageHeader = styled.header`
  text-align: center;
`;

export const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: ${theme.typography.eyebrowTracking};
  font-size: ${theme.typography.label};
  color: ${theme.colors.textSubtle};
  margin-bottom: ${theme.spacing.sm};
`;

export const PageTitle = styled.h1`
  max-width: ${theme.typography.headingMaxWidth};
  margin: 0 auto;
  text-transform: uppercase;
  line-height: 1.14;
  font-size: ${theme.typography.heading};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

export const PageLead = styled.p`
  max-width: ${theme.typography.leadMaxWidth};
  margin: ${theme.spacing.md} auto 0;
  font-size: ${theme.typography.bodyLarge};
  line-height: 1.7;
  color: ${theme.colors.text};
`;

export const SectionTitle = styled.h2`
  text-transform: uppercase;
  font-size: ${theme.typography.sectionHeading};
  letter-spacing: 0.04rem;
`;

export const SectionText = styled.p`
  line-height: 1.6;
`;

export const BodyText = styled.p`
  line-height: 1.65;
  color: ${theme.colors.text};
`;

export const FeatureTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.95rem;
  color: ${theme.colors.darkGreen};
`;

export const DisplayTitle = styled.h1`
  line-height: 1.12;
  font-size: clamp(1.55rem, 4vw, 3rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

export const LeadText = styled.p`
  line-height: 1.7;
  font-size: clamp(1rem, 1.45vw, 1.15rem);
  color: ${theme.colors.text};
`;
