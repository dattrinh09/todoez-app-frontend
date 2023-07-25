import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateNote } from "@/hooks/note";

const EditNote = ({ note, onClose, teamId, notesRefetch }) => {
  const [editForm] = Form.useForm();
  const { mutateNoteFn, isMutateNoteLoading } = useMutateNote();

  useEffect(() => {
    editForm.setFieldsValue({
      content: note.content,
      description: note.description,
    });
  }, [editForm, note]);

  const handleUpdateNote = () => {
    editForm.validateFields().then((values) => {
      const newNote = {
        content: values.content ? values.content : note.content,
        description: values.description ? values.description : note.description,
      };
      mutateNoteFn(
        {
          type: "update",
          param: [teamId, note.id, newNote],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Update note successfully");
            notesRefetch();
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
      title="Edit Note"
      open={!!note}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isMutateNoteLoading,
      }}
      onOk={handleUpdateNote}
      onCancel={onClose}
      width={800}
    >
      <Form form={editForm} layout="vertical" name="edit_note">
        <Form.Item name="content" label="Content">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={10} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditNote;
