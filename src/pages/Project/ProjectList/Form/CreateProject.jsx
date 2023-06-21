import { Form, Input, Modal } from "antd";
import React from "react";
import { useCreateProject } from "@/hooks/project";

const CreateProject = ({ open, onClose, projectsRefetch }) => {
  const [createForm] = Form.useForm();
  const { createProject, isCreateProjectLoading } = useCreateProject(
    projectsRefetch,
    onClose
  );

  const handleCreateProject = () => {
    createForm.validateFields().then((values) => {
      createProject(values);
    });
  };
  return (
    <Modal
      title="Create project"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateProject}
      okButtonProps={{
        loading: isCreateProjectLoading,
      }}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_project">
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
