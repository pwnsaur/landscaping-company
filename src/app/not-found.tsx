import styled from 'styled-components';

import { ActionLink } from '@/components/ui/actions/primitives';
import {
  ContentContainer,
  PageShell,
} from '@/components/ui/layout/primitives';
import { DisplayTitle, LeadText } from '@/components/ui/typography/primitives';
import { theme } from '@/styles/theme';

const NotFound = () => {
  return (
    <PageShell $surface='detail' $variant='detail'>
      <ContentContainer $size='narrow'>
        <Container>
          <Title>404</Title>
          <Text>Lapa netika atrasta.</Text>
          <BackLink href='/' $variant='outline'>
            Uz sākumu
          </BackLink>
        </Container>
      </ContentContainer>
    </PageShell>
  );
};

export default NotFound;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  min-height: 50vh;
  border: 1px solid ${theme.semantic.border.subtle};
  background: ${theme.gradients.panelLight};
  box-shadow: ${theme.shadows.panel};
`;

const Title = styled(DisplayTitle)`
  margin-top: ${theme.spacing.md};
`;

const Text = styled(LeadText)`
  font-size: ${theme.fontSizes.large};
`;

const BackLink = styled(ActionLink)`
  margin-bottom: ${theme.spacing.md};
`;
