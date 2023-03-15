import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import ContactForm from '@/components/ContactForm';
import { FormData } from '@/types/contentfulTypes';

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

      <Container>
        <ContactForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};

export default Contact;

const Container = styled.div`
  text-align: center;
  padding: 5vh 0 5vh;
`;
