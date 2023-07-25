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
import Loader from "@/components/Loader/Loader";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { useVerifyAccount, useResetPassword } from "@/hooks/auth";
import { notificationShow } from "@/utils/notificationShow";
import { PasswordRegex } from "@/constants/Constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { isAccountVerifying, isAccountVerified } = useVerifyAccount(
    email,
    token
  );

  const { resetPasswordFn, isResetPasswordLoading } = useResetPassword();

  const handleFinish = (values) => {
    const newPassword = values.password;
    resetPasswordFn(
      {
        email,
        password: newPassword,
      },
      {
        onSuccess: () => {
          navigate(ConstantsPath.SIGN_IN);
          notificationShow("success", "Reset password successfully");
        },
        onError: (e) => {
          setErrorMsg(e.response.data.message);
        },
      }
    );
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
                  onFocus={() => setErrorMsg("")}
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
                      () => ({
                        validator(_, value) {
                          if (!value || value.match(PasswordRegex)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "Password must be at least eight characters, at least one letter and one number."
                            )
                          );
                        },
                      }),
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
                    {errorMsg && (
                      <span style={{ color: "red" }}>{errorMsg}</span>
                    )}
                  </ErrorMessage>
                  <Form.Item style={{ paddingTop: "10px" }}>
                    <SubmitBtn
                      htmlType="submit"
                      type="primary"
                      loading={isResetPasswordLoading}
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
