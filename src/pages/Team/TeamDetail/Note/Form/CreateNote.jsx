import { Form, Input, Modal } from "antd";
import React from "react";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateNote } from "@/hooks/note";

const CreateNote = ({ open, onClose, teamId, notesRefetch }) => {
  const [createForm] = Form.useForm();
  const { mutateNoteFn, isMutateNoteLoading } = useMutateNote();

  const handleCreateNote = () => {
    createForm.validateFields().then((values) => {
      mutateNoteFn(
        {
          type: "create",
          param: [teamId, values],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Create note successfully");
            notesRefetch();
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
      title="Create Note"
      width={800}
      open={open}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isMutateNoteLoading,
      }}
      onOk={handleCreateNote}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_note">
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please enter note content.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter note description.",
            },
          ]}
        >
          <Input.TextArea rows={5} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNote;
