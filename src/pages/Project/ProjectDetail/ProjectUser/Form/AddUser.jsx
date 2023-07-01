import { Input, Modal, List, Space, Button } from "antd";
import React, { useMemo, useState } from "react";
import { useMutateProjectUser } from "@/hooks/project-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useGetAllUsers } from "@/hooks/user";

const { confirm } = Modal;

const AddUser = ({ open, onClose, projectId, projectUsersRefetch }) => {
  const [keyword, setKeyword] = useState("");
  const { isAllUsersLoading, allUsers, allUsersRefetch } = useGetAllUsers();
  const { mutateProjectUserFn, isMutateProjectUserLoading } =
    useMutateProjectUser();

  const data = useMemo(() => {
    return allUsers
      ? allUsers
          .filter(
            (item) =>
              !item.project_users.find((i) => {
                return i.project_id === Number(projectId) && !i.delete_at;
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
      title: "Do you want to add this user to project?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateProjectUserLoading,
      },
      onOk: () => {
        mutateProjectUserFn(
          {
            type: "create",
            param: [projectId, { email }],
          },
          {
            onSuccess: () => {
              notificationShow("success", "Add user successfully");
              allUsersRefetch();
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

  const handleClose = () => {
    setKeyword("");
    onClose();
  };

  return (
    <Modal
      title="Add user to project"
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
