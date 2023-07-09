import React from "react";
import { Button, Dropdown, Modal, Space, Table, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useMutateProjectUser } from "@/hooks/project-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import MyAvatar from "@/components/MyAvatar/MyAvatar";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfileRoute } from "@/utils/route";

const { confirm } = Modal;

const UserList = ({ projectId, data, isLoading, projectUsersRefetch }) => {
  const navigate = useNavigate();
  const { mutateProjectUserFn, isMutateProjectUserLoading } =
    useMutateProjectUser();

  const goToUserProfile = (id) => {
    navigate(getUserProfileRoute(id));
  };

  const handleDelete = (id) => {
    confirm({
      title: "Do you want to remove this user from this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateProjectUserLoading,
      },
      onOk: () => {
        mutateProjectUserFn(
          {
            type: "delete",
            param: [projectId, id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove user successfully");
              projectUsersRefetch();
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
      title: "Name",
      key: "name",
      render: ({ name, userId }) => (
        <Link to={getUserProfileRoute(userId)}>{name}</Link>
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      render: ({ name, avatar }) => <MyAvatar src={avatar} name={name} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "creator",
      key: "creator",
      render: (creator) => (
        <>{creator ? <Tag color="blue">Creator</Tag> : <Tag>Member</Tag>}</>
      ),
    },
    {
      key: "action",
      align: "center",
      render: ({ id, userId }) => (
        <Space size="small">
          <Dropdown
            menu={{
              items: [
                {
                  key: "view-profile",
                  label: (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => goToUserProfile(userId)}
                    >
                      View profile
                    </Button>
                  ),
                },
                {
                  key: "delete-user",
                  label: (
                    <Button
                      danger
                      type="link"
                      size="small"
                      onClick={() => handleDelete(id)}
                      disabled={!data.creator}
                    >
                      Delete user
                    </Button>
                  ),
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
      bordered
      pagination={false}
    />
  );
};

export default UserList;
