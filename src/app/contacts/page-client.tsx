'use client';

import Link from 'next/link';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styled from 'styled-components';

import { theme } from '@/styles/theme';
import ContactForm from '@components/contactForm/ContactForm';

const ContactsPageClient = () => {
  const recaptchaKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY;

  return (
    <PageShell>
      <Hero>
        <Eyebrow>Kontakti</Eyebrow>
        <Title>Pastasti par teritoriju un mes ieteiksim nakamos solus</Title>
        <Lead>
          Aizpildi formu ar situacijas aprakstu. Jo konkretaks ievads, jo
          atrak varam sagatavot precizu ieteikumu.
        </Lead>
      </Hero>

      <ContentGrid>
        <InfoPanel>
          <InfoTitle>Ka notiek sadarbiba</InfoTitle>
          <InfoList>
            <InfoItem>
              <ItemStep>01</ItemStep>
              <ItemText>Saņemam pieprasījumu un iepazīstam situāciju.</ItemText>
            </InfoItem>
            <InfoItem>
              <ItemStep>02</ItemStep>
              <ItemText>
                Sazināmies ar ieteikto risinājuma virzienu un darbu secību.
              </ItemText>
            </InfoItem>
            <InfoItem>
              <ItemStep>03</ItemStep>
              <ItemText>
                Vienojamies par nākamo soli: konsultāciju vai projekta sākumu.
              </ItemText>
            </InfoItem>
          </InfoList>
          <InfoLinks>
            <InfoLink href='/services'>Skatit pakalpojumus</InfoLink>
            <InfoLink href='/projects'>Skatit projektus</InfoLink>
          </InfoLinks>
        </InfoPanel>

        <FormPanel>
          <FormTitle>Nosuti zinojumu</FormTitle>
          <FormIntro>
            Atbildam iespejami atri darba laika. Forma izmanto reCAPTCHA
            aizsardzibu pret spamu.
          </FormIntro>
          {recaptchaKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
              <ContactForm />
            </GoogleReCaptchaProvider>
          ) : (
            <MissingKey>
              Trūkst GOOGLE_RECAPTCHA_SITE_KEY, tādēļ forma šobrīd nav aktīva.
            </MissingKey>
          )}
        </FormPanel>
      </ContentGrid>
    </PageShell>
  );
};

export default ContactsPageClient;

const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.5rem 1.2rem 6rem;
  background:
    radial-gradient(circle at 14% 0%, rgba(33, 65, 42, 0.18), transparent 35%),
    radial-gradient(circle at 86% 14%, rgba(57, 65, 47, 0.12), transparent 33%),
    linear-gradient(180deg, #f3f3f3 0%, #ededed 100%);

  @media (max-width: 768px) {
    padding: 5.5rem 1rem 4.5rem;
  }
`;

const Hero = styled.section`
  width: min(72rem, 96vw);
  text-align: center;
  margin-bottom: 2rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.76rem;
  color: rgba(57, 65, 47, 0.72);
  margin-bottom: 0.7rem;
`;

const Title = styled.h1`
  max-width: 44rem;
  margin: 0 auto;
  text-transform: uppercase;
  line-height: 1.14;
  font-size: clamp(1.55rem, 4.2vw, 3.05rem);
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.title};
`;

const Lead = styled.p`
  max-width: 43rem;
  margin: 1.1rem auto 0;
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.7;
  color: ${theme.colors.text};
`;

const ContentGrid = styled.section`
  width: min(72rem, 96vw);
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
  gap: 1rem;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled.section`
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.94) 0%, #f1f1f1 100%);
  padding: 1.45rem 1.35rem;
  box-shadow: 0 16px 36px rgba(22, 33, 25, 0.09);
`;

const InfoTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: clamp(1.02rem, 2.1vw, 1.45rem);
  color: ${theme.colors.title};
`;

const InfoList = styled.ul`
  display: grid;
  gap: 0.7rem;
  margin-top: 1rem;
`;

const InfoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  align-items: start;
`;

const ItemStep = styled.span`
  min-width: 2rem;
  text-align: center;
  padding: 0.18rem 0.25rem;
  border: 1px solid rgba(33, 65, 42, 0.32);
  font-size: 0.73rem;
  color: ${theme.colors.darkGreen};
`;

const ItemText = styled.p`
  line-height: 1.6;
  color: ${theme.colors.text};
`;

const InfoLinks = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const InfoLink = styled(Link)`
  display: inline-block;
  padding: 0.62rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: 0.8rem;
  border: 1px solid rgba(33, 65, 42, 0.4);
  color: ${theme.colors.darkGreen};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(33, 65, 42, 0.08);
  }
`;

const FormPanel = styled.section`
  border: 1px solid rgba(57, 65, 47, 0.16);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, #f4f4f4 100%);
  box-shadow: 0 18px 38px rgba(21, 31, 24, 0.08);
  padding: 1.45rem 1.35rem;
`;

const FormTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-size: clamp(1.05rem, 2.1vw, 1.5rem);
  color: ${theme.colors.title};
`;

const FormIntro = styled.p`
  margin-top: 0.65rem;
  line-height: 1.6;
  color: ${theme.colors.text};
`;

const MissingKey = styled.p`
  margin-top: 1rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid rgba(255, 51, 51, 0.3);
  background: rgba(255, 51, 51, 0.08);
  color: #8e2020;
  line-height: 1.5;
  font-size: 0.93rem;
  border-radius: 0.35rem;
  overflow-wrap: anywhere;
  code {
    font-family: monospace;
    background: rgba(255, 255, 255, 0.7);
    padding: 0.06rem 0.25rem;
  }
`;
