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
  justify-content: center;
  margin: auto 0 20px;
`;

const FooterText = styled.p`
  color: #555;
`;
