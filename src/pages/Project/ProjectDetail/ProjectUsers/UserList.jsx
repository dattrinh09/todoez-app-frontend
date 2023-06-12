import React, { useMemo } from "react";
import {
  Item,
  ItemTitle,
  Items,
  Sub,
  SubIcon,
  SubText,
} from "./project-users-styles";
import { Button, Modal } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { notificationShow } from "../../../../utils/notificationShow";
import axiosInstance from "../../../../request/axiosInstance";
import { errorResponse } from "../../../../utils/errorResponse";

const { confirm } = Modal;

const UserList = ({
  projectId,
  isCreator,
  projectUsers,
  projectUsersRefetch,
}) => {
  const list = useMemo(() => {
    return projectUsers.filter((user) => !user.delete_at);
  }, [projectUsers]);

  const handleDelete = async (id) => {
    confirm({
      title: "Do you want to remove this user from this project?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`project-users/${projectId}/${id}`);
          projectUsersRefetch();
          notificationShow("success", "Remove user successfully");
        } catch (e) {
          errorResponse(e.response);
        }
      },
    });
  };
  return (
    <>
      <Sub>
        <SubIcon>
          <UserOutlined />
        </SubIcon>
        <SubText>{list.length}</SubText>
      </Sub>
      <Items>
        {list.map((user) => (
          <Item key={user.id}>
            <ItemTitle isCreator={user.is_creator}>
              {user.is_creator
                ? user.user.fullname + " [ Creator ]"
                : user.user.fullname}
            </ItemTitle>
            {isCreator && !user.is_creator && (
              <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleDelete(user.id)}
              />
            )}
          </Item>
        ))}
      </Items>
    </>
  );
};

export default UserList;
