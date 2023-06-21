import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { notificationShow } from "../../utils/notificationShow";
import { errorResponse } from "../../utils/errorResponse";

export const useCreateProject = (refetch, closeForm) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async (body) => {
      return await api.post("projects", body);
    },
    onSuccess: () => {
      refetch();
      notificationShow("success", "Create project successfully");
    },
    onError: (e) => {
      errorResponse(e.response);
    },
    onSettled: () => {
      closeForm();
    },
    networkMode: "offlineFirst",
  });

  return {
    createProject: mutate,
    isCreateProjectLoading: isLoading,
  };
};
