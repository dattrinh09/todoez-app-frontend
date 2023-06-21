import React, { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Bar, TitleText } from "./task-styles";
import Loader from "@/components/Loader/Loader";
import { Button } from "antd";
import CreateTask from "./Form/CreateTask";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useGetProjectUsers } from "@/hooks/project-user";
import { useGetSprints } from "@/hooks/sprint";
import { useGetTasks } from "@/hooks/task";
import Tasks from "./Tasks";
import { formatDate2 } from "@/utils/formatInfo";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectId = params["project_id"];
  const [isCreate, setIsCreate] = useState(false);

  const { isSprintsLoading, sprints } = useGetSprints(projectId);
  const { isProjectUsersLoading, projectUsers } = useGetProjectUsers(projectId);

  const filterParams = useMemo(() => {
    return {
      page: searchParams.get("page") ? searchParams.get("page") : 1,
      type: searchParams.get("type") ? searchParams.get("type") : undefined,
      keyword: searchParams.get("keyword")
        ? searchParams.get("keyword").replaceAll("%", " ")
        : undefined,
      status: searchParams.get("status")
        ? searchParams.get("status")
        : undefined,
      priority: searchParams.get("priority")
        ? searchParams.get("priority")
        : undefined,
      assignee: searchParams.get("assignee")
        ? searchParams.get("assignee")
        : undefined,
      reporter: searchParams.get("reporter")
        ? searchParams.get("reporter")
        : undefined,
    };
  }, [searchParams]);

  const { isTasksLoading, tasks, tasksRefetch } = useGetTasks(
    projectId,
    filterParams
  );

  const USER_OPTIONS = useMemo(() => {
    return projectUsers
      ? projectUsers.list.map((user) => ({
          id: user.id,
          value: user.id,
          label: user.user.fullname,
        }))
      : [];
  }, [projectUsers]);

  const assignees = useMemo(() => {
    return projectUsers
      ? projectUsers.list.filter((user) => !user.delete_at)
      : [];
  }, [projectUsers]);

  const data = useMemo(() => {
    return {
      list: tasks
        ? tasks.list.map((value) => ({
            key: value.id,
            id: value.id,
            type: value.type,
            content: value.content,
            status: value.status,
            priority: value.priority,
            reporter: value.reporter.user.fullname,
            assignee: value.assignee.user.fullname,
            create: formatDate2(value.create_at, "DD-MM"),
            update: formatDate2(value.update_at, "DD-MM"),
            duedate: formatDate2(value.end_at, "DD-MM"),
          }))
        : [],
      total: tasks ? tasks.total : 0,
    };
  }, [tasks]);

  const handleTableChange = (page) => {
    if (page.current !== 1) searchParams.set("page", page.current);
    else searchParams.delete("page");

    setSearchParams(searchParams);
  };

  return (
    <ProjectLayout>
      <>
        {isSprintsLoading || isProjectUsersLoading ? (
          <Loader />
        ) : (
          <>
            <Bar>
              <TitleText>Task list</TitleText>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => setIsCreate(true)}
              >
                Create task
              </Button>
              {isCreate && (
                <CreateTask
                  open={isCreate}
                  onClose={() => setIsCreate(false)}
                  sprints={sprints ? sprints : []}
                  assignees={assignees}
                  projectId={projectId}
                  tasksRefetch={tasksRefetch}
                />
              )}
            </Bar>
            {USER_OPTIONS.length > 0 && (
              <TaskFilter filter={filterParams} users={USER_OPTIONS} />
            )}
            <section>
              {isTasksLoading ? (
                <Loader />
              ) : (
                <Tasks
                  projectId={projectId}
                  tasksRefetch={tasksRefetch}
                  data={data}
                  isLoading={isTasksLoading}
                  current={Number(filterParams.page)}
                  onTableChange={handleTableChange}
                />
              )}
            </section>
          </>
        )}
      </>
    </ProjectLayout>
  );
};

export default TaskList;
