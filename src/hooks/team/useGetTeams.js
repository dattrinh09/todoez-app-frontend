import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async () => {
  let data = [];
  try {
    const res = await api.get("teams");
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = [];
  }

  return data;
};

export const useGetTeams = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["team", "list"],
    queryFn: () => getData(),
  });

  return {
    teams: data,
    isTeamsLoading: isLoading,
    teamsRefetch: refetch,
  };
};
