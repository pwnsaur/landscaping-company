import type { Metadata } from 'next';

import ContactsPageClient from '@/app/contacts/page-client';

export const metadata: Metadata = {
  title: 'Kontakti',
  description: 'Sazinieties ar Brasika ainavu komandu. Aprakstiet situāciju un sagatavosim ieteicamo darbu plānu.',
};

export const resolveRecaptchaSiteKey = () => {
  const readEnv = (...keys: string[]) => {
    for (const key of keys) {
      const rawValue = process.env[key];
      if (typeof rawValue !== 'string') {
        continue;
      }

      const value = rawValue.trim();
      if (value) {
        return value;
      }
    }

    return undefined;
  };

  return readEnv(
    'NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY',
    'GOOGLE_RECAPTCHA_SITE_KEY'
  );
};

const ContactsPage = () => {
  return <ContactsPageClient recaptchaKey={resolveRecaptchaSiteKey()} />;
};

export default ContactsPage;
