import { useState } from 'react';
import { FormData } from '@/types/contentfulTypes';

const useContactForm = () => {
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setValues((prevState) => ({ ...prevState, [id]: value }));
  };

  return { values, handleChange };
};

export default useContactForm;
