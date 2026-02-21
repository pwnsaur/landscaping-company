import CollectionCard from '@/components/cards/CollectionCard';
import { TypeService } from '@/types/contentfulTypes';
import { getAssetImageData } from '@/utils/contentfulAsset';

const ServiceCard = ({
  service,
  priority,
}: {
  service: TypeService;
  priority: boolean;
}) => {
  const { coverImage, slug, title, excerpt } = service.fields;
  const coverImageData = getAssetImageData(coverImage);
  const serviceExcerpt =
    excerpt ||
    'Praktisks un uzturams risinajums, pielagots teritorijai un ikdienas lietojumam.';

  return (
    <CollectionCard
      href={`/services/${slug}`}
      image={
        coverImageData
          ? {
              src: coverImageData.src,
              alt: `${title} attēls`,
            }
          : undefined
      }
      priority={priority}
      meta='Pakalpojums'
      title={title}
      excerpt={serviceExcerpt}
      actionLabel='Skatīt vairāk'
    />
  );
};

export default ServiceCard;
