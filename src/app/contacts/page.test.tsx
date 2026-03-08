import { resolveRecaptchaSiteKey } from '@/app/contacts/page';

describe('resolveRecaptchaSiteKey', () => {
  const originalPublicKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;
  const originalServerKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;
  const resetEnv = () => {
    Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY');
    Reflect.deleteProperty(process.env, 'GOOGLE_RECAPTCHA_SITE_KEY');
  };

  beforeEach(() => {
    resetEnv();
  });

  afterAll(() => {
    if (originalPublicKey === undefined) {
      Reflect.deleteProperty(process.env, 'NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY');
    } else {
      process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY = originalPublicKey;
    }

    if (originalServerKey === undefined) {
      Reflect.deleteProperty(process.env, 'GOOGLE_RECAPTCHA_SITE_KEY');
    } else {
      process.env.GOOGLE_RECAPTCHA_SITE_KEY = originalServerKey;
    }
  });

  test('prefers the public key when both env vars are present', () => {
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY = 'public-key';
    process.env.GOOGLE_RECAPTCHA_SITE_KEY = 'server-key';

    expect(resolveRecaptchaSiteKey()).toBe('public-key');
  });

  test('falls back to the server key when the public key is missing', () => {
    process.env.GOOGLE_RECAPTCHA_SITE_KEY = 'server-key';

    expect(resolveRecaptchaSiteKey()).toBe('server-key');
  });

  test('returns undefined when neither env var is configured', () => {
    expect(resolveRecaptchaSiteKey()).toBeUndefined();
  });
});
