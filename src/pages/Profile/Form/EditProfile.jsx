import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";
import { useDispatch } from "react-redux";
import { userInfoStore } from "../../../stores/reducers/userSlice";
import { ErrorMsg } from "../profile-styles";
import { PhoneNumberFormat } from "../../../constants/Constants";

const EditProfile = ({ open, onClose, info }) => {
  const dispatch = useDispatch();
  const [editForm] = Form.useForm();
  const [error, setError] = useState("");
  useEffect(() => {
    editForm.setFieldsValue({
      fullname: info.fullname,
      phone_number: info.phone_number,
    });
  }, [info, editForm]);
  const handleEditProfile = () => {
    editForm
      .validateFields()
      .then(async (values) => {
        console.log(values);
        try {
          const res = await axiosInstance.put("users/update-profile", values);
          notificationShow(
            "success",
            "Update profile successfully",
            "Your profile already updated."
          );
          dispatch(userInfoStore(res.data.user_info));
          onClose();
        } catch (e) {
          console.log(e);
          setError(e.response.data.message);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  return (
    <Modal
      title="Profile Edit"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditProfile}
      onCancel={onClose}
    >
      <Form
        form={editForm}
        layout="vertical"
        name="edit_profile"
        onFocus={() => setError("")}
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your full name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Nummber"
          rules={[
            {
              required: true,
              message: "Please enter your new phone number.",
            },
            () => ({
              validator(_, value) {
                if (!value || value.match(PhoneNumberFormat)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Phone number not valid")
                );
              },
            })
          ]}
        >
          <Input />
        </Form.Item>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default EditProfile;
