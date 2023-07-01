import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useMutateProject } from "@/hooks/project";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const EditProject = ({ open, project, onClose, projectRefetch }) => {
  const [editForm] = Form.useForm();
  const { mutateProjectFn, isMutateProjectLoading } = useMutateProject();

  useEffect(() => {
    editForm.setFieldsValue({
      name: project.name,
    });
  }, [project]);

  const handleEditProject = () => {
    editForm.validateFields().then((values) => {
      const newProject = {
        name: values.name || project.name,
      };
      mutateProjectFn(
        {
          type: "update",
          param: [project.id, newProject],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Edit project successfully");
            projectRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            editForm.resetFields();
            onClose();
          },
        }
      );
    });
  };
  return (
    <Modal
      title="Edit project"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditProject}
      okButtonProps={{
        loading: isMutateProjectLoading,
      }}
      onCancel={onClose}
    >
      <Form form={editForm} layout="vertical" name="edit_project">
        <Form.Item name="name" label="Project Name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProject;
