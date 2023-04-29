import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React, { useState } from "react";
import {
  ErrorMessage,
  ForgotPassLink,
  FormContainer,
  FormHeading,
  FormLayout,
  GoogleContainer,
  LinkContainer,
  SubmitBtn,
} from "../auth-styles";
import { Link, useNavigate } from "react-router-dom";
import { ConstantsPath } from "../../../constants/ConstantsPath";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleConstants } from "../../../constants/Constants";
import { notificationShow } from "../../../utils/notificationShow";

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signin",
        values
      );
      localStorage.setItem("token", res.data.access_token);
      navigate(ConstantsPath.PROFILE);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/google/signin",
        { googleToken: credentialResponse.credential }
      );
      localStorage.setItem("token", res.data.access_token);
      navigate(ConstantsPath.PROFILE);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormHeading>Sign In</FormHeading>
        <Form
          name="signin_form"
          onFinish={handleFinish}
          onFocus={() => setError("")}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
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
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill in your password.",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <ForgotPassLink>
            <Link to={ConstantsPath.FORGOT_PASSWORD}>Forgot password?</Link>
          </ForgotPassLink>
          <ErrorMessage>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </ErrorMessage>
          <Form.Item>
            <SubmitBtn htmlType="submit" type="primary">
              Sign In
            </SubmitBtn>
          </Form.Item>
          <LinkContainer>
            Don't have an account?
            <Link to={ConstantsPath.SIGN_UP}> Sign up</Link>
          </LinkContainer>
          <GoogleContainer>
            <GoogleOAuthProvider clientId={GoogleConstants.clientId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  notificationShow("error", "Google sign in unsuccessfully", "Something went wrong");
                }}
              />
            </GoogleOAuthProvider>
          </GoogleContainer>
        </Form>
      </FormContainer>
    </FormLayout>
  );
};

export default SignIn;
