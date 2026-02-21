import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import ImageContainer from '@/components/ImageContainer';
import ProjectCard from '@/components/ProjectCard';
import { CardGrid } from '@/components/ui/layout/primitives';
import DetailPageTemplate from '@/components/ui/page/DetailPageTemplate';
import { getProjectBySlug, getProjects } from '@/lib/contentfulData';
import { getAssetImageData, getResolvedAssets } from '@/utils/contentfulAsset';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Projekts',
  description: 'Projekts',
};

export const revalidate = 900;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const projects = await getProjects();

  return projects
    .map((project) => project.fields.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }));
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

  const sections: { title: string; content: ReactNode }[] = [];

  if (projectImages.length > 0) {
    sections.push({
      title: 'Project gallery',
      content: <ImageContainer images={projectImages} />,
    });
  }

  if (relatedProjects.length > 0) {
    sections.push({
      title: 'Related projects',
      content: (
        <CardGrid>
          {relatedProjects.map((relatedProject) => (
            <ProjectCard
              key={relatedProject.sys.id}
              project={relatedProject}
              priority={false}
            />
          ))}
        </CardGrid>
      ),
    });
  }

  return (
    <DetailPageTemplate
      backHref='/projects'
      backLabel='Back to projects'
      title={title}
      lead={excerpt}
      meta={projectDate || undefined}
      coverImage={
        coverImageData
          ? {
              src: coverImageData.src,
              alt: `${title} cover`,
            }
          : undefined
      }
      body={documentToReactComponents(contentDocument)}
      sections={sections}
    />
  );
};

export default ProjectPage;
