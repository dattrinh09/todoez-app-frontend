import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async () => {
  return await api.get("teams");
};

export const useGetTeams = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["team", "list"],
    queryFn: () => getData(),
  });

  if (error) errorResponse(error.response);

  const returnData = useMemo(() => {
    return data ? data.data : [];
  }, [data]);

  return {
    teams: returnData,
    isTeamsLoading: isLoading,
    teamsRefetch: refetch,
  };
};
