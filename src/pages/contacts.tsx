import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import ContactForm from '@/components/contactForm/ContactForm';
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
        <Title>Sazinieties ar mums!</Title>
        <ContactForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};

export default Contact;

const Container = styled.div`
  text-align: center;
  padding: 5vh 0 5vh;
  max-width: 25rem;
  width: 80%;

  @media screen and (max-width: 40em) {
    width: 90%;
  }
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 500;
  margin: 1rem 0;
`;
