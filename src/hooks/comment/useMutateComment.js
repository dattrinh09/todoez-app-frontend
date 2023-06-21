import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const commentFn = {
  create: async (...param) => {
    return await api.post(`comments/${param[0]}`, param[1]);
  },
  update: async (...param) => {
    return await api.put(`comments/${param[0]}/${param[1]}`, param[2]);
  },
  delete: async (...param) => {
    return await api.delete(`comments/${param[0]}/${param[1]}`);
  },
};

export const useMutateComment = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return commentFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateCommentFn: mutate,
    isMutateCommentLoading: isLoading,
  };
};
