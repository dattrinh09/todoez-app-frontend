import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async () => {
  return await api.get("projects");
};

export const useGetProjects = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["project", "list"],
    queryFn: () => getData(),
  });

  if (error) {
    errorResponse(error.response);
  }

  const returnData = useMemo(() => {
    return data ? data.data : [];
  }, [data]);

  return {
    projects: returnData,
    isProjectsLoading: isLoading,
    projectsRefetch: refetch,
  };
};
