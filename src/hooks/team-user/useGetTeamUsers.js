import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (teamId) => {
  return await api.get(`team-users/${teamId}`);
};

export const useGetTeamUsers = (teamId) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["team", "user", "list", teamId],
    queryFn: () => getData(teamId),
  });

  if (error) errorResponse(error.response);

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  return {
    teamUsers: returnData,
    isTeamUsersLoading: isLoading,
    teamUsersRefetch: refetch,
  };
};
