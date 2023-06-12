import { Form, Input, Modal } from "antd";
import React from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const AddUser = ({ open, onClose, projectId, projectUsersRefetch }) => {
  const [addForm] = Form.useForm();
  const handleAddUser = () => {
    addForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post(`project-users/${projectId}`, values);
          notificationShow(
            "success",
            "Add user successfully"
          );
          addForm.resetFields();
          onClose();
          projectUsersRefetch();
        } catch (e) {
          errorResponse(e.response);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  return (
    <Modal
      title="Add user to project"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleAddUser}
      onCancel={onClose}
    >
      <Form
        form={addForm}
        layout="vertical"
        name="add_user"
      >
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
