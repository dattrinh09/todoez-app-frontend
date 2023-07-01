import React, { useMemo } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Loader from "@/components/Loader/Loader";
import { Container, Heading } from "./my-task-styles";
import { useGetMyTasks } from "@/hooks/task";
import { Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import TaskList from "./TaskList";
import { useSearchParams } from "react-router-dom";
import TaskFilter from "./TaskFilter";

const MyTask = () => {
  const [searchParams] = useSearchParams();

  const filterParams = useMemo(() => {
    return {
      type: searchParams.get("type") || undefined,
      keyword: searchParams.get("keyword") || undefined,
      status: searchParams.get("status") || undefined,
      priority: searchParams.get("priority") || undefined,
    };
  }, [searchParams]);

  const {
    isMyTasksLoading,
    myTasks,
    isMyTasksNext,
    myTasksFetchNext,
    myTasksRefetch,
  } = useGetMyTasks(filterParams);

  const loadMoreTasks = () => {
    if (isMyTasksNext) myTasksFetchNext();
  };

  return (
    <MainLayout>
      <Container>
        <Heading>My tasks</Heading>
        <TaskFilter filter={filterParams} />
        <section>
          {isMyTasksLoading ? (
            <Loader />
          ) : (
            <>
              {myTasks.length > 0 ? (
                <InfiniteScroll
                  dataLength={10}
                  next={loadMoreTasks}
                  hasMore={isMyTasksNext}
                  loader={<Loader />}
                >
                  <TaskList myTasks={myTasks} myTasksRefetch={myTasksRefetch} />
                </InfiniteScroll>
              ) : (
                <Empty description="No task" />
              )}
            </>
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export default MyTask;
