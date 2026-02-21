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
import ContactForm from '@components/contactForm/ContactForm';

const ContactsPageClient = () => {
  const recaptchaKey =
    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ||
    process.env.GOOGLE_RECAPTCHA_SITE_KEY;

  return (
    <PageShell $surface='page'>
      <ContentContainer $size='wide'>
        <Hero>
          <Eyebrow>Kontakti</Eyebrow>
          <PageTitle>Pastasti par teritoriju un mes ieteiksim nakamos solus</PageTitle>
          <PageLead>
            Aizpildi formu ar situacijas aprakstu. Jo konkretaks ievads, jo
            atrak varam sagatavot precizu ieteikumu.
          </PageLead>
        </Hero>
      </ContentContainer>

      <ContentContainer $size='wide'>
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
  margin-bottom: ${({ theme }) => theme.components.contacts.heroBottom};
`;

const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: ${({ theme }) =>
    `${theme.components.contacts.infoGridLeft} ${theme.components.contacts.infoGridRight}`};
  align-items: stretch;
  gap: ${({ theme }) => theme.components.contacts.gridGap};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled(SoftPanel)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.components.contacts.panelPadding};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.components.contacts.panelPaddingCompact};
  }
`;

const InfoTitle = styled(SharedSectionTitle)``;

const InfoList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.components.contacts.listGap};
  margin-top: ${({ theme }) => theme.components.contacts.listTop};
`;

const InfoItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.components.contacts.itemGap};
  align-items: start;
`;

const ItemStep = styled.span`
  min-width: ${({ theme }) => theme.components.contacts.stepSize};
  min-height: ${({ theme }) => theme.components.contacts.stepSize};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.typography.label};
  color: ${({ theme }) => theme.colors.darkGreen};
`;

const ItemText = styled(BodyText)`
  line-height: 1.6;
`;

const InfoLinks = styled.div`
  margin-top: ${({ theme }) => theme.components.contacts.linksTop};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.components.contacts.actionGap};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }

  a {
    width: 100%;
  }
`;

const FormPanel = styled(SoftPanel)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.components.contacts.panelPadding};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.components.contacts.panelPaddingCompact};
  }
`;

const FormTitle = styled(SharedSectionTitle)``;

const FormIntro = styled(BodyText)`
  margin-top: ${({ theme }) => theme.components.contacts.formIntroTop};
  line-height: 1.6;
`;

const MissingKey = styled.p`
  margin-top: ${({ theme }) => theme.components.contacts.missingKeyTop};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.dangerBorder};
  background: ${({ theme }) => theme.colors.dangerSurface};
  color: ${({ theme }) => theme.colors.errorText};
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow-wrap: anywhere;

  code {
    font-family: monospace;
    background: ${({ theme }) => theme.colors.dangerCodeBg};
    padding: ${({ theme }) => `0.06rem ${theme.spacing.xxs}`};
  }
`;
