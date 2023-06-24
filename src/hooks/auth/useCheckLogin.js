import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { userInfoStore } from "@/stores/reducers/userSlice";
import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const checkLogin = async () => {
  return await api.get("users/profile");
};

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["login", "check"],
    queryFn: () => checkLogin(),
    retry: 2,
  });

  const rToken = localStorage.getItem("refresh_token");

  const isLogin = useMemo(() => {
    if (rToken && !!data?.data?.user_info) {
      dispatch(userInfoStore(data.data.user_info));
      return true;
    }
    return false;
  }, [data, rToken]);

  return {
    isLogin,
    isChecking: isLoading,
  };
};
