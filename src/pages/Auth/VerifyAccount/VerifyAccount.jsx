import React, { useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  FormHeading,
  FormLayout,
  SubmitBtn,
} from "../auth-styles";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import { ConstantsPath } from "@/constants/ConstantsPath";

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    setIsLoading(true);
    try {
      await api.post("auth/verify-account", values);
      navigate(ConstantsPath.SUCCESS, {
        state: {
          title: "Send link to your email",
          sub: "PLease check your email to get link verify your account",
        },
      });
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormHeading>Verify Account</FormHeading>
        <Form
          layout="vertical"
          name="verify_account_form"
          style={{ marginTop: "20px" }}
          onFinish={handleFinish}
          onFocus={() => setError("")}
        >
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[
              {
                type: "email",
                message: "E-mail not valid.",
              },
              {
                required: true,
                message: "Please fill in your e-mail.",
              },
            ]}
          >
            <Input type="email" placeholder="Enter your registered email" />
          </Form.Item>
          <ErrorMessage>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </ErrorMessage>
          <Form.Item style={{ paddingTop: "10px" }}>
            <SubmitBtn htmlType="submit" type="primary" loading={isLoading}>
              Submit
            </SubmitBtn>
          </Form.Item>
        </Form>
      </FormContainer>
    </FormLayout>
  );
};

export default VerifyAccount;
