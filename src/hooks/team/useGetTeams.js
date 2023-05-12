import { useEffect, useState } from "react";
import axiosInstance from "../../request/axiosInstance";

const useGetTeams = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [teams, setTeams] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("teams");
        setTeams(res.data);
      } catch {
        setTeams(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch) fetchData();
    return () => setIsFetch(false);
  }, [isFetch]);

  return { isLoading, teams, setIsFetch };
};

export default useGetTeams;
