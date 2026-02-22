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
  min-width: ${theme.components.detail.backMinWidth};
`;

const Title = styled(PageTitle)`
  margin-top: ${theme.components.detail.titleTop};
`;

const Lead = styled(PageLead)`
  margin-top: ${theme.components.detail.leadTop};
  max-width: 56ch;
`;

const Meta = styled.p`
  margin-top: ${theme.components.detail.metaTop};
  text-transform: uppercase;
  letter-spacing: ${theme.components.detail.metaTracking};
  font-size: ${theme.components.detail.metaSize};
  color: ${theme.semantic.text.subtle};
`;

const ContentGrid = styled.section<{ $hasMedia: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasMedia }) =>
    $hasMedia ? 'minmax(0, 0.9fr) minmax(0, 1.1fr)' : '1fr'};
  gap: ${theme.components.detail.gridGap};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled(MediaFrame)`
  min-height: ${theme.components.detail.mediaMinHeight};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: ${theme.components.detail.mediaMinHeightCompact};
  }
`;

const CoverImageElement = styled(Image)`
  object-fit: cover;
`;

const Description = styled(SoftPanel).attrs({
  as: 'article',
})`
  padding: ${theme.components.detail.descriptionPadding};
  color: ${theme.semantic.text.primary};
  line-height: ${theme.typography.lineHeightRelaxed};

  h2,
  h3 {
    margin: ${theme.components.detail.descriptionHeadingTop} 0
      ${theme.components.detail.descriptionHeadingBottom};
    color: ${theme.colors.title};
    letter-spacing: ${theme.components.detail.descriptionHeadingTracking};
  }

  p {
    margin: ${theme.components.detail.paragraphSpacing} 0;
  }

  ul,
  ol {
    margin: ${theme.components.detail.listVerticalSpacing} 0
      ${theme.components.detail.listVerticalSpacing}
      ${theme.components.detail.listIndent};
  }
`;

const SectionTitle = styled(SectionHeading)`
  letter-spacing: ${theme.components.detail.sectionTitleTracking};
  margin-bottom: ${theme.components.detail.sectionTitleBottom};
`;
