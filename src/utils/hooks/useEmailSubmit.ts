import { useState } from 'react';
import sendEmail from '@/utils/sendEmail';
import { FormData } from '@/types/contentfulTypes';

const useEmailSubmit = () => {
  const [responseMessage, setResponseMessage] = useState({
    isSuccessful: false,
    message: '',
  });

  const submitEmail = async (formData: FormData) => {
    try {
      const req = await sendEmail(formData);
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

export default useEmailSubmit;
