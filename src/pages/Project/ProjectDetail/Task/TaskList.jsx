import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useGetSprints from "../../../../hooks/project/sprint/useGetSprints";
import { Bar, TitleText } from "./task-styles";
import Loader from "../../../../components/Loader/Loader";
import { Button } from "antd";
import CreateTask from "./Form/CreateTask";
import { PlusCircleOutlined } from "@ant-design/icons";
import useGetProjectUsers from "../../../../hooks/project/user/useGetProjectUsers";
import useGetTasks from "../../../../hooks/project/task/useGetTasks";
import Tasks from "./Tasks";
import { formatDate2 } from "../../../../utils/formatInfo";
import ProjectLayout from "../../../../components/Layout/ProjectLayout/ProjectLayout";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const projectId = params["project_id"];

  const { isSprintsLoading, sprints } = useGetSprints(projectId);
  const { isProjectUsersLoading, projectUsers } = useGetProjectUsers(projectId);

  const { isTasksLoading, tasks, tasksFetch, tasksFilter } = useGetTasks(
    projectId,
    false
  );

  const [isCreate, setIsCreate] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const filterParams = useMemo(() => {
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
    });
    const type = searchParams.get("type") ? searchParams.get("type") : "";
    const keyword = searchParams.get("keyword")
      ? searchParams.get("keyword").replaceAll("%", " ")
      : "";
    const status = searchParams.get("status") ? searchParams.get("status") : "";
    const priority = searchParams.get("priority")
      ? searchParams.get("priority")
      : "";
    const assignee = searchParams.get("assignee")
      ? searchParams.get("assignee")
      : 0;
    const reporter = searchParams.get("reporter")
      ? searchParams.get("reporter")
      : 0;
    return {
      type,
      keyword,
      status,
      priority,
      assignee,
      reporter,
    };
  }, [searchParams]);

  useEffect(() => {
    const filter = {
      ...filterParams,
      ...pagination,
    };
    tasksFilter(filter);
  }, [filterParams, pagination]);

  const USER_OPTIONS = useMemo(() => {
    return projectUsers
      ? projectUsers.map((user) => ({
          id: user.id,
          value: user.user.id,
          label: user.user.fullname,
        }))
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
            reporter: value.reporter.fullname,
            assignee: value.assignee.fullname,
            create: formatDate2(value.create_time, "DD-MM"),
            update: formatDate2(value.update_time, "DD-MM"),
            duedate: formatDate2(value.end_time, "DD-MM"),
          }))
        : [],
      total: tasks ? tasks.total : 0,
    };
  }, [tasks]);

  const handleTableChange = (p) => {
    setPagination({
      ...pagination,
      page: p.current,
      limit: p.pageSize,
    });
  };

  return (
    <ProjectLayout>
      <>
        {isTasksLoading && isSprintsLoading && isProjectUsersLoading ? (
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
                  assignees={projectUsers ? projectUsers : []}
                  projectId={projectId}
                  tasksRefetch={() => tasksFetch(true)}
                />
              )}
            </Bar>
            {USER_OPTIONS.length > 0 && <TaskFilter filter={filterParams} users={USER_OPTIONS} />}
            <section>
              {isTasksLoading ? (
                <Loader />
              ) : (
                <Tasks
                  projectId={projectId}
                  tasksRefetch={() => tasksFetch(true)}
                  data={data}
                  isLoading={isTasksLoading}
                  current={pagination.page}
                  pageSize={pagination.limit}
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
