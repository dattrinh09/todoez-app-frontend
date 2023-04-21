import { Result } from "antd";
import React from "react";
import { FormContainer, FormLayout } from "../auth-styles";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  return (
    <FormLayout>
      <FormContainer>
        <Result
          status={location.state ? "success" : "404"}
          title={location.state ? location.state.title : "No title"}
          subTitle={location.state ? location.state.sub : "No message"}
        />
      </FormContainer>
    </FormLayout>
  );
};

export default SuccessPage;
