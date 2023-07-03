import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";
import { checkDateInRange } from "@/utils/formatInfo";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/Constants";
import moment from "moment";
import { useMutateTask } from "@/hooks/task";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const UpdateTask = ({
  open,
  onClose,
  projectId,
  task,
  sprints,
  users,
  taskRefetch,
}) => {
  const [updateForm] = Form.useForm();
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  useEffect(() => {
    const assignee = users.find((user) => user.id === task.assignee.id);
    const reporter = users.find((user) => user.id === task.reporter.id);

    updateForm.setFieldsValue({
      content: task.content,
      description: task.description,
      sprint_id: task.sprint.id,
      type: task.type,
      status: task.status,
      priority: task.priority,
      assignee_id: assignee ? task.assignee.id : undefined,
      reporter_id: reporter ? task.reporter.id : undefined,
    });
  }, [task]);

  const handleUpdateTask = () => {
    updateForm.validateFields().then((values) => {
      const newTask = {
        content: values.content || task.content,
        description: values.description || task.description,
        sprint_id: values.sprint_id || task.sprint.id,
        end_at: values.end_at
          ? new Date(values.end_at.$d).toString()
          : task.end_at,
        type: values.type || task.type,
        status: values.status || task.status,
        priority: values.priority || task.priority,
        assignee_id: values.assignee_id || task.assignee.id,
        reporter_id: values.reporter_id || task.reporter.id,
      };

      mutateTaskFn(
        {
          type: "update",
          param: [projectId, task.id, newTask],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Update task successfully");
            taskRefetch();
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
      title="Update task"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleUpdateTask}
      okButtonProps={{
        loading: isMutateTaskLoading,
      }}
      onCancel={onClose}
    >
      <Form form={updateForm} name="update_task" layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="content" label="Content">
              <Input placeholder="Content..." />
            </Form.Item>
            <Form.Item name="sprint_id" label="Sprint">
              <Select allowClear>
                {sprints.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="end_at"
              dependencies={["sprint_id"]}
              label="Due date"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const s = sprints.find(
                      (i) => i.id === getFieldValue("sprint_id")
                    );
                    const date = value ? value.$d : task.end_at;
                    const isInRange = s
                      ? checkDateInRange(date, s.start_at, s.end_at)
                      : false;

                    if (isInRange) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Selected due date not in sprint range")
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                placeholder={moment(task.end_at).format("YYYY-MM-DD")}
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name="reporter_id" label="Reporter">
              <Select allowClear>
                {users.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.user.fullname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="type" label="Type">
              <Select allowClear placeholder="Type">
                {TYPE_OPTIONS.map((option) => (
                  <Select.Option key={option.id} value={option.value}>
                    <span style={{ color: `${option.color}`}}>{option.label}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select allowClear>
                {STATUS_OPTIONS.map((option) => (
                  <Select.Option key={option.id} value={option.value}>
                    <span style={{ color: `${option.color}`}}>{option.label}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="priority" label="Priority">
              <Select allowClear>
                {PRIORITY_OPTIONS.map((option) => (
                  <Select.Option key={option.id} value={option.value}>
                    <span style={{ color: `${option.color}`}}>{option.label}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="assignee_id" label="Assignee">
              <Select allowClear>
                {users.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.user.fullname}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description">
          <Input.TextArea allowClear rows={5} placeholder="Description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTask;
