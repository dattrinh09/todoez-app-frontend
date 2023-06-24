import { Form, Input, Modal } from "antd";
import React from "react";
import { useMutateProjectUser } from "@/hooks/project-user";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const AddUser = ({ open, onClose, projectId, projectUsersRefetch }) => {
  const [addForm] = Form.useForm();
  const { mutateProjectUserFn, isMutateProjectUserLoading } =
    useMutateProjectUser();

  const handleAddUser = () => {
    addForm.validateFields().then((values) => {
      mutateProjectUserFn(
        {
          type: "create",
          param: [projectId, values],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Add user successfully");
            projectUsersRefetch();
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
      title="Add user to project"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleAddUser}
      okButtonProps={{
        loading: isMutateProjectUserLoading,
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
