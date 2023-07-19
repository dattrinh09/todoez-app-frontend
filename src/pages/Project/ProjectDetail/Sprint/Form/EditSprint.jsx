import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useMutateSprint } from "@/hooks/sprint";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const EditSprint = ({ sprint, projectId, onClose, sprintsRefetch }) => {
  const [editForm] = Form.useForm();
  const { mutateSprintFn, isMutateSprintLoading } = useMutateSprint();

  useEffect(() => {
    editForm.setFieldsValue({
      title: sprint.title,
    });
  }, [sprint]);

  const handleEditSprint = () => {
    editForm.validateFields().then((values) => {
      const newSprint = { title: values.title ? values.title : sprint.title };

      mutateSprintFn(
        {
          type: "update",
          param: [projectId, sprint.id, newSprint],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Update sprint successfully");
            sprintsRefetch();
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
      title="Edit sprint"
      open={!!sprint}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditSprint}
      okButtonProps={{
        loading: isMutateSprintLoading,
      }}
      onCancel={onClose}
    >
      <Form form={editForm} layout="vertical" name="edit_sprint">
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSprint;
