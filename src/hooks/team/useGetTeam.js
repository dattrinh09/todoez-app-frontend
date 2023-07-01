import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (teamId) => {
  let data = null;
  try {
    const res = await api.get(`teams/${teamId}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetTeam = (teamId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["team", "detail", teamId],
    queryFn: () => getData(teamId),
  });

  return {
    team: data,
    isTeamLoading: isLoading,
    teamRefetch: refetch,
  };
};
