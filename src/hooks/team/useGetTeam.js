import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (teamId) => {
  return await api.get(`teams/${teamId}`);
};

export const useGetTeam = (teamId) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["team", "detail", teamId],
    queryFn: () => getData(teamId),
  });

  if (error) errorResponse(error.response);

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  return {
    team: returnData,
    isTeamLoading: isLoading,
    teamRefetch: refetch,
  };
};
