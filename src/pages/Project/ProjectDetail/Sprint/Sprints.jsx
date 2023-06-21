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
  SubContent,
} from "./sprint-styles";
import { Button, Dropdown, List, Modal, Space, Tag } from "antd";
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
import { useMutateSprint } from "@/hooks/sprint";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Sprints = ({ projectId, sprints, sprintsRefetch }) => {
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
          <List
            size="middle"
            bordered
            dataSource={sprint.tasks ?? []}
            style={{ backgroundColor: "#ecf6fd" }}
            renderItem={(item) => (
              <List.Item>
                <Link
                  to={getTaskDetailRoute(projectId, item.id)}
                  style={{ width: "100%" }}
                >
                  <Item>
                    <ItemSec>
                      <Space>
                        <MyTooltip
                          tooltip={TYPE_OPTIONS.find(
                            (t) => t.value === item.type
                          )}
                        />
                        <Content>{item.content}</Content>
                      </Space>
                      <SubContent>
                        <MyTag
                          tag={STATUS_OPTIONS.find(
                            (s) => s.value === item.status
                          )}
                        />
                      </SubContent>
                    </ItemSec>
                    <ItemExtra>
                      <ItemSec>
                        <Tag color="#1677ff">{`Assignee: ${item.assignee.user.fullname}`}</Tag>
                        <Tag color="#1677ff">{`Reporter: ${item.reporter.user.fullname}`}</Tag>
                      </ItemSec>
                      <MyTooltip
                        tooltip={PRIORITY_OPTIONS.find(
                          (p) => p.value === item.priority
                        )}
                      />
                    </ItemExtra>
                  </Item>
                </Link>
              </List.Item>
            )}
          />
        </Box>
      ))}
    </ListBox>
  );
};

export default Sprints;
