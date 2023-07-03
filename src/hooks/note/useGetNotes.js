import api from "@/api/api";
import { useMemo } from "react";
import { errorResponse } from "@/utils/errorResponse";
import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDate2, formatDate3 } from "@/utils/formatInfo";

const getData = async (id, page = 1) => {
  const params = {
    page,
    limit: 10,
  };
  let data = null;
  try {
    data = await api.get(`notes/${id}`, { params });
  } catch (e) {
    errorResponse(e.response);
    data = null;
  }

  return data;
};

export const useGetNotes = (teamId) => {
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["note", "list", "infinite", teamId],
      queryFn: ({ pageParam = 1 }) => getData(teamId, pageParam),
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
            create_time: formatDate2(item.create_at, "LLL"),
            create_at: formatDate3(item.create_at, "LL"),
            update_at: formatDate3(item.update_at, "LL"),
          }))
      : [];
    const group = list.reduce((prev, cur) => {
      (prev[cur["create_at"]] = prev[cur["create_at"]] || []).push(cur);
      return prev;
    }, {});

    return Object.keys(group).map((key) => ({
      date: key,
      list: group[key],
    }));
  }, [data?.pages]);

  return {
    notes: returnData,
    isNotesNext: hasNextPage,
    notesFetchNext: fetchNextPage,
    isNotesLoading: isLoading,
    notesRefetch: refetch,
  };
};
