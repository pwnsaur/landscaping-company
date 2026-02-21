import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import {
  CardGrid,
  CenteredPanel,
  ContentContainer,
  DarkCtaPanel,
  PageShell,
  SectionStack,
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
      <TemplateStack $gap={theme.components.listing.sectionGap}>
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

        <CtaContainer $size='wide'>
          <DarkCtaPanel>
            <CtaTitle>{cta.title}</CtaTitle>
            <CtaText>{cta.text}</CtaText>
            <CtaLink href={cta.href} $variant='inverse'>
              {cta.label}
            </CtaLink>
          </DarkCtaPanel>
        </CtaContainer>
      </TemplateStack>
    </PageShell>
  );
};

export default ListingPageTemplate;

const HeaderBlock = styled(PageHeader)`
  margin-bottom: 0;
`;

const TemplateStack = styled(SectionStack)`
  width: 100%;
`;

const CtaContainer = styled(ContentContainer)`
  margin-top: ${theme.components.listing.cardsToCtaTop};
`;

const CtaTitle = styled(SectionTitle)`
  color: ${theme.semantic.text.onAccent};
`;

const CtaText = styled(SectionText)`
  margin: ${theme.layout.rhythm.tight} auto ${theme.layout.rhythm.related};
  max-width: ${theme.components.listing.ctaTextMaxWidth};
  color: ${theme.colors.textInverseSoft};
`;

const CtaLink = styled(ActionLink)`
  min-width: ${theme.components.listing.ctaLinkMinWidth};
`;
