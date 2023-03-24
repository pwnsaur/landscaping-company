import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Copyright 2023 Hackerman</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  width: 100%;
  height: 15rem;
  justify-content: center;
  align-items: center;
  margin: auto 0 0;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  /* z-index: 1; */
`;

const FooterText = styled.p`
  color: white;
`;
