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
    isChecking: isLoading,
  };
};
