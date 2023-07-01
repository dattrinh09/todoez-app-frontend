import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async () => {
  let data = [];
  try {
    const res = await api.get("projects");
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = []
  }

  return data;
};

export const useGetProjects = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["project", "list"],
    queryFn: () => getData(),
  });

  return {
    projects: data,
    isProjectsLoading: isLoading,
    projectsRefetch: refetch,
  };
};
