import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const profileFn = {
  changePassword: async (body) => {
    return await api.put("users/change-password", body);
  },
  updateProfile: async (body) => {
    return await api.put("users/update-profile", body);
  },
  changeAvatar: async (body) => {
    return await api.put("users/change-avatar", body);
  },
};

export const useMutateProfile = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, body }) => {
      return profileFn[`${type}`](body);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateProfileFn: mutate,
    isMutateProfileLoading: isLoading,
  };
};
