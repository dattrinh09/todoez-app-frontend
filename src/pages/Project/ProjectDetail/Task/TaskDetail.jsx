import React, { useMemo, useState } from "react";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import {
  Bar,
  Detail,
  FullContent,
  Info,
  Label,
  SectionDescription,
} from "./task-styles";
import { Button, Space, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetSprints } from "@/hooks/sprint";
import { useGetProjectUsers } from "@/hooks/project-user";
import { useGetTask } from "@/hooks/task";
import UpdateTask from "./Form/UpdateTask";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import { formatDate2, checkIsPassDue } from "@/utils/formatInfo";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import MyTag from "@/components/MyTag/MyTag";
import CommentList from "./Comment/CommentList";
import ErrorText from "@/components/ErrorText/ErrorText";

const TaskDetail = () => {
  const params = useParams();
  const projectId = params["project_id"];
  const taskId = params["task_id"];

  const [isUpdate, setIsUpdate] = useState(false);

  const { isSprintsLoading, sprints } = useGetSprints(projectId);
  const { isProjectUsersLoading, projectUsers } = useGetProjectUsers(projectId);
  const { isTaskLoading, task, taskRefetch } = useGetTask(projectId, taskId);

  const taskInfo = useMemo(() => {
    return task
      ? {
          type: TYPE_OPTIONS.find((t) => t.value === task.type),
          priority: PRIORITY_OPTIONS.find((p) => p.value === task.priority),
          status: STATUS_OPTIONS.find((s) => s.value === task.status),
        }
      : null;
  }, [task]);

  const users = useMemo(() => {
    return projectUsers
      ? projectUsers.list
          .filter((user) => !user.delete_at)
          .map((item) => ({
            key: item.id,
            value: item.id,
            label: item.user.fullname,
          }))
      : [];
  }, [projectUsers]);

  return (
    <ProjectLayout>
      <>
        {isTaskLoading && isSprintsLoading && isProjectUsersLoading ? (
          <Loader />
        ) : (
          <>
            {task && (
              <>
                <Detail>
                  <Bar>
                    <Space>
                      {taskInfo && <MyTooltip tooltip={taskInfo.type} />}
                      <FullContent>{task.content}</FullContent>
                    </Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => setIsUpdate(true)}
                    >
                      Update task
                    </Button>
                    {isUpdate && (
                      <UpdateTask
                        open={isUpdate}
                        onClose={() => setIsUpdate(false)}
                        projectId={projectId}
                        task={task}
                        sprints={sprints ? sprints : []}
                        users={users}
                        taskRefetch={taskRefetch}
                      />
                    )}
                  </Bar>
                  <Info>{taskInfo && <MyTag tag={taskInfo.status} />}</Info>

                  <Space>
                    <Label>Reporter:</Label>
                    <ErrorText
                      check={task.reporter.delete_at}
                      title="No longer"
                      content={task.reporter.user.fullname}
                    />
                  </Space>
                  <Space>
                    <Label>Assignee:</Label>
                    <ErrorText
                      check={task.assignee.delete_at}
                      title="No longer"
                      content={task.assignee.user.fullname}
                    />
                  </Space>

                  <Space>
                    <MyTooltip tooltip={taskInfo.priority} />
                    <Space>
                      <span>Create at:</span>
                      <span>{formatDate2(task.create_at, "LL")}</span>
                      <span>|</span>
                    </Space>
                    <Space>
                      <span>Update at:</span>
                      <span>{formatDate2(task.update_at, "LL")}</span>
                      <span>|</span>
                    </Space>
                    <Space>
                      <span>End at:</span>
                      <ErrorText
                        check={checkIsPassDue(task.end_at, task.status)}
                        title="Over due"
                        content={formatDate2(task.end_at, "LL")}
                      />
                    </Space>
                  </Space>
                </Detail>
                <section>
                  <Tag color="#222222">Description</Tag>
                  <SectionDescription>{task.description}</SectionDescription>
                </section>
                <CommentList projectId={projectId} taskId={taskId} />
              </>
            )}
          </>
        )}
      </>
    </ProjectLayout>
  );
};

export default TaskDetail;
