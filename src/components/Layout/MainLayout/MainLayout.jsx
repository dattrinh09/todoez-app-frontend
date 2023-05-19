import React from "react";
import Header from "../../Header/Header";
import { MainBody } from "./main-layout-styles";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <MainBody>
        {children}
      </MainBody>
    </>
  );
};

export default MainLayout;
