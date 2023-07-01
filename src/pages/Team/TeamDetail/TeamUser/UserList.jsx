import React from "react";
import { Button, Modal, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateTeamUser } from "@/hooks/team-user/useMutateTeamUser";
import MyAvatar from "@/components/MyAvatar/MyAvatar";

const { confirm } = Modal;

const UserList = ({ teamId, data, isLoading, teamUsersRefetch }) => {
  const { mutateTeamUserFn, isMutateTeamUserLoading } = useMutateTeamUser();

  const handleDelete = async (id) => {
    confirm({
      title: "Do you want to remove this user from this project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateTeamUserLoading,
      },
      onOk: () => {
        mutateTeamUserFn(
          {
            type: "delete",
            param: [teamId, id],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Remove user successfully");
              teamUsersRefetch();
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      key: "avatar",
      render: ({ name, avatar }) => (
        <MyAvatar src={avatar} name={name} />
      ),
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
      render: ({ id }) => (
        <>
          {data.creator && (
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(id)}
            />
          )}
        </>
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
