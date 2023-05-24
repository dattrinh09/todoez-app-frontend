import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ErrorMsg } from "../project-users-styles";
import axiosInstance from "../../../../../request/axiosInstance";
import { notificationShow } from "../../../../../utils/notificationShow";

const AddUser = ({ open, projectId, onClose, projectRefetch, projectUsersRefetch }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [addForm] = Form.useForm();
  const handleAddUser = () => {
    addForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post(`project-users/${projectId}`, values);
          notificationShow(
            "success",
            "Add user successfully",
            "User added in this project."
          );
          addForm.resetFields();
          onClose();
          projectRefetch();
          projectUsersRefetch();
        } catch (e) {
          setErrorMsg(e.response.data.message);
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
        onFocus={() => setErrorMsg("")}
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
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default AddUser;
