import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { ConstantsPath } from "@/constants/ConstantsPath";
import { userInfoRemove } from "@/stores/reducers/userSlice";
import { errorResponse } from "@/utils/errorResponse";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const logout = async () => {
  return await api.get("auth/signout");
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch, isRefetching, isSuccess, error } = useQuery({
    queryKey: ["user", "logout"],
    queryFn: () => logout(),
    enabled: false,
  });

  if (isSuccess) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(userInfoRemove());
    navigate(ConstantsPath.HERO_PAGE);
  }

  if (error) {
    errorResponse(error.response);
  }

  return {
    isLogoutLoading: isRefetching,
    logoutFn: refetch,
  };
};
