import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const taskFn = {
  create: async (...param) => {
    return await api.post(`tasks/${param[0]}`, param[1]);
  },
  update: async (...param) => {
    return await api.put(`tasks/${param[0]}/${param[1]}`, param[2]);
  },
  updateStatus: async (...param) => {
    return await api.put(`tasks/${param[0]}/${param[1]}/update-status`, param[2]);
  },
  delete: async (...param) => {
    return await api.delete(`tasks/${param[0]}/${param[1]}`);
  },
};

export const useMutateTask = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return taskFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateTaskFn: mutate,
    isMutateTaskLoading: isLoading,
  };
};
