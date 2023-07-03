import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

const login = {
  email: async (body) => {
    return await api.post("auth/signin", body);
  },
  google: async (body) => {
    return await api.post("auth/google/signin", body);
  },
};

export const useLogin = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, body }) => {
      return login[`${type}`](body);
    },
    networkMode: "offlineFirst",
  });

  return {
    loginFn: mutate,
    isLoginLoading: isLoading,
  };
};
