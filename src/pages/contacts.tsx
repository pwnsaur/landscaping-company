import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ContactForm from '@components/contactForm/ContactForm';

const Contact = () => {
  return (
    <>
      <NextSeo
        title='Kontakti'
        titleTemplate='Brasika | %s'
        description='Kontakti'
      />

      <Container>
        <Title>Sazinieties ar mums!</Title>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
        >
          <ContactForm />
        </GoogleReCaptchaProvider>
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

  ${({ theme }) =>
    theme.isMobile &&
    `
      width: 90%;
  `}
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-weight: 500;
  margin: 1rem 0;
`;
