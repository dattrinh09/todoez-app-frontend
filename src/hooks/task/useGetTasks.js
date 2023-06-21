import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, filter) => {
  const params = {
    ...filter,
    limit: 10,
  };
  return await api.get(`tasks/${projectId}`, { params });
};

export const useGetTasks = (projectId, filter) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["task", "list", projectId, { ...filter }],
    queryFn: () => getData(projectId, filter),
    keepPreviousData: true,
  });

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  if (error) errorResponse(error.response);

  return {
    tasks: returnData,
    isTasksLoading: isLoading,
    tasksRefetch: refetch,
  };
};
