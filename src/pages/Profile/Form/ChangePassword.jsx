import { Form, Input, Modal } from "antd";
import React from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const ChangePassword = ({ open, onClose }) => {
  const [changeForm] = Form.useForm();
  const handleChangePassword = () => {
    changeForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.put("users/change-password", values);
          notificationShow(
            "success",
            "Change password successfully"
          );
          changeForm.resetFields();
          onClose();
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
      title="Password Change"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleChangePassword}
      onCancel={onClose}
    >
      <Form
        form={changeForm}
        layout="vertical"
        name="change_password"
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please enter your current password.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter your new password.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your new password.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
