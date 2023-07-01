import { Button, Dropdown, Modal, Space, Table, Tooltip } from "antd";
import React from "react";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import { getTaskDetailRoute } from "@/utils/route";
import { EllipsisOutlined } from "@ant-design/icons";
import MyTag from "@/components/MyTag/MyTag";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { useMutateTask } from "@/hooks/task";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { Content } from "./task-styles";
import ErrorText from "@/components/ErrorText/ErrorText";

const { confirm } = Modal;

const Tasks = ({
  projectId,
  tasksRefetch,
  data,
  isLoading,
  current,
  onTableChange,
}) => {
  const navigate = useNavigate();
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  const goToTaskDetail = (id) => {
    navigate(getTaskDetailRoute(projectId, id));
  };

  const handleDeleteTask = (id) => {
    confirm({
      title: "Do you want to remove this task from this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateTaskLoading,
      },
      onOk: () => {
        mutateTaskFn(
          {
            type: "delete",
            param: [projectId, id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Delete task successfully");
              tasksRefetch();
            },
            onError: (error) => {
              errorResponse(error.response);
            },
          }
        );
      },
    });
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        const t = TYPE_OPTIONS.find((i) => i.value === type);
        return (
          <Space size="small">
            <MyTooltip tooltip={t} />
          </Space>
        );
      },
    },
    {
      title: "Content",
      key: "content",
      render: ({ id, content }) => (
        <Link to={getTaskDetailRoute(projectId, id)}>
          <Content>{content}</Content>
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const s = STATUS_OPTIONS.find((i) => i.value === status);
        return (
          <Space size="small">
            <MyTag tag={s} />
          </Space>
        );
      },
    },
    {
      title: "P",
      dataIndex: "priority",
      key: "priority",
      align: "center",
      render: (priority) => {
        const p = PRIORITY_OPTIONS.find((i) => i.value === priority);
        return (
          <Space size="small">
            <MyTooltip tooltip={p} />
          </Space>
        );
      },
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
      render: (reporter) => (
        <ErrorText
          check={reporter.delete_at}
          title={"No longer"}
          content={reporter.user.fullname}
        />
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) => (
        <ErrorText
          check={assignee.delete_at}
          title={"No longer"}
          content={assignee.user.fullname}
        />
      ),
    },
    {
      title: "Create",
      dataIndex: "create",
      key: "create",
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
    },
    {
      title: "Due",
      key: "duedate",
      render: ({ over, duedate }) => (
        <ErrorText check={over} title={"Over due"} content={duedate} />
      ),
    },
    {
      key: "action",
      align: "center",
      render: ({ id }) => (
        <Space size="small">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => goToTaskDetail(id)}
                    >
                      View task
                    </Button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <Button
                      type="link"
                      size="small"
                      danger
                      onClick={() => handleDeleteTask(id)}
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
            <Button size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data.list}
      loading={isLoading}
      pagination={{
        current: current,
        pageSize: 10,
        total: data.total,
        position: ["bottomCenter"],
      }}
      onChange={onTableChange}
      bordered
    />
  );
};

export default Tasks;
