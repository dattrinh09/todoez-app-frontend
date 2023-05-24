import { DatePicker, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { formatDate } from "../../../../../utils/formatInfo";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../request/axiosInstance";
import { notificationShow } from "../../../../../utils/notificationShow";
import { ErrorMsg } from "../sprint-styles";

const { RangePicker } = DatePicker;

const CreateSprint = ({ open, onClose }) => {
  const params = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [createForm] = Form.useForm();
  const handleCreateSprint = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        const newSprint = {
          title: values.title,
          start_time: new Date(values.range[0].$d).toString(),
          end_time: new Date(values.range[1].$d).toString(),
          project_id: Number(params.project_id), 
        };
        console.log(newSprint);
        try {
          await axiosInstance.post('sprints', newSprint);
          notificationShow("success", "Create sprint successfully");
          createForm.resetFields();
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
      title="Create sprint"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleCreateSprint}
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
          <RangePicker
            //showTime={{ format: "HH:mm:ss" }}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default CreateSprint;
