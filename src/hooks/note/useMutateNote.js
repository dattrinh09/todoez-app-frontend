import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

const noteFn = {
  create: async (...param) => {
    return await api.post(`notes/${param[0]}`, param[1]);
  },
  update: async (...param) => {
    return await api.put(`notes/${param[0]}/${param[1]}`, param[2]);
  },
  delete: async (...param) => {
    return await api.delete(`notes/${param[0]}/${param[1]}`);
  },
};

export const useMutateNote = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ type, param }) => {
      return noteFn[`${type}`](...param);
    },
    networkMode: "offlineFirst",
  });

  return {
    mutateNoteFn: mutate,
    isMutateNoteLoading: isLoading,
  };
};
