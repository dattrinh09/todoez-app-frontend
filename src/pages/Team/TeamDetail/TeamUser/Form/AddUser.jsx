import { Input, Modal, List, Space, Button } from "antd";
import React, { useMemo, useState } from "react";
import { useMutateTeamUser } from "@/hooks/team-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useGetAllUsers } from "@/hooks/user";

const { confirm } = Modal;

const AddUser = ({ open, onClose, teamId, teamUsersRefetch }) => {
  const [keyword, setKeyword] = useState("");
  const { isAllUsersLoading, allUsers, allUsersRefetch } = useGetAllUsers();
  const { mutateTeamUserFn, isMutateTeamUserLoading } =
    useMutateTeamUser();

  const data = useMemo(() => {
    return allUsers
      ? allUsers
          .filter(
            (item) =>
              !item.team_users.find((i) => {
                return i.team_id === Number(teamId) && !i.delete_at;
              })
          )
          .filter((user) => {
            return (
              user.fullname.toLowerCase().includes(keyword) ||
              user.email.toLowerCase().includes(keyword)
            );
          })
      : [];
  }, [allUsers, keyword]);

  const handleAddUser = (email) => {
    confirm({
      title: "Do you want to add this user to team?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateTeamUserLoading,
      },
      onOk: () => {
        mutateTeamUserFn(
          {
            type: "create",
            param: [teamId, { email }],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Add user successfully");
              allUsersRefetch();
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

  const handleClose = () => {
    setKeyword("");
    onClose();
  };

  return (
    <Modal
      title="Add user to team"
      open={open}
      onCancel={handleClose}
      width={800}
      footer={null}
    >
      <Input
        placeholder="Search name or email"
        value={keyword}
        style={{ width: "100%" }}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div style={{ marginTop: "10px", height: "400px", overflow: "auto" }}>
        {isAllUsersLoading ? (
          <span>Loading ...</span>
        ) : (
          <>
            {data.length > 0 && (
              <List
                size="small"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    extra={[
                      <Button
                        size="small"
                        type="primary"
                        style={{ backgroundColor: "#52c41a" }}
                        onClick={() => handleAddUser(item.email)}
                      >
                        Add
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <span>{item.fullname}</span>
                          <span style={{ fontStyle: "italic", color: "#888" }}>
                            email:
                          </span>
                          <span style={{ color: "#1677ff" }}>{item.email}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddUser;
