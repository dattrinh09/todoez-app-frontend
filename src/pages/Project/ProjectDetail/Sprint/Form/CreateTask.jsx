import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React, { useMemo } from "react";
import { PRIORITY_OPTIONS, TYPE_OPTIONS } from "@/constants/Constants";
import { checkDateInRange } from "@/utils/formatInfo";
import { useMutateTask } from "@/hooks/task";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";
import { useGetProjectUsers } from "@/hooks/project-user";

const CreateTask = ({ sprint, onClose, projectId, sprintsRefetch }) => {
  const [createForm] = Form.useForm();
  const { mutateTaskFn, isMutateTaskLoading } = useMutateTask();

  const { projectUsers, isProjectUsersLoading } = useGetProjectUsers(projectId);

  const assignees = useMemo(() => {
    return projectUsers
      ? projectUsers.list.filter((user) => !user.delete_at)
      : [];
  }, [projectUsers]);

  const handleCreateTask = () => {
    createForm.validateFields().then((values) => {
      const newTask = {
        ...values,
        sprint_id: sprint.id,
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
      title="Create task"
      open={sprint}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateTask}
      okButtonProps={{
        loading: isMutateTaskLoading,
      }}
      onCancel={onClose}
    >
      {isProjectUsersLoading ? (
        <div>Loading...</div>
      ) : (
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
              >
                <Select disabled placeholder={sprint.title} /> 
              </Form.Item>
              <Form.Item
                name="end_at"
                label="Due date"
                rules={[
                  {
                    required: true,
                    message: "Please choose due date.",
                  },
                  () => ({
                    validator(_, value) {
                      const isInRange = checkDateInRange(
                        value.$d,
                        sprint.start_at,
                        sprint.end_at
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
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
                <Select allowClear>
                  {assignees.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.user.fullname}
                    </Select.Option>
                  ))}
                </Select>
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
      )}
    </Modal>
  );
};

export default CreateTask;
