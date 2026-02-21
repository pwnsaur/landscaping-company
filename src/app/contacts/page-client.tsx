'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import { ContentContainer, PageShell } from '@/components/ui/layout/primitives';
import { SoftPanel } from '@/components/ui/surfaces/primitives';
import {
  BodyText,
  Eyebrow,
  PageHeader,
  PageLead,
  PageTitle,
  SectionTitle as SharedSectionTitle,
} from '@/components/ui/typography/primitives';
import { theme } from '@/styles/theme';
import ContactForm from '@components/contactForm/ContactForm';

const ContactsPageClient = () => {
  const recaptchaKey =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ||
    process.env.GOOGLE_RECAPTCHA_SITE_KEY;

  return (
    <PageShell $surface='page'>
      <ContentContainer $size='content'>
        <Hero>
          <Eyebrow>Kontakti</Eyebrow>
          <PageTitle>Pastasti par teritoriju un mes ieteiksim nakamos solus</PageTitle>
          <PageLead>
            Aizpildi formu ar situacijas aprakstu. Jo konkretaks ievads, jo
            atrak varam sagatavot precizu ieteikumu.
          </PageLead>
        </Hero>
      </ContentContainer>

      <ContentContainer $size='content'>
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
              <ActionLink href='/services' $variant='outline' $size='sm'>
                Skatit pakalpojumus
              </ActionLink>
              <ActionLink href='/projects' $variant='outline' $size='sm'>
                Skatit projektus
              </ActionLink>
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
                Trūkst reCAPTCHA atslēga
                (NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY vai
                GOOGLE_RECAPTCHA_SITE_KEY), tādēļ forma šobrīd nav aktīva.
              </MissingKey>
            )}
          </FormPanel>
        </ContentGrid>
      </ContentContainer>
    </PageShell>
  );
};

export default ContactsPageClient;

const Hero = styled(PageHeader)`
  margin-bottom: ${theme.spacing.xl};
`;

const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: ${({ theme }) =>
    `${theme.components.contacts.infoGridLeft} ${theme.components.contacts.infoGridRight}`};
  gap: ${theme.layout.grid.gap};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled(SoftPanel)``;

const InfoTitle = styled(SharedSectionTitle)``;

const InfoList = styled.ul`
  display: grid;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const InfoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${theme.spacing.sm};
  align-items: start;
`;

const ItemStep = styled.span`
  min-width: 2rem;
  text-align: center;
  padding: ${theme.spacing.xxs};
  border: 1px solid ${theme.colors.lineStrong};
  font-size: ${theme.typography.label};
  color: ${theme.colors.darkGreen};
`;

const ItemText = styled(BodyText)`
  line-height: 1.6;
`;

const InfoLinks = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`;

const FormPanel = styled(SoftPanel)``;

const FormTitle = styled(SharedSectionTitle)``;

const FormIntro = styled(BodyText)`
  margin-top: ${theme.spacing.sm};
  line-height: 1.6;
`;

const MissingKey = styled.p`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.dangerBorder};
  background: ${theme.colors.dangerSurface};
  color: ${theme.colors.errorText};
  line-height: 1.5;
  font-size: 0.93rem;
  border-radius: ${theme.radii.md};
  overflow-wrap: anywhere;

  code {
    font-family: monospace;
    background: ${theme.colors.dangerCodeBg};
    padding: 0.06rem ${theme.spacing.xxs};
  }
`;
