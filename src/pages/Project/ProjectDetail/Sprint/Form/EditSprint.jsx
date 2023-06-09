import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ErrorMsg } from "../sprint-styles";
import axiosInstance from "../../../../../request/axiosInstance";
import { notificationShow } from "../../../../../utils/notificationShow";

const EditSprint = ({ sprint, projectId, onClose, sprintsRefetch }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [editForm] = Form.useForm();

  useEffect(() => {
    editForm.setFieldsValue({
      title: sprint.title,
    });
  }, [sprint]);

  const handleEditSprint = () => {
    editForm
      .validateFields()
      .then(async (values) => {
        const newSprint = {
          title: values.title ? values.title : sprint.title,
        };
        try {
          await axiosInstance.put(`sprints/${projectId}/${sprint.id}`, newSprint);
          notificationShow("success", "Update sprint successfully");
          editForm.resetFields();
          sprintsRefetch();
          onClose();
        } catch (e) {
          console.log(e);
          setErrorMsg(e.response.data.message);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };

  return (
    <Modal
      title="Edit sprint"
      open={sprint}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditSprint}
      onCancel={onClose}
    >
      <Form
        form={editForm}
        layout="vertical"
        name="edit_sprint"
        onFocus={() => setErrorMsg("")}
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default EditSprint;
