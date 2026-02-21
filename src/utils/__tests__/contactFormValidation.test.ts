import {
  CONTACT_FORM_LIMITS,
  hasContactFormErrors,
  normalizeContactFormFields,
  validateContactFormFields,
} from '@/utils/contactFormValidation';

describe('contactFormValidation', () => {
  test('normalizes whitespace and lowercases email', () => {
    const normalized = normalizeContactFormFields({
      name: '  Janis   Berzins ',
      email: '  TEST@MAIL.LV  ',
      phone: ' +371 22 22 22 22 ',
      message: '  Sveiki! \n\n   Vajag   konsultaciju.   ',
    });

    expect(normalized).toEqual({
      name: 'Janis Berzins',
      email: 'test@mail.lv',
      phone: '+371 22 22 22 22',
      message: 'Sveiki! Vajag konsultaciju.',
    });
  });

  test('returns validation errors for invalid payload', () => {
    const errors = validateContactFormFields({
      name: 'A',
      email: 'broken-email',
      phone: 'abc',
      message: 'short',
    });

    expect(hasContactFormErrors(errors)).toBe(true);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.message).toBeTruthy();
  });

  test('accepts valid payload', () => {
    const errors = validateContactFormFields({
      name: 'Janis Berzins',
      email: 'janis@example.com',
      phone: '+37129123456',
      message: 'Labdien! Vēlos pieteikt konsultāciju savam pagalmam.',
    });

    expect(hasContactFormErrors(errors)).toBe(false);
    expect(errors).toEqual({});
  });

  test('caps message by configured limit', () => {
    const errors = validateContactFormFields({
      name: 'Janis Berzins',
      email: 'janis@example.com',
      phone: '+37129123456',
      message: 'a'.repeat(CONTACT_FORM_LIMITS.messageMax + 1),
    });

    expect(errors.message).toBeTruthy();
  });
});
