import { useEffect, useState } from "react";
import axiosInstance from "@/request/axiosInstance";

const useGetProjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("projects");
        setData(res.data);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch) fetchData();
    return () => setIsFetch(false);
  }, [isFetch]);

  return {
    isProjectsLoading: isLoading,
    projects: data,
    projectsFetch: setIsFetch
  };
};

export default useGetProjects;
