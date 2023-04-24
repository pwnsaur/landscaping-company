import styled from 'styled-components';
import SqareButton from '@/components/reusables/SquareButton';

const Footer = () => {
  return (
    <FooterContainer>
      <SqareButton name='Sazināties' destination='contacts' isInverted />
      <FooterText>Copyright 2023 Hackerman</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15rem;
  justify-content: center;
  align-items: center;
  margin: auto 0 0;
  padding-top: 5rem;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  /* z-index: 1; */
`;

const FooterText = styled.p`
  color: white;
  margin-bottom: 1rem;
  margin-top: auto;
`;
