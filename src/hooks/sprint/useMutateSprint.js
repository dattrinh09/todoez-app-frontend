import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const sprintFn = {
  create: async (...param) => {
    return await api.post(`sprints/${param[0]}`, param[1]);
  },
  update: async (...param) => {
    return await api.put(`sprints/${param[0]}/${param[1]}`, param[2]);
  },
  delete: async (...param) => {
    return await api.delete(`sprints/${param[0]}/${param[1]}`);
  },
};

export const useMutateSprint = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return sprintFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateSprintFn: mutate,
    isMutateSprintLoading: isLoading,
  };
};
