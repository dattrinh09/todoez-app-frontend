import { useEffect, useState } from "react";
import axiosInstance from "@/request/axiosInstance";

const useGetProjectUsers = (projectId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`project-users/${projectId}`);
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
    isProjectUsersLoading: isLoading,
    projectUsers: data,
    projectUsersFetch: setIsFetch
  };
};

export default useGetProjectUsers;
