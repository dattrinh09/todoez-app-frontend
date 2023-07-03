import { useMutation } from "@tanstack/react-query";
import api from "@/api/api";

const resetPassword = async (email, password) => {
  return await api.put(`auth/reset-password/${email}`, { password });
};

export const useResetPassword = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return resetPassword(email, password);
    },
    networkMode: "offlineFirst",
  });

  return {
    resetPasswordFn: mutate,
    isResetPasswordLoading: isLoading,
  };
};
