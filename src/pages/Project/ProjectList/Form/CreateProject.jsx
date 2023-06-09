import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ErrorMsg } from "../project-list-styles";
import axiosInstance from "../../../../request/axiosInstance";
import { notificationShow } from "../../../../utils/notificationShow";

const CreateProject = ({ open, onClose, projectsRefetch }) => {
  const [createForm] = Form.useForm();
  const [error, setError] = useState("");

  const handleCreateProject = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post("projects", values);
          notificationShow(
            "success",
            "Create project successfully",
            "Your project already created."
          );
          createForm.resetFields();
          onClose();
          projectsRefetch();
        } catch (e) {
          setError(e.response.data.message);
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
        onFocus={() => setError("")}
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
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default CreateProject;
