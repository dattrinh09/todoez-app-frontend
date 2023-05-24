import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../request/axiosInstance";
import { notificationShow } from "../../../../../utils/notificationShow";
import { ErrorMsg } from "../project-users-styles";

const UpdateInfo = ({ open, projectId, projectInfo, onClose, projectRefetch }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [updateForm] = Form.useForm();
  useEffect(() => {
    updateForm.setFieldsValue({
        name: projectInfo.name,
        description: projectInfo.description
    })
  }, [projectInfo])
  const handleUpdateInfo = () => {
    updateForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.put(`projects/${projectId}`, values);
          notificationShow(
            "success",
            "Uppdate project successfully",
            "Project information is changed."
          );
          updateForm.resetFields();
          onClose();
          projectRefetch();
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
      title="Update project information"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleUpdateInfo}
      onCancel={onClose}
    >
      <Form
        form={updateForm}
        layout="vertical"
        name="update_info"
        onFocus={() => setErrorMsg("")}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please enter project name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Project Description"
          rules={[
            {
              required: true,
              message: "Please enter project description.",
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default UpdateInfo;
