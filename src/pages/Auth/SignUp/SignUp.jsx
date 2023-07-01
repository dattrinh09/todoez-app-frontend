import React, { useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  FormHeading,
  FormLayout,
  LinkContainer,
  SubmitBtn,
} from "../auth-styles";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { PhoneNumberFormat } from "@/constants/Constants";
import { useRegister } from "@/hooks/auth";

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const { registerFn, isRegisterLoading } = useRegister();

  const handleFinish = (values) => {
    registerFn(values, {
      onSuccess: () => {
        // navigate(ConstantsPath.SUCCESS, {
        //   state: {
        //     title: "Create account successfully",
        //     sub: "Please check your e-mail to verify",
        //   },
        // });
      },
      onError: (error) => {
        setErrorMsg(error.response.data.message);
      },
    });
  };

  return (
    <FormLayout>
      <FormContainer>
        <FormHeading>Sign Up</FormHeading>
        <Form
          layout="vertical"
          name="signup_form"
          onFinish={handleFinish}
          scrollToFirstError
        >
          <Form.Item
            name="fullname"
            label="Fullname"
            rules={[
              {
                required: true,
                message: "Please fill in your username.",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-Mail"
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
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please fill in your phone number.",
              },
              () => ({
                validator(_, value) {
                  if (!value || value.match(PhoneNumberFormat)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Phone number not valid"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please fill in your password.",
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
            {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          </ErrorMessage>
          <Form.Item style={{ paddingTop: "10px" }}>
            <SubmitBtn
              htmlType="submit"
              type="primary"
              loading={isRegisterLoading}
            >
              Sign Up
            </SubmitBtn>
          </Form.Item>
          <LinkContainer>
            Already have an account?
            <Link to={ConstantsPath.SIGN_IN}> Sign in</Link>
          </LinkContainer>
        </Form>
      </FormContainer>
    </FormLayout>
  );
};

export default SignUp;
