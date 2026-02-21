import { useState } from 'react';

import { ContactFormFields } from '@/types/contactForm';
import { isContactFormFieldName } from '@/utils/contactFormValidation';

const blankForm: ContactFormFields = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormFields>(blankForm);

  type HandleChangeFn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  const handleChange: HandleChangeFn = (e) => {
    const { id, value } = e.target;
    if (!isContactFormFieldName(id)) {
      return;
    }

    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const resetForm = () => {
    setFormData(blankForm);
  };

  return { formData, handleChange, resetForm };
};

export default useContactForm;
