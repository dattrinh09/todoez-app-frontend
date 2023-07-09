import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (id) => {
  let data = null;
  try {
    const res = await api.get(`users/${id}`);
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetUserProfile = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", "profile", userId],
    queryFn: () => getData(userId),
  });

  return {
    userProfile: data,
    isUserProfileLoading: isLoading,
  };
};
