import styled from 'styled-components';

import { theme } from '@/styles/theme';

export const PageHeader = styled.header`
  text-align: center;
`;

export const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: ${theme.typography.eyebrowTracking};
  font-size: ${theme.typography.label};
  color: ${theme.semantic.text.subtle};
  margin-bottom: ${theme.layout.rhythm.tight};
`;

export const PageTitle = styled.h1`
  max-width: ${theme.typography.headingMaxWidth};
  margin: 0 auto;
  text-transform: uppercase;
  line-height: ${theme.typography.lineHeightTight};
  font-size: ${theme.typography.heading};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

export const PageLead = styled.p`
  max-width: ${theme.typography.leadMaxWidth};
  margin: ${theme.layout.rhythm.related} auto 0;
  font-size: ${theme.typography.bodyLarge};
  line-height: ${theme.typography.lineHeightRelaxed};
  color: ${theme.semantic.text.primary};
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.sectionHeading};
  font-weight: ${theme.fontWeights.bold};
  letter-spacing: ${theme.typography.trackingTight};
  line-height: ${theme.typography.lineHeightHeading};
`;

export const SectionText = styled.p`
  line-height: ${theme.typography.lineHeightBody};
  color: ${theme.semantic.text.primary};
`;

export const BodyText = styled.p`
  line-height: ${theme.typography.lineHeightBody};
  color: ${theme.semantic.text.primary};
`;

export const FeatureTitle = styled.h3`
  letter-spacing: ${theme.typography.trackingTight};
  font-size: ${theme.typography.featureTitle};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.darkGreen};
  line-height: ${theme.typography.lineHeightHeading};
`;

export const DisplayTitle = styled.h1`
  line-height: ${theme.typography.lineHeightTight};
  font-size: ${theme.typography.display};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

export const LeadText = styled.p`
  line-height: ${theme.typography.lineHeightRelaxed};
  font-size: ${theme.typography.lead};
  color: ${theme.semantic.text.primary};
`;
