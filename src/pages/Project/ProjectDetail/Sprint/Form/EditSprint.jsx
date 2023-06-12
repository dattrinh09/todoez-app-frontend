import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";

const EditSprint = ({ sprint, projectId, onClose, sprintsRefetch }) => {
  const [editForm] = Form.useForm();

  useEffect(() => {
    editForm.setFieldsValue({
      title: sprint.title,
    });
  }, [sprint]);

  const handleEditSprint = () => {
    editForm
      .validateFields()
      .then(async (values) => {
        const newSprint = {
          title: values.title ? values.title : sprint.title,
        };
        try {
          await axiosInstance.put(`sprints/${projectId}/${sprint.id}`, newSprint);
          notificationShow("success", "Update sprint successfully");
          sprintsRefetch();
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
      title="Edit sprint"
      open={sprint}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditSprint}
      onCancel={onClose}
    >
      <Form
        form={editForm}
        layout="vertical"
        name="edit_sprint"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSprint;
