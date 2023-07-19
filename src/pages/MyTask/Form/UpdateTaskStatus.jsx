import { Form, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { STATUS_OPTIONS } from "@/constants/Constants";
import { useMutateTask } from "@/hooks/task/useMutateTask";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const UpdateTaskStatus = ({ task, onClose, myTasksRefetch }) => {
  const [updateForm] = Form.useForm();
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  useEffect(() => {
    updateForm.setFieldsValue({
      status: task.status.value,
    });
  }, [updateForm, task]);

  const handleUpdateTaskStatus = () => {
    updateForm.validateFields().then((values) => {
      const newTask = {
        status: values.status ? values.status : task.status,
      };

      mutateTaskFn(
        {
          type: "updateStatus",
          param: [task.sprint.project.id, task.id, newTask],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Update task status successfully");
            myTasksRefetch();
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
      title="Update Task Status"
      open={!!task}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isMutateTaskLoading,
      }}
      onOk={handleUpdateTaskStatus}
      onCancel={onClose}
    >
      <Form form={updateForm} layout="vertical" name="update_task_status">
        <Form.Item name="status" label="Status">
          <Select allowClear>
            {STATUS_OPTIONS.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                <span style={{ color: `${option.color}`}}>{option.label}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTaskStatus;
