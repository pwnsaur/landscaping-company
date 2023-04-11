import { NextApiRequest, NextApiResponse } from 'next';
import { FormData } from '@/types/contentfulTypes';
// import nodemailer from 'nodemailer';
const nodemailer = (await import('nodemailer')).default;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, message } = req.body as FormData;

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(405).end(`Method ${req.method} Not Allowed`);
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

  let transporter = nodemailer.createTransport({
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
  } catch (err: any) {
    res.status(500).json({
      error: `Error sending email: ${err.message}`,
      details: err,
    });
  }
};

export default handler;
