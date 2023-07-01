import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  let data = null;
  try {
    const res = await api.get(`projects/${id}`);
    data = res.data;
  } catch (e) {
    data = null;
    errorResponse(e.response);
  }
  return data;
};

export const useGetProject = (projectId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", "detail", projectId],
    queryFn: () => getData(projectId),
  });

  return {
    project: data,
    isProjectLoading: isLoading,
    projectRefetch: refetch,
  };
};
