import React from "react";
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

const { confirm } = Modal;

const UserList = ({
  projectId,
  isCreator,
  projectUsers,
  projectUsersRefetch,
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
        <section>
          <Sub>
            <SubIcon>
              <UserOutlined />
            </SubIcon>
            <SubText>{projectUsers.length}</SubText>
          </Sub>
          <Items>
            {projectUsers.map((user) => (
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
        </section>
      )}
    </>
  );
};

export default UserList;
