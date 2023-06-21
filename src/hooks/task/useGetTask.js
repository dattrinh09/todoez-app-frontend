import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, taskId) => {
  return await api.get(`tasks/${projectId}/${taskId}`);
};

export const useGetTask = (projectId, taskId) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["task", "detail", projectId, taskId],
    queryFn: () => getData(projectId, taskId),
  });

  const returnData = useMemo(() => {
    return data ? data.data : null;
  }, [data]);

  if (error) errorResponse(error.response);

  return {
    task: returnData,
    isTaskLoading: isLoading,
    taskRefetch: refetch,
  };
};
