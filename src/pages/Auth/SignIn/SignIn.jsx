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
  Line,
  LinkContainer,
  SubmitBtn,
} from "../auth-styles";
import { Link, useNavigate } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleConstants } from "@/constants/Constants";
import { notificationShow } from "@/utils/notificationShow";
import { useLogin } from "@/hooks/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const { loginFn, isLoginLoading } = useLogin();

  const handleFinish = (values) => {
    loginFn(
      {
        type: "email",
        body: values,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("refresh_token", data.data.refresh_token);
          navigate(ConstantsPath.MY_PAGE);
        },
        onError: (error) => {
          setErrorMsg(error.response.data.message);
        },
      }
    );
  };

  const handleGoogleSuccess = (credentialResponse) => {
    loginFn(
      {
        type: "google",
        body: { googleToken: credentialResponse.credential },
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("refresh_token", data.data.refresh_token);
          navigate(ConstantsPath.MY_PAGE);
        },
        onError: (error) => {
          setErrorMsg(error.response.data.message);
        },
      }
    );
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormHeading>Sign In</FormHeading>
        <Form
          name="signin_form"
          onFinish={handleFinish}
          onFocus={() => setErrorMsg("")}
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </Form.Item>
          <ForgotPassLink>
            <Link to={ConstantsPath.FORGOT_PASSWORD}>Forgot password?</Link>
          </ForgotPassLink>
          <ErrorMessage>
            {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          </ErrorMessage>
          <Form.Item>
            <SubmitBtn
              htmlType="submit"
              type="primary"
              loading={isLoginLoading}
            >
              Sign In
            </SubmitBtn>
          </Form.Item>
          <LinkContainer>
            Don't have an account?
            <Link to={ConstantsPath.SIGN_UP}> Sign up</Link>
          </LinkContainer>
          <Line orientation="center">Or sign in with google</Line>
          <GoogleContainer>
            <GoogleOAuthProvider clientId={GoogleConstants.clientId}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  notificationShow("error", "Google sign in unsuccessfully");
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
