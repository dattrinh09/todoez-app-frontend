import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useMutateTeam } from "@/hooks/team";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const EditTeam = ({ open, team, onClose, teamRefetch }) => {
  const [editForm] = Form.useForm();
  const { mutateTeamFn, isMutateTeamLoading } = useMutateTeam();

  useEffect(() => {
    editForm.setFieldsValue({
      name: team.name,
    });
  }, [team]);

  const handleEditTeam = () => {
    editForm.validateFields().then((values) => {
      const newTeam = {
        name: values.name || team.name,
      };
      mutateTeamFn(
        {
          type: "update",
          param: [team.id, newTeam],
        },
        {
          onSuccess: () => {
            notificationShow("success", "Edit Team successfully");
            teamRefetch();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
          onSettled: () => {
            editForm.resetFields();
            onClose();
          },
        }
      );
    });
  };
  return (
    <Modal
      title="Edit team"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditTeam}
      okButtonProps={{
        loading: isMutateTeamLoading,
      }}
      onCancel={onClose}
    >
      <Form form={editForm} layout="vertical" name="edit_team">
        <Form.Item name="name" label="Team Name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTeam;
