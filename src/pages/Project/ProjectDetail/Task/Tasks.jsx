import { Button, Dropdown, Modal, Space, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../constants/Constants";
import { Icon } from "./task-styles";
import { Link } from "react-router-dom";
import { getTaskDetailRoute } from "../../../../utils/route";
import { EllipsisOutlined } from "@ant-design/icons";
import { notificationShow } from "../../../../utils/notificationShow";
import axiosInstance from "../../../../request/axiosInstance";

const { confirm } = Modal;

const Tasks = ({
  projectId,
  tasksRefetch,
  data,
  isLoading,
  current,
  pageSize,
  onTableChange,
}) => {
  const [selected, setSelected] = useState(0);

  const handleDeleteTask = () => {
    confirm({
      title: "Do you want to remove this task from this project?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`tasks/${projectId}/${selected}`);
          notificationShow("success", "Remove user successfully");
          tasksRefetch();
        } catch (e) {
          notificationShow(
            "error",
            "Remove user unsuccessfully",
            e.response.data.message
          );
        }
      },
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to={getTaskDetailRoute(projectId, selected)}>View task</Link>
      ),
    },
    {
      key: "2",
      label: <div onClick={handleDeleteTask}>Delete</div>,
    },
  ];

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
            <Tooltip title={t.label} color={t.color}>
              <Icon>
                <img
                  src={t.icon}
                  alt="icon"
                  style={{ height: "100%", width: "100%" }}
                />
              </Icon>
            </Tooltip>
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
        return <Tag color={s.color}>{s.label}</Tag>;
      },
    },
    {
      title: "P",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        const p = PRIORITY_OPTIONS.find((i) => i.value === priority);
        return (
          <Tooltip title={p.label} color={p.color}>
            <Icon>
              <img
                src={p.icon}
                alt="icon"
                style={{ height: "100%", width: "100%" }}
              />
            </Icon>
          </Tooltip>
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
            menu={{ items }}
            trigger={["click"]}
            placement="bottom"
            arrow
            onClick={() => setSelected(id)}
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
        current,
        pageSize,
        total: data.total,
        position: ["bottomCenter"],
      }}
      onChange={onTableChange}
    />
  );
};

export default Tasks;
