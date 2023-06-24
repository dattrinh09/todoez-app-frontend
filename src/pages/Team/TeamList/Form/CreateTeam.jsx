import { Form, Input, Modal } from "antd";
import React from "react";
import { useMutateTeam } from "@/hooks/team";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const CreateTeam = ({ open, onClose, teamsRefetch }) => {
  const { mutateTeamFn, isMutateTeamLoading } = useMutateTeam();
  const [createForm] = Form.useForm();

  const handleCreateTeam = () => {
    createForm.validateFields().then((values) => {
      mutateTeamFn(
        {
          type: "create",
          param: [values],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Create team successfully");
            teamsRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            createForm.resetFields();
            onClose();
          },
        }
      );
    });
  };
  return (
    <Modal
      title="Create Team"
      open={open}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isMutateTeamLoading,
      }}
      onOk={handleCreateTeam}
      onCancel={onClose}
    >
      <Form form={createForm} layout="vertical" name="create_team">
        <Form.Item
          name="name"
          label="Team Name"
          rules={[
            {
              required: true,
              message: "Please enter team name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTeam;
