import { Input, Modal, List, Space, Button, Empty } from "antd";
import React, { useState } from "react";
import { useMutateTeamUser } from "@/hooks/team-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useGetAllUsers } from "@/hooks/user";

const { confirm } = Modal;

const AddUser = ({ open, onClose, teamId, teamUsersRefetch }) => {
  const [keyword, setKeyword] = useState(undefined);
  const { isAllUsersLoading, allUsers, allUsersRefetch } = useGetAllUsers({
    keyword,
  });
  const { mutateTeamUserFn, isMutateTeamUserLoading } = useMutateTeamUser();

  const handleSearch = (value) => {
    const text = value.replaceAll(" ", "%");
    if (text) setKeyword(text);
    else setKeyword(undefined);
  };

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

  return (
    <Modal
      title="Add user to team"
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Input.Search
        allowClear
        placeholder="Search name or email"
        style={{ width: "100%" }}
        onSearch={handleSearch}
      />
      <div style={{ marginTop: "10px", height: "400px", overflow: "auto" }}>
        {isAllUsersLoading ? (
          <span>Loading ...</span>
        ) : (
          <>
            {allUsers.length > 0 ? (
              <List
                size="small"
                dataSource={allUsers}
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
            ) : (
              <Empty description="No users" />
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddUser;
