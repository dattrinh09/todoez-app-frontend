import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { userInfoStore } from "@/stores/reducers/userSlice";
import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const checkLogin = async (aToken, rToken) => {
  if (!aToken && !rToken) return null;
  return await api.get("users/profile");
};

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const aToken = localStorage.getItem("access_token");
  const rToken = localStorage.getItem("refresh_token");
  const { data, isFetching } = useQuery({
    queryKey: ["login", "check", aToken, rToken],
    queryFn: () => checkLogin(aToken, rToken),
  });

  const isLogin = useMemo(() => {
    if (!!data?.data?.user_info) {
      dispatch(userInfoStore(data.data.user_info));
      return true;
    }
    return false;
  }, [data]);

  return {
    isLogin,
    isChecking: isFetching,
  };
};
