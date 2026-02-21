import {
  ContactFormApiResponse,
  ContactFormErrors,
  ContactFormPayload,
} from '@/types/contactForm';
import sendEmail from '@/utils/sendEmail';

type SubmitResult = {
  isSuccessful: boolean;
  message: string;
  errors?: ContactFormErrors;
};

const REQUEST_TIMEOUT_MS = 15_000;

const useEmailSubmit = () => {
  const submitEmail = async (formData: ContactFormPayload): Promise<SubmitResult> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const req = await sendEmail(formData, controller.signal);
      const body = (await req.json().catch(() => null)) as
        | ContactFormApiResponse
        | null;

      if (req.ok && body?.success) {
        return {
          isSuccessful: true,
          message: body.message || 'Ziņojums nosūtīts, paldies!',
        };
      }

      return {
        isSuccessful: false,
        message: body?.message || 'Ziņojumu neizdevās nosūtīt.',
        errors: body?.errors,
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          isSuccessful: false,
          message: 'Pieprasījums aizņēma pārāk ilgu laiku. Mēģini vēlreiz.',
        };
      }

      return {
        isSuccessful: false,
        message: 'Ziņojumu neizdevās nosūtīt. Mēģini vēlreiz.',
      };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return {
    submitEmail,
  };
};

export default useEmailSubmit;
