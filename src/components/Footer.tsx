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
  margin-top: auto;
  display: flex;
  justify-content: center;
  margin: 20px;
  margin-top: auto;
`;

const FooterText = styled.p`
  color: #555;
`;
