import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styled from 'styled-components';

import ServiceCard from '@/components/ServiceCard';
import { getServiceBySlug, getServices } from '@/lib/contentfulData';
import { theme } from '@/styles/theme';
import { getAssetImageData } from '@/utils/contentfulAsset';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Pakalpojums',
  description: 'Pakalpojums',
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

  return (
    <PageShell>
      <Header>
        <BackLink href='/services'>Atpakaļ uz pakalpojumiem</BackLink>
        <Title>{title}</Title>
        {excerpt && <Lead>{excerpt}</Lead>}
      </Header>

      <ContentGrid>
        {coverImageData && (
          <Media>
            <CoverImage
              src={coverImageData.src}
              alt={`${title} cover`}
              fill
              priority
              quality={70}
              sizes='(max-width: 900px) 92vw, 42vw'
            />
          </Media>
        )}

        <Description>{documentToReactComponents(descriptionDocument)}</Description>
      </ContentGrid>

      {relatedServices.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Citi pakalpojumi</RelatedTitle>
          <RelatedGrid>
            {relatedServices.map((relatedService) => (
              <ServiceCard
                key={relatedService.sys.id}
                service={relatedService}
                priority={false}
              />
            ))}
          </RelatedGrid>
        </RelatedSection>
      )}
    </PageShell>
  );
};

export default ServicePage;

const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.2rem 1.2rem 5rem;
  background: ${theme.gradients.pageDetail};

  @media (max-width: ${theme.breakpoints.md}) {
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
  color: ${theme.colors.darkGreen};
  border-bottom: 1px solid ${theme.colors.lineStrong};
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

const ContentGrid = styled.section`
  width: min(70rem, 96vw);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 1.2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  min-height: 24rem;
  overflow: hidden;
  border: 1px solid ${theme.colors.lineSoft};
  box-shadow: ${theme.shadows.raised};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 16rem;
  }
`;

const CoverImage = styled(Image)`
  object-fit: cover;
`;

const Description = styled.article`
  padding: 1.4rem 1.5rem;
  border: 1px solid ${theme.colors.lineSoft};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.panel};
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
