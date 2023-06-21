import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useMutateComment } from "@/hooks/comment";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const EditComment = ({ comment, projectId, onClose, commentsRefetch }) => {
  const [editForm] = Form.useForm();
  const { mutateCommentFn, isMutateCommentLoading } = useMutateComment();

  useEffect(() => {
    editForm.setFieldsValue({
      content: comment.content,
    });
  }, [comment]);

  const handleEditComment = () => {
    editForm.validateFields().then((values) => {
      const newComment = {
        content: values.content ?? comment.content,
      };
      mutateCommentFn(
        {
          type: "update",
          param: [projectId, comment.id, newComment],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Update comment successfully");
            commentsRefetch();
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
      title="Edit comment"
      open={!!comment}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditComment}
      okButtonProps={{
        loading: isMutateCommentLoading,
      }}
      onCancel={onClose}
    >
      <Form form={editForm} layout="vertical" name="edit_comment">
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={3} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditComment;
