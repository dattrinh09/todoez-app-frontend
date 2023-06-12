import React, { useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  FormHeading,
  FormLayout,
  SubmitBtn,
} from "../auth-styles";
import { Form, Input, Result } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { notificationShow } from "@/utils/notificationShow";
import useVerifyAccount from "@/hooks/auth/useVerifyAccount";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { isAccountVerifying, isAccountVerified } = useVerifyAccount(
    email,
    token
  );

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFinish = async (values) => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/auth/reset-password/${email}`,
        { password: values.password }
      );
      notificationShow("success", "Reset password successfully");
      navigate(ConstantsPath.SIGN_IN);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout>
      <FormContainer>
        {isAccountVerifying ? (
          <Loader />
        ) : (
          <>
            {isAccountVerified ? (
              <>
                <FormHeading>Reset Password</FormHeading>
                <Form
                  layout="vertical"
                  name="forgot_password_form"
                  onFinish={handleFinish}
                  onFocus={() => setError("")}
                  style={{ marginTop: "20px" }}
                >
                  <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please fill in your new password.",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password.",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match."
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <ErrorMessage>
                    {error && <span style={{ color: "red" }}>{error}</span>}
                  </ErrorMessage>
                  <Form.Item style={{ paddingTop: "10px" }}>
                    <SubmitBtn
                      htmlType="submit"
                      type="primary"
                      loading={isLoading}
                    >
                      Submit
                    </SubmitBtn>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <Result
                status="error"
                title="Verify e-mail failed!"
                subTitle="This link is not valid. Please try on another link."
                extra={
                  <Link to={ConstantsPath.SIGN_IN}>
                    <SubmitBtn type="primary">Sign In</SubmitBtn>
                  </Link>
                }
              />
            )}
          </>
        )}
      </FormContainer>
    </FormLayout>
  );
};

export default ResetPassword;
