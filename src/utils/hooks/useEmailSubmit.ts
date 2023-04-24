import { FormData } from '@/types/contentfulTypes';
import { useState } from 'react';
import sendEmail from '@/utils/sendEmail';

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
        return true;
      }
    } catch (e) {
      setResponseMessage({
        isSuccessful: false,
        message: 'Ziņojumu neizdevās nosūtīt.',
      });
    }
    return false;
  };

  return {
    responseMessage,
    submitEmail,
  };
};

export default useEmailSubmit;
