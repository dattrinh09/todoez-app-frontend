import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { ErrorMsg } from "../team-detail-styles";
import axiosInstance from "../../../../request/axiosInstance";
import { notificationShow } from "../../../../utils/notificationShow";

const ChangeName = ({ open, teamId, onClose, teamRefetch }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [updateForm] = Form.useForm();
  const handleChangeName = () => {
    updateForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.put(`teams/${teamId}`, values);
          notificationShow(
            "success",
            "Uppdate team successfully",
            "Team name is changed."
          );
          updateForm.resetFields();
          onClose();
          teamRefetch();
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
      title="Change team name"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleChangeName}
      onCancel={onClose}
    >
      <Form
        form={updateForm}
        layout="vertical"
        name="update_name"
        onFocus={() => setErrorMsg("")}
      >
        <Form.Item
          name="name"
          label="New name"
          rules={[
            {
              required: true,
              message: "Please fill enter new name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default ChangeName;
