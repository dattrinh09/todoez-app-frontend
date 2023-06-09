import { useEffect, useState } from "react";
import axiosInstance from "../../../request/axiosInstance";

const useGetFilterSprints = (projectId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`sprints/${projectId}/tasks`);
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
    isFSprintsLoading: isLoading,
    fSprints: data,
    fSprintsFetch: setIsFetch
  };
};

export default useGetFilterSprints;
