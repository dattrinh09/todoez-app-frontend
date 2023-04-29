import React, { useState, useEffect } from "react";
import { FormContainer, FormLayout, SubmitBtn } from "../auth-styles";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Result } from "antd";
import { ConstantsPath } from "../../../constants/ConstantsPath";
import Loader from "../../../components/Loader/Loader";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    const verifyUrl = async () => {
      setIsLoading(true);
      const email = searchParams.get("email");
      const token = searchParams.get("token");
      if (email && token) {
        try {
          await axios.get(
            `http://localhost:8080/api/auth/verify/${email}/${token}`
          );
          setIsVerify(true);
        } catch {
          setIsVerify(false);
        } finally {
          setIsLoading(false);
        }
      }
    };
    verifyUrl();
  }, [searchParams]);

  return (
    <FormLayout>
      <FormContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isVerify ? (
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
