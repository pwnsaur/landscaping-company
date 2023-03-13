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
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: auto 0 0;
  background-color: darkgreen;
  /* position: relative;
  bottom: 0; */
  z-index: 1;
`;

const FooterText = styled.p`
  color: white;
`;
