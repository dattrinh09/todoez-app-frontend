import React, { useState } from "react";
import { formatRange, formatDate2, checkIsPassDue } from "@/utils/formatInfo";
import {
  Box,
  BoxTitle,
  ButtonBar,
  Content,
  ItemExtra,
  ListBox,
  SubContent,
} from "./sprint-styles";
import { Button, Dropdown, List, Modal, Space } from "antd";
import { EllipsisOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import MyTag from "@/components/MyTag/MyTag";
import { Link } from "react-router-dom";
import { getTaskDetailRoute } from "@/utils/route";
import EditSprint from "./Form/EditSprint";
import CreateTask from "./Form/CreateTask";
import { useMutateSprint } from "@/hooks/sprint";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import ErrorText from "@/components/ErrorText/ErrorText";

const { confirm } = Modal;

const Sprints = ({ projectId, sprints, sprintsRefetch }) => {
  const [create, setCreate] = useState(null);
  const [selected, setSelected] = useState(null);
  const { mutateSprintFn, isMutateSprintLoading } = useMutateSprint();

  const handleDeleteSprint = (id) => {
    confirm({
      title: "Do you want to remove this sprint from this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateSprintLoading,
      },
      onOk: () => {
        mutateSprintFn(
          {
            type: "delete",
            param: [projectId, id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove sprint successfully");
              sprintsRefetch();
            },
            onError: (error) => {
              errorResponse(error.response);
            },
          }
        );
      },
    });
  };

  return (
    <ListBox>
      {sprints.map((sprint) => (
        <Box key={sprint.id}>
          <BoxTitle>
            <span>{sprint.title}</span>
            <span>{` (${formatRange(sprint.start_at, sprint.end_at)})`}</span>
            <span
              style={{ color: "#1677ff" }}
            >{` ${sprint.tasks.length} tasks`}</span>
          </BoxTitle>
          <ButtonBar>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => setCreate(sprint)}
            >
              Create task
            </Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => setSelected(sprint)}
                      >
                        Edit
                      </Button>
                    ),
                  },
                  {
                    key: 2,
                    label: (
                      <Button
                        type="link"
                        size="small"
                        danger
                        onClick={() => handleDeleteSprint(sprint.id)}
                      >
                        Delete
                      </Button>
                    ),
                  },
                ],
              }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <Button size="small" type="primary" icon={<EllipsisOutlined />} />
            </Dropdown>
          </ButtonBar>
          {sprint.tasks.length > 0 && (
            <List
              size="middle"
              bordered
              dataSource={sprint.tasks}
              style={{ backgroundColor: "#fff" }}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={[
                    <ItemExtra>
                      <Space>
                        <span style={{ color: "#1677ff" }}>Assignee:</span>
                        <span>{item.assignee.user.fullname}</span>
                      </Space>
                      <Space>
                        <span style={{ color: "#1677ff" }}>Reporter:</span>
                        <span>{item.reporter.user.fullname}</span>
                      </Space>
                    </ItemExtra>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <MyTooltip
                          tooltip={TYPE_OPTIONS.find(
                            (t) => t.value === item.type
                          )}
                        />
                        <Link to={getTaskDetailRoute(projectId, item.id)}>
                          <Content>{item.content}</Content>
                        </Link>
                      </Space>
                    }
                    description={
                      <SubContent>
                        <Space>
                          <MyTooltip
                            tooltip={PRIORITY_OPTIONS.find(
                              (p) => p.value === item.priority
                            )}
                          />
                          <span>End at:</span>
                          <ErrorText
                            check={checkIsPassDue(item.end_at, item.status)}
                            title="Over due"
                            content={formatDate2(item.end_at, "LLL")}
                          />
                        </Space>
                        <div>
                          <MyTag
                            tag={STATUS_OPTIONS.find(
                              (s) => s.value === item.status
                            )}
                          />
                        </div>
                      </SubContent>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Box>
      ))}
      <>
        {selected && (
          <EditSprint
            projectId={projectId}
            sprint={selected}
            onClose={() => setSelected(null)}
            sprintsRefetch={sprintsRefetch}
          />
        )}
        {create && (
          <CreateTask
            sprint={create}
            onClose={() => setCreate(null)}
            projectId={projectId}
            sprintsRefetch={sprintsRefetch}
          />
        )}
      </>
    </ListBox>
  );
};

export default Sprints;
