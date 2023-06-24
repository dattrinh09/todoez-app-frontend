import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const teamUserFn = {
  create: async (...param) => {
    return await api.post(`team-users/${param[0]}`, param[1]);
  },
  delete: async (...param) => {
    return await api.delete(`team-users/${param[0]}/${param[1]}`);
  },
};

export const useMutateTeamUser = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return teamUserFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateTeamUserFn: mutate,
    isMutateTeamUserLoading: isLoading,
  };
};
