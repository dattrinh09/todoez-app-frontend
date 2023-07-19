import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (filter) => {
  const params = {
    ...filter,
    limit: 10,
  };
  let data = [];
  try {
    const res = await api.get("projects", { params });
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = [];
  }

  return data;
};

export const useGetProjects = (filter) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", "list", filter],
    queryFn: () => getData(filter),
  });

  return {
    projects: data,
    isProjectsLoading: isLoading,
    projectsRefetch: refetch,
  };
};
