import { Form, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoStore } from "@/stores/reducers/userSlice";
import { useMutateProfile } from "@/hooks/profile";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
};

const ChangeAvatar = ({ open, onClose }) => {
  const [changeForm] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { mutateProfileFn, isMutateProfileLoading } = useMutateProfile();

  const beforeUpload = (file) => {
    const imageType = file.name.toLocaleLowerCase().match(/\.[^.]*$/)?.[0];
    const isLt5M = file.size / 1024 / 1024 < 5;
    const isJpgOrPng = imageType === ".jpg" || imageType === ".png";

    const isFileError = (isJpgOrPng && isLt5M) || Upload.LIST_IGNORE;

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return isFileError;
    }

    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return isFileError;
    }

    return false;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file;
  };

  const handleChange = async (info) => {
    try {
      const res = await getBase64(info.fileList[0].originFileObj);
      setImageUrl(res);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleUploadAvatar = () => {
    if (imageUrl) {
      mutateProfileFn(
        {
          type: "changeAvatar",
          body: { avatar: imageUrl },
        },
        {
          onSuccess: (data) => {
            message.success("Change avatar successfully");
            dispatch(userInfoStore(data.data.user_info));
            setImageUrl("");
            onClose();
          },
          onError: (error) => {
            errorResponse(error.response);
          },
        }
      );
    }
  };

  const handleClose = () => {
    setImageUrl("");
    onClose();
  };

  return (
    <Modal
      title="Avatar"
      open={open}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        loading: isMutateProfileLoading,
      }}
      onOk={handleUploadAvatar}
      onCancel={handleClose}
    >
      <Form form={changeForm} layout="vertical" name="change_avatar">
        <Form.Item
          label="Upload avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            beforeUpload={beforeUpload}
            onPreview={() => setPreviewOpen(true)}
            onChange={handleChange}
          >
            <div>
              <UploadOutlined />
            </div>
          </Upload>
        </Form.Item>
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img alt="example" src={imageUrl} style={{ maxWidth: "400px" }} />
        </Modal>
      </Form>
    </Modal>
  );
};

export default ChangeAvatar;
