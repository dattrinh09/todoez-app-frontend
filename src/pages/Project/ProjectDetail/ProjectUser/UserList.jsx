import React from "react";
import { Button, Modal, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutateProjectUser } from "@/hooks/project-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import MyAvatar from "@/components/MyAvatar/MyAvatar";

const { confirm } = Modal;

const UserList = ({ projectId, data, isLoading, projectUsersRefetch }) => {
  const { mutateProjectUserFn, isMutateProjectUserLoading } =
    useMutateProjectUser();

  const handleDelete = async (id) => {
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
