import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const teamFn = {
  create: async (...param) => {
    return await api.post("teams", param[0]);
  },
  update: async (...param) => {
    return await api.put(`teams/${param[0]}`, param[1]);
  },
  delete: async (...param) => {
    return await api.delete(`teams/${param[0]}`);
  },
};

export const useMutateTeam = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return teamFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateTeamFn: mutate,
    isMutateTeamLoading: isLoading,
  };
};
