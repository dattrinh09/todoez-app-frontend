import { Modal, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import Loader from "@/components/Loader/Loader";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notificationShow("error", "You can only upload JPG/PNG file!");
  }

  const isLessThan2M = file.size / 1024 / 1024 < 2;
  if (!isLessThan2M) {
    notificationShow("error", "Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLessThan2M;
};

const ChangeAvatar = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  
  const handleUpload = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleChangeAvatar = () => {
    console.log(imageUrl);
  };
  return (
    <Modal
      title="Avatar"
      open={open}
      okText="Save"
      cancelText="Cancel"
      onCancel={onClose}
    >
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUpload}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          <div>
            {loading ? <Loader /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        )}
      </Upload>
    </Modal>
  );
};

export default ChangeAvatar;
