import React from "react";
import Header from "@/components/Header/Header";
import { MainBody } from "./main-layout-styles";
import { useSelector } from "react-redux";
import { userSelector } from "@/stores/selectors";
import Footer from "@/components/Footer/Footer";

const MainLayout = ({ children }) => {
  const { userInfo } = useSelector(userSelector);
  return (
    <>
      <Header info={userInfo ? userInfo : null} />
      <MainBody>
        {children}
      </MainBody>
      <Footer/>
    </>
  );
};

export default MainLayout;
