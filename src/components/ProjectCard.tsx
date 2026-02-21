import CollectionCard from '@/components/cards/CollectionCard';
import { TypeProject } from '@/types/contentfulTypes';
import { getAssetImageData } from '@/utils/contentfulAsset';

const ProjectCard = ({
  project,
  priority,
}: {
  project: TypeProject;
  priority: boolean;
}) => {
  const { coverImage, slug, title, excerpt, date } = project.fields;
  const coverImageData = getAssetImageData(coverImage);
  const fallbackExcerpt =
    excerpt ||
    'Risinajums, kur funkcionalitate, kompozicija un ilgtermina uzturesana ir sabalanseta.';
  const projectYear = date ? new Date(date).getFullYear() : null;

  return (
    <CollectionCard
      href={`/projects/${slug}`}
      image={
        coverImageData
          ? {
              src: coverImageData.src,
              alt: `${title} cover`,
            }
          : undefined
      }
      priority={priority}
      meta={projectYear ? `Projekts ${projectYear}` : 'Projekts'}
      title={title}
      excerpt={fallbackExcerpt}
      actionLabel='Skatit vairak'
    />
  );
};

export default ProjectCard;
