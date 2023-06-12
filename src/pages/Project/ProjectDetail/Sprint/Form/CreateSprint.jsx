import { DatePicker, Form, Input, Modal } from "antd";
import React from "react";
import axiosInstance from "@/request/axiosInstance";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { RangePicker } = DatePicker;

const CreateSprint = ({ open, onClose, projectId, sprintsRefetch }) => {
  const [createForm] = Form.useForm();
  const handleCreateSprint = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        const newSprint = {
          title: values.title,
          start_at: new Date(values.range[0].$d).toString(),
          end_at: new Date(values.range[1].$d).toString(),
        };
        try {
          await axiosInstance.post(`sprints/${projectId}`, newSprint);
          notificationShow("success", "Create sprint successfully");
          createForm.resetFields();
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
      title="Create sprint"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateSprint}
      onCancel={onClose}
    >
      <Form
        form={createForm}
        layout="vertical"
        name="create_sprint"
      >
        <Form.Item
          name="title"
          label="Sprint title"
          rules={[
            {
              required: true,
              message: "Please enter sprint title.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="range"
          label="Sprint range time"
          rules={[
            {
              required: true,
              message: "Please pick sprint range time.",
            },
          ]}
        >
          <RangePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSprint;
