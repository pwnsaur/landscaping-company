import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { FormData } from '@/types/contentfulTypes';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, phone, message } = req.body as FormData;

  const mailMessage = {
    from: email,
    to: process.env.GMAIL_EMAIL_ADDRESS,
    subject: 'meow meow',
    text: message,
    html: `<p>${message}</p>`,
  };

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  if (req.method === 'POST') {
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
  }
};

export default handler;
