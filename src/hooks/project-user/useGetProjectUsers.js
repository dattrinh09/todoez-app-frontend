import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  let data = null;
  try {
    const res = await api.get(`project-users/${id}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetProjectUsers = (projectId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", "user", "list", projectId],
    queryFn: () => getData(projectId),
  });

  return {
    projectUsers: data,
    isProjectUsersLoading: isLoading,
    projectUsersRefetch: refetch,
  };
};
