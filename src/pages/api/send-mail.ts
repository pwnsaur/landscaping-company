import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { FormData } from '@/types/contactForm';

const nodemailer = (await import('nodemailer')).default;

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

const mailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, message, recaptcha } = req.body as FormData & {
    recaptcha: string;
  };

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const isRecaptchaValid = await verifyRecaptcha(recaptcha);

  if (!isRecaptchaValid) {
    console.log('get rekt robot');
    res.status(400).json({
      error: 'reCAPTCHA verification failed',
    });
    return;
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
    res.status(250).json({
      success: `Message delivered to ${info.accepted}`,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: `Error sending email: ${err.message}`,
        details: err,
      });
    } else {
      res.status(500).json({
        error: 'An unexpected error occurred',
      });
    }
  }
};

export default mailHandler;
