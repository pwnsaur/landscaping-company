import type { Metadata } from 'next';

import ServiceCard from '@/components/ServiceCard';
import ListingPageTemplate from '@/components/ui/page/ListingPageTemplate';
import { getServices } from '@/lib/contentfulData';

export const metadata: Metadata = {
  title: 'Pakalpojumi',
  description: 'Pakalpojumi',
};

export const revalidate = 900;

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <ListingPageTemplate
      eyebrow='Pakalpojumi'
      title='Ainavu darbi no ieceres lidz gatavam rezultatam'
      lead='Planojam, veidojam un sakartojam teritorijas ta, lai rezultats butu estetisks, ilgtspejigs un erti kopjams ikdiena.'
      items={services}
      renderItem={(service, index) => (
        <ServiceCard
          key={service.sys.id}
          service={service}
          priority={index < 2}
        />
      )}
      emptyStateText='Paslaik pakalpojumu sadala tiek papildinata. Uzraksti mums, un ieteiksim piemerotako risinajumu tavai teritorijai.'
      cta={{
        title: 'Vajag konsultaciju pirms projekta sakuma?',
        text: 'Uzraksti, un vienosimies par labako risinajumu tavai teritorijai.',
        href: '/contacts',
        label: 'Sazinaties',
      }}
    />
  );
};

export default ServicesPage;
