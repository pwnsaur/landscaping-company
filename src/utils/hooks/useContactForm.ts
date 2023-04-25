import { useState } from 'react';
import { FormData } from '@/types/contentfulTypes';

const blankForm: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const useContactForm = () => {
  const [formData, setformData] = useState<FormData>(blankForm);

  type HandleChangeFn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  const handleChange: HandleChangeFn = (e) => {
    const { id, value } = e.target;
    setformData((prevState) => ({ ...prevState, [id]: value }));
  };

  const resetForm = () => {
    setformData(blankForm);
  };

  return { formData, handleChange, resetForm };
};

export default useContactForm;
