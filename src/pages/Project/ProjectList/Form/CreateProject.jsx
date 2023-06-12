import { Form, Input, Modal } from "antd";
import React from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const CreateProject = ({ open, onClose, projectsRefetch }) => {
  const [createForm] = Form.useForm();

  const handleCreateProject = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post("projects", values);
          notificationShow(
            "success",
            "Create project successfully"
          );
          createForm.resetFields();
          onClose();
          projectsRefetch();
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
      title="Create project"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateProject}
      onCancel={onClose}
    >
      <Form
        form={createForm}
        layout="vertical"
        name="create_project"
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please enter project name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProject;
