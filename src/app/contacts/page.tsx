import type { Metadata } from 'next';

import ContactsPageClient from '@/app/contacts/page-client';

export const metadata: Metadata = {
  title: 'Kontakti',
  description: 'Sazinieties ar Brasika ainavu komandu. Aprakstiet situāciju un sagatavosim ieteicamo darbu plānu.',
};

const ContactsPage = () => {
  return <ContactsPageClient />;
};

export default ContactsPage;
