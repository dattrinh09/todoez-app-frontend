import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const projectUserFn = {
  create: async (...param) => {
    return await api.post(`project-users/${param[0]}`, param[1]);
  },
  delete: async (...param) => {
    return await api.delete(`project-users/${param[0]}/${param[1]}`);
  },
};

export const useMutateProjectUser = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return projectUserFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateProjectUserFn: mutate,
    isMutateProjectUserLoading: isLoading,
  };
};
