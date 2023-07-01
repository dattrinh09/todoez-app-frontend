import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (teamId) => {
  let data = null;
  try {
    const res = await api.get(`team-users/${teamId}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetTeamUsers = (teamId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["team", "user", "list", teamId],
    queryFn: () => getData(teamId),
  });

  return {
    teamUsers: data,
    isTeamUsersLoading: isLoading,
    teamUsersRefetch: refetch,
  };
};
