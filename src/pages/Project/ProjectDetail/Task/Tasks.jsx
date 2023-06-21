import { Button, Dropdown, Modal, Space, Table } from "antd";
import React from "react";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import { Link } from "react-router-dom";
import { getTaskDetailRoute } from "@/utils/route";
import { EllipsisOutlined } from "@ant-design/icons";
import MyTag from "@/components/MyTag/MyTag";
import MyTooltip from "@/components/MyTooltip/MyTooltip";
import { useMutateTask } from "@/hooks/task";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Tasks = ({
  projectId,
  tasksRefetch,
  data,
  isLoading,
  current,
  onTableChange,
}) => {
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  const handleDeleteTask = (id) => {
    confirm({
      title: "Do you want to remove this task from this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateTaskLoading
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
        <Link to={getTaskDetailRoute(projectId, id)}>{content}</Link>
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
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
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
      dataIndex: "duedate",
      key: "duedate",
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
                    <Link to={getTaskDetailRoute(projectId, id)}>
                      View task
                    </Link>
                  ),
                },
                {
                  key: "2",
                  label: <div onClick={() => handleDeleteTask(id)}>Delete</div>,
                },
              ],
            }}
            trigger={["click"]}
            placement="bottom"
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
