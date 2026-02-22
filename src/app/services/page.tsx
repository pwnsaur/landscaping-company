import type { Metadata } from 'next';

import ServiceCard from '@/components/ServiceCard';
import ListingPageTemplate from '@/components/ui/page/ListingPageTemplate';
import { getServices } from '@/lib/contentfulData';

export const metadata: Metadata = {
  title: 'Pakalpojumi',
  description: 'Ainavu pakalpojumi — teritoriju plānošana, apstādījumi, segumi un mazā arhitektūra.',
};

export const revalidate = 900;

const ServicesPage = async () => {
  const services = await getServices();

  return (
    <ListingPageTemplate
      eyebrow='Pakalpojumi'
      title='Ainavu darbi no ieceres līdz gatavam rezultātam'
      lead='Plānojam, veidojam un sakārtojam teritorijas tā, lai rezultāts būtu estētisks, ilgtspējīgs un ērti kopjams ikdienā.'
      items={services}
      renderItem={(service, index) => (
        <ServiceCard
          key={service.sys.id}
          service={service}
          priority={index === 0}
        />
      )}
      emptyStateText='Pašlaik pakalpojumu sadaļa tiek papildināta. Uzraksti mums, un ieteiksim piemērotāko risinājumu tavai teritorijai.'
      cta={{
        title: 'Vajag konsultāciju pirms projekta sākuma?',
        text: 'Uzraksti, un vienosimies par labāko risinājumu tavai teritorijai.',
        href: '/contacts',
        label: 'Sazinaties',
      }}
    />
  );
};

export default ServicesPage;
