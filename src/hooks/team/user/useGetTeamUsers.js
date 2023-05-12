import { useEffect, useState } from "react";
import axiosInstance from "../../../request/axiosInstance";

const useGetTeamUsers = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(true);
  const [teamUsers, setTeamUsers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`team-users/${id}`);
        setTeamUsers(res.data);
      } catch {
        setTeamUsers(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (isFetch) fetchData();
    return () => setIsFetch(false);
  }, [isFetch]);

  return { isLoading, teamUsers, setIsFetch };
};

export default useGetTeamUsers;