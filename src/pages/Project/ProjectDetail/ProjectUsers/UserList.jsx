import React from "react";
import { Item, ItemTitle, Items } from "./project-users-styles";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { notificationShow } from "../../../../utils/notificationShow";
import axiosInstance from "../../../../request/axiosInstance";

const { confirm } = Modal;

const UserList = ({
  projectId,
  projectUsers,
  projectUsersRefetch,
  projectRefetch,
}) => {
  const handleDelete = async (id) => {
    confirm({
      title: "Do you want to remove this user from this project?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`project-users/${projectId}/${id}`);
          projectUsersRefetch();
          projectRefetch();
          notificationShow("success", "Remove user successfully");
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
  return (
    <>
      {!projectUsers ? (
        <div>No data</div>
      ) : (
        <Items>
          {projectUsers.map((user) => (
            <Item key={user.id}>
              <ItemTitle isCreator={user.is_creator}>
                {user.is_creator
                  ? user.user.fullname + " [ Creator ]"
                  : user.user.fullname}
              </ItemTitle>
              {!user.is_creator && (
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
      )}
    </>
  );
};

export default UserList;
