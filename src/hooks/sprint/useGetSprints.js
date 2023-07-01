import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  let data = null;
  try {
    const res = await api.get(`sprints/${id}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetSprints = (projectId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sprint", "list", projectId],
    queryFn: () => getData(projectId),
  });

  return {
    sprints: data,
    isSprintsLoading: isLoading,
    sprintsRefetch: refetch,
  };
};
