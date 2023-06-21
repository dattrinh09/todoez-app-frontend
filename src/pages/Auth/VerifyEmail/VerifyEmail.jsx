import React from "react";
import { FormContainer, FormLayout, SubmitBtn } from "../auth-styles";
import { Link, useSearchParams } from "react-router-dom";
import { Result } from "antd";
import { ConstantsPath } from "@/constants/ConstantsPath";
import Loader from "@/components/Loader/Loader";
import { useVerifyAccount } from "@/hooks/auth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { isAccountVerifying, isAccountVerified } = useVerifyAccount(
    email,
    token
  );

  return (
    <FormLayout>
      <FormContainer>
        {isAccountVerifying ? (
          <Loader />
        ) : (
          <>
            {isAccountVerified ? (
              <Result
                status="success"
                title="Verify e-mail success!"
                subTitle="You can sign in now."
                extra={
                  <Link to={ConstantsPath.SIGN_IN}>
                    <SubmitBtn type="primary">Sign In</SubmitBtn>
                  </Link>
                }
              />
            ) : (
              <Result
                status="error"
                title="Verify e-mail failed!"
                subTitle="This link is not valid. Please try on another link or sign up again."
                extra={
                  <Link to={ConstantsPath.SIGN_UP}>
                    <SubmitBtn type="primary">Sign Up</SubmitBtn>
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

export default VerifyEmail;
