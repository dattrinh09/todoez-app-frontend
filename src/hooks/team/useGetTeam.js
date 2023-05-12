import { useEffect, useState } from "react";
import axiosInstance from "../../request/axiosInstance";

const useGetTeam = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [teamInfo, setTeamInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`teams/${id}`);
        setTeamInfo(res.data);
      } catch {
        setTeamInfo(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch) fetchData();
    return () => setIsFetch(false);
  }, [isFetch]);

  return { isLoading, teamInfo, setIsFetch };
};

export default useGetTeam;

