import React, { useMemo, useState } from "react";
import ProjectLayout from "../../../../components/Layout/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import useGetTask from "../../../../hooks/project/task/useGetTask";
import Loader from "../../../../components/Loader/Loader";
import { Bar, BarTitle, Detail, Icon, Info, Label, TitleText } from "./task-styles";
import { Button, Space, Tag, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import useGetSprints from "../../../../hooks/project/sprint/useGetSprints";
import useGetProjectUsers from "../../../../hooks/project/user/useGetProjectUsers";
import UpdateTask from "./Form/UpdateTask";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../constants/Constants";
import { formatDate2 } from "../../../../utils/formatInfo";

const TaskDetail = () => {
  const params = useParams();
  const projectId = params["project_id"];
  const taskId = params["task_id"];

  const [isUpdate, setIsUpdate] = useState(false);

  const { isSprintsLoading, sprints } = useGetSprints(projectId);
  const { isProjectUsersLoading, projectUsers } = useGetProjectUsers(projectId);
  const { isTaskLoading, task, taskFetch } = useGetTask(projectId, taskId);

  const taskInfo = useMemo(() => {
    return task
      ? {
          type: TYPE_OPTIONS.find((t) => t.value === task.type),
          priority: PRIORITY_OPTIONS.find((p) => p.value === task.priority),
          status: STATUS_OPTIONS.find((s) => s.value === task.status),
        }
      : null;
  }, [task]);

  return (
    <ProjectLayout>
      <>
        {isTaskLoading && isSprintsLoading && isProjectUsersLoading ? (
          <Loader />
        ) : (
          <>
            {!task ? (
              <div>No data</div>
            ) : (
              <>
                <Detail>
                  <Bar>
                    <BarTitle>
                      <TitleText>{task.content}</TitleText>
                      {taskInfo && (
                        <Tooltip
                          title={taskInfo.type.label}
                          color={taskInfo.type.color}
                        >
                          <Icon>
                            <img
                              src={taskInfo.type.icon}
                              alt="icon"
                              style={{ height: "100%", width: "100%" }}
                            />
                          </Icon>
                        </Tooltip>
                      )}
                    </BarTitle>
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
                        taskId={taskId}
                        task={task}
                        sprints={sprints ? sprints : []}
                        users={projectUsers ? projectUsers : []}
                        taskRefetch={() => taskFetch(true)}
                      />
                    )}
                  </Bar>
                  <Info>
                    {taskInfo && (
                      <Tag color={taskInfo.status.color}>
                        {taskInfo.status.label}
                      </Tag>
                    )}
                  </Info>
                  <Space>
                    <Label>Create at:</Label>
                    {formatDate2(task.create_time, "DD-MM-YYYY")}
                  </Space>
                  <Space>
                    <Label>Update at:</Label>
                    {formatDate2(task.update_time, "DD-MM-YYYY")}
                  </Space>
                  <Space>
                    <Label>End at:</Label>
                    {formatDate2(task.end_time, "DD-MM-YYYY")}
                  </Space>
                </Detail>
              </>
            )}
          </>
        )}
      </>
    </ProjectLayout>
  );
};

export default TaskDetail;
