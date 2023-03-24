import { useState } from 'react';
import { FormData } from '@/types/contentfulTypes';

type HandleChangeFn = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

const useContactForm = () => {
  const [values, setValues] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange: HandleChangeFn = (e) => {
    const { id, value } = e.target;
    setValues((prevState) => ({ ...prevState, [id]: value }));
  };

  return { values, handleChange };
};

export default useContactForm;
