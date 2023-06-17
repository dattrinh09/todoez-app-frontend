import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const EditComment = ({ comment, projectId, onClose, commentsRefetch }) => {
  const [editForm] = Form.useForm();

  useEffect(() => {
    editForm.setFieldsValue({
      content: comment.content,
    });
  }, [comment]);

  const handleEditComment = () => {
    editForm
      .validateFields()
      .then(async (values) => {
        const newComment = {
          content: values.content ? values.content : comment.content,
        };
        try {
          await axiosInstance.put(`comments/${projectId}/${comment.id}`, newComment);
          notificationShow("success", "Update comment successfully");
          commentsRefetch();
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
      title="Edit comment"
      open={comment}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditComment}
      onCancel={onClose}
    >
      <Form
        form={editForm}
        layout="vertical"
        name="edit_comment"
      >
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={3} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditComment;
