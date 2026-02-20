import type { Metadata } from 'next';

import ContactsPageClient from '@/app/contacts/page-client';

export const metadata: Metadata = {
  title: 'Kontakti',
  description: 'Kontakti',
};

const ContactsPage = () => {
  return <ContactsPageClient />;
};

export default ContactsPage;
