import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import {
  ContactFormApiErrorCode,
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

type MailError = Error & {
  code?: string;
  responseCode?: number;
  response?: string;
  command?: string;
};

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_ACTION = 'contact_form_submit';
const RECAPTCHA_MIN_SCORE = 0.5;
const MIN_FORM_FILL_TIME_MS = 1200;
const MAX_FORM_FILL_TIME_MS = 2 * 60 * 60 * 1000;

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

  try {
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
  } catch (error) {
    console.error('[send-mail] Failed to verify recaptcha', error);
    return false;
  }
};

const resolveMailConfig = () => {
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

  const user = readEnv('EMAIL_ADDRESS');
  const pass = readEnv('EMAIL_PASSWORD');
  const rawService = readEnv('EMAIL_SERVICE')?.toLowerCase();
  const service =
    rawService === 'google' || rawService === 'googlemail'
      ? 'gmail'
      : rawService;
  const to = readEnv('EMAIL_TO') || user;
  const from = readEnv('EMAIL_FROM') || user;
  const isGmailTransport = service === 'gmail';
  const normalizedPass =
    pass && isGmailTransport ? pass.replace(/\s+/g, '') : pass;

  if (!user || !normalizedPass || !service || !to || !from) {
    return null;
  }

  return {
    user,
    pass: normalizedPass,
    service,
    to,
    from,
  };
};

const mapMailError = (
  error: unknown
): { code: ContactFormApiErrorCode; message: string } => {
  const typed = error as MailError;
  const code = typed?.code || '';
  const responseCode = typed?.responseCode;
  const response = typed?.response || '';

  if (
    code === 'EAUTH' &&
    (responseCode === 534 ||
      response.toLowerCase().includes('application-specific password required'))
  ) {
    return {
      code: 'mail_app_password_required',
      message:
        'Google kontam nepieciešama App Password parole (nevis parastā konta parole).',
    };
  }

  if (code === 'EAUTH' || responseCode === 535 || responseCode === 534) {
    return {
      code: 'mail_auth_failed',
      message:
        'E-pasta servera autorizācija neizdevās. Lūdzu pārbaudi Vercel e-pasta iestatījumus.',
    };
  }

  if (
    code === 'ENOTFOUND' ||
    code === 'ECONNECTION' ||
    code === 'ETIMEDOUT' ||
    code === 'ESOCKET'
  ) {
    return {
      code: 'mail_transport_unavailable',
      message:
        'Neizdevās sasniegt e-pasta serveri. Lūdzu mēģini vēlreiz pēc brīža.',
    };
  }

  return {
    code: 'mail_send_failed',
    message: 'Ziņojumu neizdevās nosūtīt. Mēģini vēlreiz.',
  };
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
    typeof payload.formStartedAt !== 'number' ||
    !Number.isFinite(payload.formStartedAt)
  ) {
    return jsonResponse(
      {
        success: false,
        message: 'Pieprasījumu neizdevās apstrādāt.',
      },
      400
    );
  }

  const formFillTimeMs = Date.now() - payload.formStartedAt;
  if (
    formFillTimeMs < MIN_FORM_FILL_TIME_MS ||
    formFillTimeMs > MAX_FORM_FILL_TIME_MS
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

  const mailConfig = resolveMailConfig();
  if (!mailConfig) {
    console.error('[send-mail] Missing email env configuration');
    return jsonResponse(
      {
        success: false,
        message:
          'Servera e-pasta konfigurācija nav pilnīga. Lūdzu mēģini vēlāk.',
        code: 'mail_config_missing',
      },
      500
    );
  }

  const transportBase = {
    auth: {
      user: mailConfig.user,
      pass: mailConfig.pass,
    },
  };

  const transporter = nodemailer.createTransport({
    service: mailConfig.service,
    ...transportBase,
  });

  try {
    await transporter.sendMail({
      from: `"Kontaktforma" <${mailConfig.from}>`,
      to: mailConfig.to,
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
  } catch (error: unknown) {
    const mapped = mapMailError(error);
    const typedError = error as MailError;
    console.error('[send-mail] Failed to send email', {
      mappedCode: mapped.code,
      code: typedError?.code,
      responseCode: typedError?.responseCode,
      command: typedError?.command,
      response: typedError?.response,
      message: typedError?.message,
    });

    return jsonResponse(
      {
        success: false,
        message: mapped.message,
        code: mapped.code,
      },
      500
    );
  }
};
