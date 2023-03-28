import { useState } from 'react';
import sendEmail from '@/utils/sendEmail';

export const useEmailSubmit = (initialValues: any) => {
  const [responseMessage, setResponseMessage] = useState({
    isSuccessful: false,
    message: '',
  });

  const submitEmail = async (values: any) => {
    try {
      const req = await sendEmail(values);
      if (req.status === 250) {
        setResponseMessage({
          isSuccessful: true,
          message: 'Ziņojums nosūtīts, paldies!',
        });
      }
    } catch (e) {
      setResponseMessage({
        isSuccessful: false,
        message: 'Ziņojumu neizdevās nosūtīt.',
      });
    }
  };

  return {
    responseMessage,
    submitEmail,
  };
};
