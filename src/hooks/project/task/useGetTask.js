import { useEffect, useState } from "react";
import axiosInstance from "../../../request/axiosInstance";

const useGetTask = (projectId, taskId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`tasks/${projectId}/${taskId}`);
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
    isTaskLoading: isLoading,
    task: data,
    taskFetch: setIsFetch
  };
};

export default useGetTask;
