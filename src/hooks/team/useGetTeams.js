import { useEffect, useState } from "react";
import api from "@/api/api";

const useGetTeams = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("teams");
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
    isTeamsLoading: isLoading,
    teams: data,
    teamsFetch: setIsFetch
  };
};

export default useGetTeams;
