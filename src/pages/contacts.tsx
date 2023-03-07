import { NextSeo } from 'next-seo';
import ContactForm from '@/components/ContactForm';
import { FormData } from 'types';

const Contact = () => {
  const handleSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <>
      <NextSeo
        title='Kontakti'
        titleTemplate='Brasika | %s'
        description='Kontakti'
      />

      <div className='container'>
        <ContactForm onSubmit={handleSubmit} />
        <style jsx>{`
          .container {
            text-align: center;
            padding: 5vh 0 5vh;
          }
        `}</style>
      </div>
    </>
  );
};

export default Contact;
