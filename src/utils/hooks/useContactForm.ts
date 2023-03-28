import { useState } from 'react';
import { FormData } from '@/types/contentfulTypes';

const blankForm: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const useContactForm = () => {
  const [values, setValues] = useState<FormData>(blankForm);

  type HandleChangeFn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  const handleChange: HandleChangeFn = (e) => {
    const { id, value } = e.target;
    setValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const reset = () => {
    setValues(blankForm);
  };

  return { values, handleChange, reset };
};

export default useContactForm;
