import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal, Space, Table } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "./project-list-styles";
import { getProjectDetailRoute } from "@/utils/route";
import { useMutateProject } from "@/hooks/project";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Projects = ({ data, isLoading, projectsRefetch }) => {
  const navigate = useNavigate();

  const { mutateProjectFn, isMutateProjectLoading } = useMutateProject();

  const goToProjectDetail = (id) => {
    navigate(getProjectDetailRoute(id));
  };

  const handleDeleteProject = (id) => {
    confirm({
      title: "Do you want to remove this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateProjectLoading,
      },
      onOk: () => {
        mutateProjectFn(
          {
            type: "delete",
            param: [id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove project successfully");
              projectsRefetch();
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
      title: "Project",
      key: "name",
      render: ({ id, name }) => (
        <Link to={getProjectDetailRoute(id)}>
          <Content>{name}</Content>
        </Link>
      ),
    },
    {
      title: "Create",
      dataIndex: "create",
      key: "create",
    },
    {
      title: "Sprints",
      dataIndex: "sprints",
      key: "sprints",
      render: (sprints) => <span>{`${sprints} sprints`}</span>,
    },
    {
      title: "Tasks",
      dataIndex: "tasks",
      key: "tasks",
      render: (tasks) => <span>{`${tasks} tasks`}</span>,
    },
    {
      title: "Members",
      dataIndex: "users",
      key: "users",
      render: (members) => <span>{`${members} members`}</span>,
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
                      onClick={() => goToProjectDetail(id)}
                    >
                      View project
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
                      onClick={() => handleDeleteProject(id)}
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
      dataSource={data}
      loading={isLoading}
      bordered
      pagination={false}
    />
  );
};

export default Projects;
