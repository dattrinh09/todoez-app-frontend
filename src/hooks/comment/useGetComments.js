import api from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, taskId, page = 1) => {
  const params = {
    page,
    limit: 10,
  };
  return await api.get(`comments/${projectId}/${taskId}`, { params });
};

export const useGetComments = (projectId, taskId) => {
  const { data, hasNextPage, fetchNextPage, isLoading, error, refetch } =
    useInfiniteQuery({
      queryKey: ["comment", "list", projectId, taskId],
      queryFn: ({ pageParam = 1 }) => getData(projectId, taskId, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = lastPage.data.total / 10 + 1;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
    });

  if (error) errorResponse(error.response);

  const returnData = useMemo(() => {
    return data?.pages
      ? data.pages.reduce((prev, cur) => {
          return [...prev, ...cur.data.list];
        }, [])
      : [];
  }, [data?.pages]);

  return {
    comments: returnData,
    isCommentsNext: hasNextPage,
    commentsFetchNext: fetchNextPage,
    isCommentsLoading: isLoading,
    commentsRefetch: refetch,
  };
};
