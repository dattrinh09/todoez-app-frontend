import { useEffect, useState } from "react";
import axiosInstance from "@/request/axiosInstance";

const useVerifyAccount = (email, token) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsVerify(false);
      try {
        await axiosInstance.get(`auth/verify/${email}/${token}`);
        setIsVerify(true);
      } catch {
        setIsVerify(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (email && token) fetchData();
  }, [email, token]);

  return {
    isAccountVerifying: isLoading,
    isAccountVerified: isVerify
  };
};

export default useVerifyAccount;
