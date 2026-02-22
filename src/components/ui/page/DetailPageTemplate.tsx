import Image from 'next/image';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import {
  ContentContainer,
  PageShell,
  PlainSection,
  SectionStack,
} from '@/components/ui/layout/primitives';
import { MediaFrame, SoftPanel } from '@/components/ui/surfaces/primitives';
import {
  PageLead,
  PageTitle,
  SectionTitle as SectionHeading,
} from '@/components/ui/typography/primitives';
import { media } from '@/styles/media';
import { theme } from '@/styles/theme';

type CoverImage = {
  src: string;
  alt: string;
};

type DetailSection = {
  title: string;
  content: ReactNode;
};

type DetailPageTemplateProps = {
  backHref: string;
  backLabel: string;
  title: string;
  lead?: string;
  meta?: string;
  coverImage?: CoverImage;
  body: ReactNode;
  sections?: DetailSection[];
};

const DetailPageTemplate = ({
  backHref,
  backLabel,
  title,
  lead,
  meta,
  coverImage,
  body,
  sections = [],
}: DetailPageTemplateProps) => {
  return (
    <PageShell $surface='detail' $variant='detail'>
      <TemplateStack $gap={theme.layout.rhythm.section}>
        <ContentContainer $size='content'>
          <Header>
            <BackLink href={backHref}>{backLabel}</BackLink>
            <Title>{title}</Title>
            {lead && <Lead>{lead}</Lead>}
            {meta && <Meta>{meta}</Meta>}
          </Header>
        </ContentContainer>

        <ContentContainer $size='content'>
          <ContentGrid $hasMedia={Boolean(coverImage)}>
            {coverImage && (
              <Media>
                <CoverImageElement
                  src={coverImage.src}
                  alt={coverImage.alt}
                  fill
                  quality={70}
                  priority
                  sizes='(max-width: 900px) 92vw, 42vw'
                />
              </Media>
            )}
            <Description>{body}</Description>
          </ContentGrid>
        </ContentContainer>

        {sections.map((section) => (
          <ContentContainer key={section.title} $size='content'>
            <PlainSection>
              <SectionTitle>{section.title}</SectionTitle>
              {section.content}
            </PlainSection>
          </ContentContainer>
        ))}
      </TemplateStack>
    </PageShell>
  );
};

export default DetailPageTemplate;

const Header = styled.header`
  text-align: center;
  margin-bottom: 0;
`;

const TemplateStack = styled(SectionStack)`
  width: 100%;
`;

const BackLink = styled(ActionLink).attrs({
  $variant: 'outline',
  $size: 'sm',
})`
  min-width: 10.4rem;
`;

const Title = styled(PageTitle)`
  margin-top: 1.1rem;
`;

const Lead = styled(PageLead)`
  margin-top: 1.1rem;
  max-width: 56ch;
`;

const Meta = styled.p`
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.75rem;
  color: ${theme.semantic.text.subtle};
`;

const ContentGrid = styled.section<{ $hasMedia: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasMedia }) =>
    $hasMedia ? 'minmax(0, 0.9fr) minmax(0, 1.1fr)' : '1fr'};
  gap: 1.5rem;

  ${media.down('tablet')`
    grid-template-columns: 1fr;
  `}
`;

const Media = styled(MediaFrame)`
  min-height: 24rem;

  ${media.down('tablet')`
    min-height: 16rem;
  `}
`;

const CoverImageElement = styled(Image)`
  object-fit: cover;
`;

const Description = styled(SoftPanel).attrs({
  as: 'article',
})`
  padding: 2rem;
  color: ${theme.semantic.text.primary};
  line-height: ${theme.typography.lineHeightRelaxed};

  h2,
  h3 {
    margin: 1.3rem 0 0.75rem;
    color: ${theme.colors.title};
    letter-spacing: 0.04rem;
  }

  p {
    margin: 1rem 0;
  }

  ul,
  ol {
    margin: 1.1rem 0 1.1rem 1.2rem;
  }
`;

const SectionTitle = styled(SectionHeading)`
  letter-spacing: 0.08rem;
  margin-bottom: 1.1rem;
`;
