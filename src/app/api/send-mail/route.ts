import { NextResponse } from 'next/server';

import { FormData } from '@/types/contactForm';

const nodemailer = (await import('nodemailer')).default;

type SendMailPayload = FormData & {
  recaptcha?: string;
};

const verifyRecaptcha = async (recaptchaToken: string) => {
  const params = new URLSearchParams({
    secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY || '',
    response: recaptchaToken,
  });

  const recaptchaResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      cache: 'no-store',
    }
  );

  if (!recaptchaResponse.ok) {
    return false;
  }

  const data = (await recaptchaResponse.json()) as {
    success?: boolean;
    score?: number;
  };

  return Boolean(data.success) && (data.score || 0) > 0.8;
};

export const runtime = 'nodejs';

export const POST = async (request: Request) => {
  const body = (await request.json()) as SendMailPayload;
  const { name, email, phone, message, recaptcha } = body;

  if (!recaptcha) {
    return NextResponse.json(
      {
        error: 'Missing reCAPTCHA token',
      },
      { status: 400 }
    );
  }

  const isRecaptchaValid = await verifyRecaptcha(recaptcha);

  if (!isRecaptchaValid) {
    console.log('get rekt robot');
    return NextResponse.json(
      {
        error: 'reCAPTCHA verification failed',
      },
      { status: 400 }
    );
  }

  const htmlMessage = `
  <pre>
    ${message}

    epasts: ${email}
    telefona numurs: ${phone}
  </pre>
`;

  const mailMessage = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `ziņojums no ${name}`,
    html: htmlMessage,
  };

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail(mailMessage);
    return NextResponse.json(
      {
        success: `Message delivered to ${info.accepted}`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[send-mail] Failed to send email', err);

    if (err instanceof Error) {
      return NextResponse.json(
        {
          error: `Error sending email: ${err.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
};
