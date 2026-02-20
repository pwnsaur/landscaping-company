import axios from 'axios';
import { NextResponse } from 'next/server';

import { FormData } from '@/types/contactForm';

const nodemailer = (await import('nodemailer')).default;

type SendMailPayload = FormData & {
  recaptcha?: string;
};

const verifyRecaptcha = async (recaptchaToken: string) => {
  const recaptchaResponse = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    {},
    {
      params: {
        secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    }
  );

  return recaptchaResponse.data.success && recaptchaResponse.data.score > 0.8;
};

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
      { status: 250 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        {
          error: `Error sending email: ${err.message}`,
          details: err,
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
