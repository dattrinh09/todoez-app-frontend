import api from "@/api/api";
import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { errorResponse } from "@/utils/errorResponse";

const getData = async (projectId, page = 1) => {
  const params = {
    page,
    limit: 5,
  }
  let data = null;
  try {
    data = await api.get(`sprints/${projectId}/tasks`, { params });
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetInfiniteSprints = (projectId) => {
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } = useInfiniteQuery({
    queryKey: ["sprint", "list", "infinite", projectId],
    queryFn: ({ pageParam = 1 }) => getData(projectId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const maxPage = lastPage.data.total / 5 + 1;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPage ? nextPage : undefined;
    },
  });

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
