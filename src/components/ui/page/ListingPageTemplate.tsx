import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import {
  CardGrid,
  CenteredPanel,
  ContentContainer,
  DarkCtaPanel,
  PageShell,
  PlainSection,
} from '@/components/ui/layout/primitives';
import {
  Eyebrow,
  PageHeader,
  PageLead,
  PageTitle,
  SectionText,
  SectionTitle,
} from '@/components/ui/typography/primitives';
import { theme } from '@/styles/theme';

type CtaConfig = {
  title: string;
  text: string;
  href: string;
  label: string;
};

type ListingPageTemplateProps<T> = {
  eyebrow: string;
  title: string;
  lead: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyStateText: string;
  cta: CtaConfig;
};

const ListingPageTemplate = <T,>({
  eyebrow,
  title,
  lead,
  items,
  renderItem,
  emptyStateText,
  cta,
}: ListingPageTemplateProps<T>) => {
  return (
    <PageShell $surface='page' $variant='listing'>
      <ContentContainer $size='content' $viewport='compact'>
        <HeaderBlock>
          <Eyebrow>{eyebrow}</Eyebrow>
          <PageTitle>{title}</PageTitle>
          <PageLead>{lead}</PageLead>
        </HeaderBlock>
      </ContentContainer>

      {items.length > 0 ? (
        <ContentContainer $size='wide'>
          <CardGrid>{items.map(renderItem)}</CardGrid>
        </ContentContainer>
      ) : (
        <ContentContainer $size='narrow'>
          <CenteredPanel>{emptyStateText}</CenteredPanel>
        </ContentContainer>
      )}

      <ContentContainer $size='wide'>
        <PlainSection $mt={theme.components.listing.ctaTop}>
          <DarkCtaPanel>
            <CtaTitle>{cta.title}</CtaTitle>
            <CtaText>{cta.text}</CtaText>
            <CtaLink href={cta.href} $variant='inverse'>
              {cta.label}
            </CtaLink>
          </DarkCtaPanel>
        </PlainSection>
      </ContentContainer>
    </PageShell>
  );
};

export default ListingPageTemplate;

const HeaderBlock = styled(PageHeader)`
  margin-bottom: ${theme.components.listing.headerBottom};
`;

const CtaTitle = styled(SectionTitle)`
  color: ${theme.semantic.text.onAccent};
`;

const CtaText = styled(SectionText)`
  margin: ${theme.spacing.sm} auto ${theme.spacing.lg};
  max-width: ${theme.components.listing.ctaTextMaxWidth};
  color: ${theme.colors.textInverseSoft};
`;

const CtaLink = styled(ActionLink)`
  min-width: ${theme.components.listing.ctaLinkMinWidth};
`;
