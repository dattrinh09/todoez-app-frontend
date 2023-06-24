import React, { useMemo } from "react";
import {
  Item,
  ItemTitle,
  Items,
  Sub,
  SubIcon,
  SubText,
} from "./team-users-styles";
import { Button, Modal } from "antd";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateTeamUser } from "@/hooks/team-user/useMutateTeamUser";

const { confirm } = Modal;

const UserList = ({
  teamId,
  isCreator,
  teamUsers,
  teamUsersRefetch,
}) => {
  const { mutateTeamUserFn, isMutateTeamUserLoading } = useMutateTeamUser();

  const list = useMemo(() => {
    return teamUsers.filter((user) => !user.delete_at);
  }, [teamUsers]);

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
