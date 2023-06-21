import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  return await api.get(`project-users/${id}`);
};

export const useGetProjectUsers = (projectId) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["project", "user", "list", projectId],
    queryFn: () => getData(projectId),
  });

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  if (error) errorResponse(error.response);

  return {
    projectUsers: returnData,
    isProjectUsersLoading: isLoading,
    projectUsersRefetch: refetch,
  };
};
