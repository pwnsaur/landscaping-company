import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

import ProjectCard from '@/components/ProjectCard';
import { getProjectBySlug, getProjects } from '@/lib/contentfulData';
import { theme } from '@/styles/theme';
import { getAssetImageData, getResolvedAssets } from '@/utils/contentfulAsset';
import ImageContainer from '@components/ImageContainer';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Projekts',
  description: 'Projekts',
};

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const { content, coverImage, title, images, excerpt, date } = project.fields;
  const contentDocument = content as Document;
  const coverImageData = getAssetImageData(coverImage);
  const projectImages = getResolvedAssets(images);
  const relatedProjects = projects
    .filter((item) => item.fields.slug !== slug)
    .slice(0, 3);
  const projectDate = date ? new Date(date).toLocaleDateString('en-GB') : null;

  return (
    <PageShell>
      <Header>
        <BackLink href='/projects'>Back to projects</BackLink>
        <Title>{title}</Title>
        {excerpt && <Lead>{excerpt}</Lead>}
        {projectDate && <Meta>{projectDate}</Meta>}
      </Header>

      <ContentGrid>
        {coverImageData && (
          <Media>
            <CoverImage
              src={coverImageData.src}
              alt={`${title} cover`}
              fill
              quality={75}
              priority
              sizes='(max-width: 900px) 92vw, 42vw'
            />
          </Media>
        )}
        <Description>{documentToReactComponents(contentDocument)}</Description>
      </ContentGrid>

      {projectImages.length > 0 && (
        <GallerySection>
          <GalleryTitle>Project gallery</GalleryTitle>
          <ImageContainer images={projectImages} />
        </GallerySection>
      )}

      {relatedProjects.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Related projects</RelatedTitle>
          <RelatedGrid>
            {relatedProjects.map((relatedProject) => (
              <ProjectCard
                key={relatedProject.sys.id}
                project={relatedProject}
                priority={false}
              />
            ))}
          </RelatedGrid>
        </RelatedSection>
      )}
    </PageShell>
  );
};

export default ProjectPage;

const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.2rem 1.2rem 5rem;
  background:
    radial-gradient(circle at 85% 0%, rgba(57, 65, 47, 0.14), transparent 32%),
    linear-gradient(180deg, #f4f4f4 0%, #ededed 100%);

  @media (max-width: 768px) {
    padding: 5.3rem 1rem 4rem;
  }
`;

const Header = styled.header`
  width: min(70rem, 96vw);
  text-align: center;
  margin-bottom: 1.8rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.78rem;
  color: rgba(33, 65, 42, 0.86);
  border-bottom: 1px solid rgba(33, 65, 42, 0.35);
  padding-bottom: 0.2rem;
`;

const Title = styled.h1`
  margin-top: 1rem;
  text-transform: uppercase;
  line-height: 1.15;
  font-size: clamp(1.6rem, 4vw, 3rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

const Lead = styled.p`
  margin: 0.8rem auto 0;
  max-width: 56ch;
  line-height: 1.6;
  color: ${theme.colors.text};
  font-size: clamp(1rem, 1.4vw, 1.15rem);
`;

const Meta = styled.p`
  margin-top: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.75rem;
  color: rgba(57, 65, 47, 0.72);
`;

const ContentGrid = styled.section`
  width: min(70rem, 96vw);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  min-height: 24rem;
  overflow: hidden;
  border: 1px solid rgba(57, 65, 47, 0.15);
  box-shadow: 0 20px 46px rgba(22, 33, 25, 0.12);

  @media (max-width: 900px) {
    min-height: 16rem;
  }
`;

const CoverImage = styled(Image)`
  object-fit: cover;
`;

const Description = styled.article`
  padding: 1.4rem 1.5rem;
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, #f4f4f4 100%);
  box-shadow: 0 18px 38px rgba(21, 31, 24, 0.08);
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

const GallerySection = styled.section`
  width: min(70rem, 96vw);
  margin-top: 2.2rem;
`;

const GalleryTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
  color: ${theme.colors.title};
  margin-bottom: 0.8rem;
`;

const RelatedSection = styled.section`
  width: min(70rem, 96vw);
  margin-top: 2.2rem;
`;

const RelatedTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: clamp(1.1rem, 2.2vw, 1.7rem);
  color: ${theme.colors.title};
  margin-bottom: 0.8rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  gap: 1rem;
`;
