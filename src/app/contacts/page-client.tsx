'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styled from 'styled-components';

import ContactForm from '@components/contactForm/ContactForm';

const ContactsPageClient = () => {
  return (
    <Container>
      <Title>Sazinieties ar mums!</Title>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}>
        <ContactForm />
      </GoogleReCaptchaProvider>
    </Container>
  );
};

export default ContactsPageClient;

const Container = styled.div`
  text-align: center;
  padding: 5vh 0 5vh;
  max-width: ${({ theme }) => theme.width.narrow};
  width: 80%;

  ${({ theme }) =>
    theme.isMobile &&
    `
      width: 90%;
      margin-top: 2rem;
  `}
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-size: ${({ theme }) => `
    clamp(${theme.normalClamp.min},
      ${theme.normalClamp.preferred},
      ${theme.normalClamp.max})
  `};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 3rem 0;
`;
