import { Form, Input, Modal } from "antd";
import React from "react";
import { useMutateProject } from "@/hooks/project";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const CreateProject = ({ open, onClose, projectsRefetch }) => {
  const [createForm] = Form.useForm();
  const { mutateProjectFn, isMutateProjectLoading } = useMutateProject();

  const handleCreateProject = () => {
    createForm.validateFields().then((values) => {
      mutateProjectFn(
        {
          type: "create",
          param: [values],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Create project successfully");
            projectsRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            createForm.resetFields();
            onClose();
          },
        }
      );
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
        loading: isMutateProjectLoading,
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
