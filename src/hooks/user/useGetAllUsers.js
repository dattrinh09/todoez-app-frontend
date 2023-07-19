import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (params) => {
  let data = [];
  try {
    const res = await api.get("users/all-users", { params });
    data = res.data;
  } catch (e) {
    errorResponse(e.response);
    data = [];
  }

  return data;
};

export const useGetAllUsers = (filter) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all", "user", "list", filter],
    queryFn: () => getData(filter),
  });

  return {
    allUsers: data,
    isAllUsersLoading: isLoading,
    allUsersRefetch: refetch,
  };
};
