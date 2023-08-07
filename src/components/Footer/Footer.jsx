import React from "react";
import { Container, CopyrightInfo, FooterLayout } from "./footer-styles";

const Footer = () => {
  return (
    <FooterLayout>
      <Container>
        <CopyrightInfo>Copyright 2023 &copy; TodoEZ</CopyrightInfo>
      </Container>
    </FooterLayout>
  );
};

export default Footer;
