import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../request/axiosInstance";
import { useDispatch } from "react-redux";
import { userInfoStore } from "../../stores/reducers/userSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const isLogin = useMemo(() => {
    return !!userInfo;
  }, [userInfo]);
  useEffect(() => {
    const fetchData = async () => {
      setIsChecking(true);
      try {
        const res = await axiosInstance.get("users/profile");
        setUserInfo(res.data.user_info);
        dispatch(userInfoStore(res.data.user_info));
      } catch {
        setUserInfo(null);
      } finally {
        setIsChecking(false);
      }
    };
    fetchData();
  }, []);

  return { isChecking, isLogin, userInfo };
};

export default useLogin;
