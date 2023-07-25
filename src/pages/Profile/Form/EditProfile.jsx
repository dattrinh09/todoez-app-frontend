import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { notificationShow } from "@/utils/notificationShow";
import { useDispatch } from "react-redux";
import { userInfoStore } from "@/stores/reducers/userSlice";
import { PhoneNumberFormat } from "@/constants/Constants";
import { errorResponse } from "@/utils/errorResponse";
import { useMutateProfile } from "@/hooks/profile";

const EditProfile = ({ open, onClose, info }) => {
  const dispatch = useDispatch();
  const [editForm] = Form.useForm();
  const { mutateProfileFn, isMutateProfileLoading } = useMutateProfile();

  useEffect(() => {
    editForm.setFieldsValue({
      fullname: info.fullname,
      phone_number: info.phone_number,
    });
  }, [info, editForm]);
  const handleEditProfile = () => {
    editForm.validateFields().then((values) => {
      mutateProfileFn(
        {
          type: "updateProfile",
          body: values,
        },
        {
          onSuccess: (data) => {
            notificationShow("success", "Update profile successfully");
            dispatch(userInfoStore(data.data.user_info));
            onClose();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
        }
      );
    });
  };
  return (
    <Modal
      title="Profile Edit"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onOk={handleEditProfile}
      okButtonProps={{
        loading: isMutateProfileLoading,
      }}
      onCancel={onClose}
    >
      <Form form={editForm} layout="vertical" name="edit_profile">
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your fullname.",
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
              message: "Please enter your phone number.",
            },
            () => ({
              validator(_, value) {
                if (!value || value.match(PhoneNumberFormat)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Phone number must be at least 10 character and start at 0, 1, 3, 5, 7, 8 or 9."
                  )
                );
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfile;
