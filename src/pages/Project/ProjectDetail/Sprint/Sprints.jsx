import React, { useState } from "react";
import { formatRange } from "@/utils/formatInfo";
import {
  Box,
  BoxHeader,
  BoxTitle,
  Content,
  Item,
  ItemExtra,
  ItemSec,
  ListBox,
  ListItem,
  SubContent,
} from "./sprint-styles";
import { Button, Dropdown, Empty, Modal, Space, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
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
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Sprints = ({ projectId, sprints, sprintsRefetch }) => {
  const [selected, setSelected] = useState(null);

  const handleDeleteSprint = (id) => {
    confirm({
      title: "Do you want to remove this sprint from this project?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`sprints/${projectId}/${id}`);
          notificationShow("success", "Remove user successfully");
          sprintsRefetch();
        } catch (e) {
          errorResponse(e.response);
        }
      },
    });
  };

  return (
    <ListBox>
      {sprints.map((sprint) => (
        <Box key={sprint.id}>
          <BoxHeader>
            <BoxTitle>
              <span>{sprint.title}</span>
              <span>{` (${formatRange(sprint.start_at, sprint.end_at)})`}</span>
              <span
                style={{ color: "#1677ff" }}
              >{` ${sprint.tasks.length} tasks`}</span>
            </BoxTitle>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: <div onClick={() => setSelected(sprint)}>Edit</div>,
                  },
                  {
                    key: 2,
                    label: (
                      <div onClick={() => handleDeleteSprint(sprint.id)}>
                        Delete
                      </div>
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
            {selected && (
              <EditSprint
                projectId={projectId}
                sprint={selected}
                onClose={() => setSelected(null)}
                sprintsRefetch={sprintsRefetch}
              />
            )}
          </BoxHeader>
          {sprint.tasks.length > 0 ? (
            <ListItem>
              {sprint.tasks.map((task) => (
                <Link
                  key={task.id}
                  to={getTaskDetailRoute(projectId, task.id)}
                  style={{ borderBottom: "1px solid #aaa" }}
                >
                  <Item>
                    <ItemSec>
                      <Space>
                        <MyTooltip
                          tooltip={TYPE_OPTIONS.find(
                            (t) => t.value === task.type
                          )}
                        />
                        <Content>{task.content}</Content>
                      </Space>
                      <SubContent>
                        <MyTag
                          tag={STATUS_OPTIONS.find(
                            (s) => s.value === task.status
                          )}
                        />
                      </SubContent>
                    </ItemSec>
                    <ItemExtra>
                      <ItemSec>
                        <Tag color="#1677ff">{`Assignee: ${task.assignee.user.fullname}`}</Tag>
                        <Tag color="#1677ff">{`Reporter: ${task.reporter.user.fullname}`}</Tag>
                      </ItemSec>
                      <MyTooltip
                        tooltip={PRIORITY_OPTIONS.find(
                          (p) => p.value === task.priority
                        )}
                      />
                    </ItemExtra>
                  </Item>
                </Link>
              ))}
            </ListItem>
          ) : (
            <div style={{ backgroundColor: "#e6f4ff", border: "1px solid #aaa" }}>
              <Empty
                description="No task"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </Box>
      ))}
    </ListBox>
  );
};

export default Sprints;
