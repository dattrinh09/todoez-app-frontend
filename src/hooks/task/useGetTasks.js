import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, filter) => {
  const params = {
    ...filter,
    limit: 10,
  };
  let data = null;
  try {
    const res = await api.get(`tasks/${projectId}`, { params });
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetTasks = (projectId, filter) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["task", "list", projectId, filter],
    queryFn: () => getData(projectId, filter),
  });

  return {
    tasks: data,
    isTasksLoading: isLoading,
    tasksRefetch: refetch,
  };
};
