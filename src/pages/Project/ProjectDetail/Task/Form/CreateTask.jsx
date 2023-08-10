import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { PRIORITY_OPTIONS, TYPE_OPTIONS } from "@/constants/Constants";
import { checkDateInRange } from "@/utils/formatInfo";
import { useMutateTask } from "@/hooks/task";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const CreateTask = ({
  open,
  onClose,
  sprints,
  assignees,
  projectId,
  tasksRefetch,
}) => {
  const [createForm] = Form.useForm();
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  const handleCreateTask = () => {
    createForm.validateFields().then((values) => {
      const newTask = {
        ...values,
        end_at: new Date(values.end_at.$d).toString(),
      };
      mutateTaskFn(
        {
          type: "create",
          param: [projectId, newTask],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Create task successfully");
            tasksRefetch();
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
      title="Create task"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateTask}
      okButtonProps={{
        loading: isMutateTaskLoading,
      }}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_task">
        <Row gutter={16}>
          <Col span={12}>
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
              name="end_at"
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
                    const isInRange = s
                      ? checkDateInRange(value.$d, s.start_at, s.end_at)
                      : false;

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
              <DatePicker
                format="YYYY-MM-DD HH"
                style={{ width: "100%" }}
                showTime={{
                  format: "HH",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                    <span style={{ color: `${option.color}` }}>
                      {option.label}
                    </span>
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
                    <span style={{ color: `${option.color}` }}>
                      {option.label}
                    </span>
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
              <Select
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label.toLocaleLowerCase() ?? "").includes(input)
                }
                options={assignees}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter task description.",
            },
          ]}
        >
          <Input.TextArea allowClear rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTask;
