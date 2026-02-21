import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import {
  ContactFormApiResponse,
  ContactFormPayload,
} from '@/types/contactForm';
import {
  escapeHtml,
  hasContactFormErrors,
  normalizeContactFormFields,
  validateContactFormFields,
} from '@/utils/contactFormValidation';

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
};

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_ACTION = 'contact_form_submit';
const RECAPTCHA_MIN_SCORE = 0.5;
const MIN_FORM_FILL_TIME_MS = 1200;

export const runtime = 'nodejs';

const jsonResponse = (payload: ContactFormApiResponse, status: number) => {
  return NextResponse.json(payload, { status });
};

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) {
    return undefined;
  }

  return forwardedFor.split(',')[0]?.trim();
};

const verifyRecaptcha = async (recaptchaToken: string, clientIp?: string) => {
  const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error('[send-mail] Missing GOOGLE_RECAPTCHA_SECRET_KEY');
    return false;
  }

  const params = new URLSearchParams({
    secret,
    response: recaptchaToken,
  });

  if (clientIp) {
    params.set('remoteip', clientIp);
  }

  const recaptchaResponse = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
    cache: 'no-store',
  });

  if (!recaptchaResponse.ok) {
    return false;
  }

  const data = (await recaptchaResponse.json()) as RecaptchaVerifyResponse;

  return (
    Boolean(data.success) &&
    (data.score ?? 0) >= RECAPTCHA_MIN_SCORE &&
    data.action === RECAPTCHA_ACTION
  );
};

const asEmailHtml = ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `
    <div>
      <p><strong>Vārds:</strong> ${safeName}</p>
      <p><strong>E-pasts:</strong> ${safeEmail}</p>
      <p><strong>Tālrunis:</strong> ${safePhone}</p>
      <p><strong>Ziņojums:</strong></p>
      <p>${safeMessage}</p>
    </div>
  `;
};

const asEmailText = ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  return [
    `Vārds: ${name}`,
    `E-pasts: ${email}`,
    `Tālrunis: ${phone}`,
    '',
    'Ziņojums:',
    message,
  ].join('\n');
};

export const POST = async (request: Request) => {
  let payload: Partial<ContactFormPayload>;

  try {
    payload = (await request.json()) as Partial<ContactFormPayload>;
  } catch {
    return jsonResponse(
      {
        success: false,
        message: 'Nederīgs pieprasījuma formāts.',
      },
      400
    );
  }

  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return jsonResponse(
      {
        success: false,
        message: 'Pieprasījumu neizdevās apstrādāt.',
      },
      400
    );
  }

  if (
    typeof payload.formStartedAt === 'number' &&
    Date.now() - payload.formStartedAt < MIN_FORM_FILL_TIME_MS
  ) {
    return jsonResponse(
      {
        success: false,
        message: 'Pieprasījumu neizdevās apstrādāt.',
      },
      400
    );
  }

  const normalizedFields = normalizeContactFormFields(payload);
  const validationErrors = validateContactFormFields(normalizedFields);

  if (hasContactFormErrors(validationErrors)) {
    return jsonResponse(
      {
        success: false,
        message: 'Lūdzu pārbaudi ievadīto informāciju.',
        errors: validationErrors,
      },
      422
    );
  }

  if (!payload.recaptcha || typeof payload.recaptcha !== 'string') {
    return jsonResponse(
      {
        success: false,
        message: 'Drošības pārbaude neizdevās. Mēģini vēlreiz.',
      },
      400
    );
  }

  const recaptchaIsValid = await verifyRecaptcha(
    payload.recaptcha,
    getClientIp(request)
  );

  if (!recaptchaIsValid) {
    return jsonResponse(
      {
        success: false,
        message: 'Drošības pārbaude neizdevās. Mēģini vēlreiz.',
      },
      400
    );
  }

  const { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;

  if (!EMAIL_ADDRESS || !EMAIL_PASSWORD || !EMAIL_SERVICE) {
    console.error('[send-mail] Missing email env configuration');
    return jsonResponse(
      {
        success: false,
        message: 'Servera konfigurācijas kļūda. Lūdzu mēģini vēlāk.',
      },
      500
    );
  }

  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Kontaktforma" <${EMAIL_ADDRESS}>`,
      to: EMAIL_ADDRESS,
      replyTo: normalizedFields.email,
      subject: `Jauns pieprasījums no ${normalizedFields.name}`,
      text: asEmailText(normalizedFields),
      html: asEmailHtml(normalizedFields),
    });

    return jsonResponse(
      {
        success: true,
        message: 'Ziņojums nosūtīts. Sazināsimies ar jums tuvākajā laikā.',
      },
      200
    );
  } catch (error) {
    console.error('[send-mail] Failed to send email', error);

    return jsonResponse(
      {
        success: false,
        message: 'Ziņojumu neizdevās nosūtīt. Mēģini vēlreiz.',
      },
      500
    );
  }
};
