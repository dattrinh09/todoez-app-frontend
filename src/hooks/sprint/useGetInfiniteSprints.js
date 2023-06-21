import api from "@/api/api";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";
import { useInfiniteQuery } from "@tanstack/react-query";

const getData = async (projectId, page = 1) => {
  const params = {
    page,
    limit: 5,
  }
  return await api.get(`sprints/${projectId}/tasks`, { params });
};

export const useGetInfiniteSprints = (projectId) => {
  const { data, hasNextPage, fetchNextPage, isLoading, error, refetch } = useInfiniteQuery({
    queryKey: ["sprint", "list", "infinite", projectId],
    queryFn: ({ pageParam = 1 }) => getData(projectId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const maxPage = lastPage.data.total / 5 + 1;
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
    infiniteSprints: returnData,
    isInfiniteSprintNext: hasNextPage,
    infiniteSprintsFetchNext: fetchNextPage,
    isInfiniteSprintsLoading: isLoading,
    infiniteSprintsRefetch: refetch,
  };
};
