import api from "@/api/api";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDate2, formatDate3, checkIsPassDue } from "@/utils/formatInfo";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";

const getData = async (filter, page = 1) => {
  const params = {
    ...filter,
    page,
    limit: 10,
  };
  let data = null;
  try {
    data = await api.get("tasks/my-task", { params });
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetMyTasks = (filter) => {
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["my", "task", "list", filter],
      queryFn: ({ pageParam = 1 }) => getData(filter, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = lastPage.data.total / 10 + 1;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
    });

  const returnData = useMemo(() => {
    const list = data?.pages
      ? data.pages
          .reduce((prev, cur) => {
            return [...prev, ...cur.data.list];
          }, [])
          .map((item) => ({
            ...item,
            type: TYPE_OPTIONS.find((t) => t.value === item.type),
            status: STATUS_OPTIONS.find((s) => s.value === item.status),
            priority: PRIORITY_OPTIONS.find((p) => p.value === item.priority),
            end_time: formatDate3(item.end_at),
            end_at: formatDate2(item.end_at, "LL"),
            is_over: checkIsPassDue(item.end_at, item.status),
          }))
      : [];
    const group = list.reduce((prev, cur) => {
      (prev[cur["end_time"]] = prev[cur["end_time"]] || []).push(cur);
      return prev;
    }, {});

    return Object.keys(group).map((key) => ({
      date: key,
      list: group[key],
    }));
  }, [data?.pages]);

  return {
    myTasks: returnData,
    isMyTasksNext: hasNextPage,
    myTasksFetchNext: fetchNextPage,
    isMyTasksLoading: isLoading,
    myTasksRefetch: refetch,
  };
};
