import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async () => {
  let data = [];
  try {
    const res = await api.get("users/all-users");
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = [];
  }

  return data;
};

export const useGetAllUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all", "user", "list"],
    queryFn: () => getData(),
  });

  return {
    allUsers: data,
    isAllUsersLoading: isLoading,
    allUsersRefetch: refetch,
  };
};
