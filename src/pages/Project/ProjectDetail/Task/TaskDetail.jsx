import React, { useMemo, useState } from "react";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { Bar, Detail, Info, Label, TitleText } from "./task-styles";
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
import { formatDate2 } from "@/utils/formatInfo";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import MyTag from "@/components/MyTag/MyTag";
import CommentList from "./Comment/CommentList";
import { checkIsPassDue } from "../../../../utils/formatInfo";

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
          isPassDue: checkIsPassDue(task.end_at),
        }
      : null;
  }, [task]);

  const users = useMemo(() => {
    return projectUsers
      ? projectUsers.list.filter((user) => !user.delete_at)
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
                      <TitleText>{task.content}</TitleText>
                      {taskInfo?.isPassDue && (<Tag color="red">Over</Tag>)}
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
                    <Label>Reporter: </Label>
                    {task.reporter.user.fullname}
                  </Space>
                  <Space>
                    <Label>Assignee: </Label>
                    {task.assignee.user.fullname}
                  </Space>

                  <Space>
                    <Space>
                      Create at: {formatDate2(task.create_at, "DD-MM-YYYY")} |
                    </Space>
                    <Space>
                      Update at: {formatDate2(task.update_at, "DD-MM-YYYY")} |
                    </Space>
                    <Space>
                      End at: {formatDate2(task.end_at, "DD-MM-YYYY")}
                    </Space>
                  </Space>
                </Detail>
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
