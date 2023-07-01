import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal, Space, Table } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Content } from "./team-list-styles";
import { getTeamDetailRoute } from "@/utils/route";
import { useMutateTeam } from "@/hooks/team";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Teams = ({ data, isLoading, teamsRefetch }) => {
  const navigate = useNavigate();

  const { mutateTeamFn, isMutateTeamLoading } = useMutateTeam();

  const goToTeamDetail = (id) => {
    navigate(getTeamDetailRoute(id));
  };

  const handleDeleteTeam = (id) => {
    confirm({
      title: "Do you want to remove this team?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateTeamLoading,
      },
      onOk: () => {
        mutateTeamFn(
          {
            type: "delete",
            param: [id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove team successfully");
              teamsRefetch();
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
      title: "Team",
      key: "name",
      render: ({ id, name }) => (
        <Link to={getTeamDetailRoute(id)}>
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
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (notes) => <span>{`${notes} notes`}</span>,
    },
    {
      title: "Members",
      dataIndex: "users",
      key: "users",
      render: (users) => <span>{`${users} members`}</span>,
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
                      onClick={() => goToTeamDetail(id)}
                    >
                      View team
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
                      onClick={() => handleDeleteTeam(id)}
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

export default Teams;
