import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const projectFn = {
  create: async (...param) => {
    return await api.post("projects", param[0]);
  },
  update: async (...param) => {
    return await api.put(`projects/${param[0]}`, param[1]);
  },
  delete: async (...param) => {
    return await api.delete(`projects/${param[0]}`);
  },
};

export const useMutateProject = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return projectFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateProjectFn: mutate,
    isMutateProjectLoading: isLoading,
  };
};
