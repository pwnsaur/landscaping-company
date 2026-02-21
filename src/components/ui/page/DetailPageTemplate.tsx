import Image from 'next/image';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import {
  ContentContainer,
  PageShell,
  PlainSection,
} from '@/components/ui/layout/primitives';
import { MediaFrame, SoftPanel } from '@/components/ui/surfaces/primitives';
import {
  PageLead,
  PageTitle,
  SectionTitle as SectionHeading,
} from '@/components/ui/typography/primitives';
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
          <PlainSection $mt='2.2rem'>
            <SectionTitle>{section.title}</SectionTitle>
            {section.content}
          </PlainSection>
        </ContentContainer>
      ))}
    </PageShell>
  );
};

export default DetailPageTemplate;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1.8rem;
`;

const BackLink = styled(ActionLink).attrs({
  $variant: 'outline',
  $size: 'sm',
})`
  min-width: 10.4rem;
`;

const Title = styled(PageTitle)`
  margin-top: 1rem;
`;

const Lead = styled(PageLead)`
  margin-top: 0.8rem;
  max-width: 56ch;
`;

const Meta = styled.p`
  margin-top: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.75rem;
  color: ${theme.colors.textSubtle};
`;

const ContentGrid = styled.section<{ $hasMedia: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasMedia }) =>
    $hasMedia ? 'minmax(0, 0.9fr) minmax(0, 1.1fr)' : '1fr'};
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled(MediaFrame)`
  min-height: 24rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 16rem;
  }
`;

const CoverImageElement = styled(Image)`
  object-fit: cover;
`;

const Description = styled(SoftPanel).attrs({
  as: 'article',
})`
  padding: 1.4rem 1.5rem;
  color: ${theme.colors.text};
  line-height: 1.7;

  h2,
  h3 {
    margin: 1.1rem 0 0.65rem;
    color: ${theme.colors.title};
    text-transform: uppercase;
    letter-spacing: 0.04rem;
  }

  p {
    margin: 0.75rem 0;
  }

  ul,
  ol {
    margin: 0.8rem 0 0.8rem 1.2rem;
  }
`;

const SectionTitle = styled(SectionHeading)`
  letter-spacing: 0.08rem;
  margin-bottom: 0.8rem;
`;
