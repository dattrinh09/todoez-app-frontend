import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, taskId) => {
  let data = null;
  try {
    const res = await api.get(`tasks/${projectId}/${taskId}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetTask = (projectId, taskId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["task", "detail", projectId, taskId],
    queryFn: () => getData(projectId, taskId),
  });

  return {
    task: data,
    isTaskLoading: isLoading,
    taskRefetch: refetch,
  };
};
