import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

const typeLoginUrl = {
  email: "auth/signin",
  google: "auth/google/signin",
}

export const useLogin = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ type, body }) => {
      return await api.post(typeLoginUrl[`${type}`], body);
    },
    networkMode: "offlineFirst",
  });

  return {
    loginFn: mutate,
    isLoginLoading: isLoading,
  };
};
