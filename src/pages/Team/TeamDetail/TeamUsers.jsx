import React from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Item, ItemTitle, Items } from "./team-detail-styles";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";

const { confirm } = Modal;

const TeamUsers = ({ teamId, teamUsers, teamUsersRefetch, teamRefetch }) => {
  const handleDelete = async (id) => {
    confirm({
      title: "Do you want to remove this user from this team ?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`team-users/${teamId}/${id}`);
          teamUsersRefetch();
          teamRefetch();
          notificationShow(
            "success",
            "Remove user successfully",
          );
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
      {!teamUsers ? (
        <div>No data</div>
      ) : (
        <Items>
          {teamUsers.map((user) => (
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

export default TeamUsers;
