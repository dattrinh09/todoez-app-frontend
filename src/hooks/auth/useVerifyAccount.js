import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const verify = async (email, token) => {
  return await api.get(`auth/verify/${email}/${token}`);
}

export const useVerifyAccount = (email, token) => {
  const { isSuccess, isLoading } = useQuery({
    queryKey: ["email", "token", "verify", email, token],
    queryFn: () => verify(email, token),
  });

  const isVerified = useMemo(() => {
    return isSuccess;
  }, [isSuccess]); 

  return {
    isAccountVerifying: isLoading,
    isAccountVerified: isVerified,
  };
};
