import { Form, Input, Modal } from "antd";
import React from "react";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateTeamUser } from "@/hooks/team-user";

const AddUser = ({ open, onClose, teamId, teamUsersRefetch }) => {
  const { mutateTeamUserFn, isMutateTeamUserLoading } = useMutateTeamUser();
  const [addForm] = Form.useForm();

  const handleAddUser = () => {
    addForm.validateFields().then((values) => {
      mutateTeamUserFn(
        {
          type: "create",
          param: [teamId, values],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Add user successfully");
            teamUsersRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            onClose();
          },
        }
      );
    });
  };
  return (
    <Modal
      title="Add user to team"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleAddUser}
      okButtonProps={{
        loading: isMutateTeamUserLoading,
      }}
      onCancel={onClose}
    >
      <Form form={addForm} layout="vertical" name="add_user">
        <Form.Item
          name="email"
          label="Enter user e-mail"
          rules={[
            {
              type: "email",
              message: "E-mail not valid.",
            },
            {
              required: true,
              message: "Please fill in your e-mail.",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
