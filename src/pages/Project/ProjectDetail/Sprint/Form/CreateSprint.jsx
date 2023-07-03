import { DatePicker, Form, Input, Modal } from "antd";
import React from "react";
import { useMutateSprint } from "@/hooks/sprint";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { RangePicker } = DatePicker;

const CreateSprint = ({ open, onClose, projectId, sprintsRefetch }) => {
  const [createForm] = Form.useForm();
  const { mutateSprintFn, isMutateSprintLoading } = useMutateSprint();

  const handleCreateSprint = () => {
    createForm.validateFields().then((values) => {
      const newSprint = {
        title: values.title,
        start_at: new Date(values.range[0].$d).toString(),
        end_at: new Date(values.range[1].$d).toString(),
      };

      mutateSprintFn(
        {
          type: "create",
          param: [projectId, newSprint],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Create sprint successfully");
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
      title="Create sprint"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateSprint}
      okButtonProps={{
        loading: isMutateSprintLoading,
      }}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_sprint">
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
          <RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSprint;
