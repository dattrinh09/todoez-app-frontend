import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import axiosInstance from "../../../../../request/axiosInstance";
import { notificationShow } from "../../../../../utils/notificationShow";
import { ErrorMsg } from "../task-styles";
import {
  PRIORITY_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../../constants/Constants";
import { checkDateInRange } from "../../../../../utils/formatInfo";

const CreateTask = ({
  open,
  onClose,
  sprints,
  assignees,
  projectId,
  tasksRefetch,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [createForm] = Form.useForm();
  
  const handleCreateTask = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        const newTask = {
          ...values,
          end_time: new Date(values.end_time.$d).toString(),
        };

        try {
          await axiosInstance.post(`tasks/${projectId}`, newTask);
          notificationShow("success", "Create tasks successfully");
          createForm.resetFields();
          tasksRefetch();
          onClose();
        } catch (e) {
          setErrorMsg(e.response.data.message);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  return (
    <Modal
      title="Create task"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateTask}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_task">
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please enter task content.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please choose task type.",
            },
          ]}
        >
          <Select allowClear>
            {TYPE_OPTIONS.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[
            {
              required: true,
              message: "Please choose task priority.",
            },
          ]}
        >
          <Select allowClear>
            {PRIORITY_OPTIONS.map((option) => (
              <Select.Option key={option.id} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="sprint_id"
          label="Sprint"
          rules={[
            {
              required: true,
              message: "Please choose sprint.",
            },
          ]}
        >
          <Select allowClear>
            {sprints.map((option) => (
              <Select.Option key={option.id} value={option.id}>
                {option.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="assignee_id"
          label="Assignee"
          rules={[
            {
              required: true,
              message: "Please choose assignee.",
            },
          ]}
        >
          <Select allowClear>
            {assignees.map((option) => (
              <Select.Option key={option.id} value={option.user.id}>
                {option.user.fullname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="end_time"
          label="Due date"
          dependencies={["sprint_id"]}
          rules={[
            {
              required: true,
              message: "Please choose due date.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const s = sprints.find(
                  (i) => i.id === getFieldValue("sprint_id")
                );
                const isInRange = checkDateInRange(
                  value.$d,
                  s.start_time,
                  s.end_time
                );

                if (!value || isInRange) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Selected due date not in sprint range")
                );
              },
            }),
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default CreateTask;
