import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

export const useRegister = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async (body) => {
      return await api.post("auth/signup", body);
    },
    networkMode: "offlineFirst",
  });

  return {
    registerFn: mutate,
    isRegisterLoading: isLoading,
  };
};
