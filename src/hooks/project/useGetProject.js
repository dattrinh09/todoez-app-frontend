import { useEffect, useState } from "react";
import axiosInstance from "@/request/axiosInstance";
import { errorResponse } from "@/utils/errorResponse";

const useGetProject = (projectId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`projects/${projectId}`);
        setData(res.data);
      } catch (e) {
        errorResponse(e.response);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch) fetchData();
    return () => setIsFetch(false);
  }, [isFetch]);

  return {
    isProjectLoading: isLoading,
    project: data,
    projectFetch: setIsFetch
  };
};

export default useGetProject;
