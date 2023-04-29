import { useEffect, useState } from "react";
import axiosInstance from "../../request/axiosInstance";

const useGetProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("users/profile");
        setUser(res.data.user_info);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { isLoading, user };
};

export default useGetProfile;