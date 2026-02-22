import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ServiceCard from '@/components/ServiceCard';
import { CardGrid } from '@/components/ui/layout/primitives';
import DetailPageTemplate from '@/components/ui/page/DetailPageTemplate';
import { getServiceBySlug, getServices } from '@/lib/contentfulData';
import { getAssetImageData } from '@/utils/contentfulAsset';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Pakalpojums',
  description: 'Ainavu pakalpojums — teritorijas plānošana, apstādījumi un labiekārtošana.',
};

export const revalidate = 900;
export const dynamicParams = true;

export const generateStaticParams = async () => {
  const services = await getServices();

  return services
    .map((service) => service.fields.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }));
};

const ServicePage = async ({ params }: Props) => {
  const { slug } = await params;
  const [service, services] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);

  if (!service) {
    notFound();
  }

  const { coverImage, description, title, excerpt } = service.fields;
  const descriptionDocument = description as Document;
  const coverImageData = getAssetImageData(coverImage);
  const relatedServices = services
    .filter((item) => item.fields.slug !== slug)
    .slice(0, 3);

  const sections =
    relatedServices.length > 0
      ? [
          {
            title: 'Citi pakalpojumi',
            content: (
              <CardGrid>
                {relatedServices.map((relatedService) => (
                  <ServiceCard
                    key={relatedService.sys.id}
                    service={relatedService}
                    priority={false}
                  />
                ))}
              </CardGrid>
            ),
          },
        ]
      : [];

  return (
    <DetailPageTemplate
      backHref='/services'
      backLabel='Atpakaļ uz pakalpojumiem'
      title={title}
      lead={excerpt}
      coverImage={
        coverImageData
          ? {
              src: coverImageData.src,
              alt: `${title} cover`,
            }
          : undefined
      }
      body={documentToReactComponents(descriptionDocument)}
      sections={sections}
    />
  );
};

export default ServicePage;
