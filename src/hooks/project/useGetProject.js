import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  return await api.get(`projects/${id}`);
};

export const useGetProject = (projectId) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["project", "detail", projectId],
    queryFn: () => getData(projectId),
  });

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  if (error) errorResponse(error.response);

  return {
    project: returnData,
    isProjectLoading: isLoading,
    projectRefetch: refetch,
  };
};
