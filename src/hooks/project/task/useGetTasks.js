import { useEffect, useState } from "react";
import axiosInstance from "@/request/axiosInstance";

const useGetTasks = (projectId, enable) => {
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(enable);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = {
        ...filter,
        limit: 10,
      };
      try {
        const res = await axiosInstance.get(`tasks/${projectId}`, { params });
        setData(res.data);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch || filter) fetchData();
    return () => setIsFetch(enable);
  }, [isFetch, filter]);

  return {
    isTasksLoading: isLoading,
    tasks: data,
    tasksFetch: setIsFetch,
    tasksFilter: setFilter,
  };
};

export default useGetTasks;