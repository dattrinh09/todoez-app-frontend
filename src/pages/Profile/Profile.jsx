import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import {
  ButtonGroup,
  Container,
  EditProf,
  Header,
  Info,
  InfoItem,
  Label,
  Section,
  UserName,
  UserPhoto,
} from "./profile-styles";
import {
  formatDate2,
  formatDisplayName,
  formatPhoneNumber,
} from "@/utils/formatInfo";
import { Button, Modal, Space } from "antd";
import ChangePassword from "./Form/ChangePassword";
import EditProfile from "./Form/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { userInfoStore } from "@/stores/reducers/userSlice";
import { userSelector } from "@/stores/selectors";
import ChangeAvatar from "./Form/ChangeAvatar";
import { useMutateProfile } from "@/hooks/profile";
import { notificationShow } from "@/utils/notificationShow";
import { errorResponse } from "@/utils/errorResponse";

const { confirm } = Modal;

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(userSelector);
  const [change, setChange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const { mutateProfileFn, isMutateProfileLoading } = useMutateProfile();

  const handleDeleteAvatar = () => {
    confirm({
      title: "Do you want to delete avatar?",
      okText: "Yes",
      cancelText: "No",
      okButtonProps: {
        loading: isMutateProfileLoading,
      },
      onOk: () => {
        mutateProfileFn(
          {
            type: "deleteAvatar",
            body: null,
          },
          {
            onSuccess: (data) => {
              notificationShow("success", "Delete avatar successfully");
              dispatch(userInfoStore(data.data.user_info));
            },
            onError: (error) => {
              errorResponse(error.response);
            },
          }
        );
      },
    });
  };
  return (
    <MainLayout>
      <Header />
      <Container>
        <UserPhoto
          size="large"
          style={{ backgroundColor: "#1677ff", color: "fff" }}
          src={userInfo.avatar || ""}
        >
          <span>
            {!userInfo.avatar && formatDisplayName(userInfo.fullname)}
          </span>
        </UserPhoto>
        <ButtonGroup>
          <Space>
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<EditOutlined />}
              onClick={() => setUpload(true)}
            />
            <Button
              type="primary"
              shape="circle"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteAvatar}
            />
          </Space>
        </ButtonGroup>
        {upload && (
          <ChangeAvatar open={upload} onClose={() => setUpload(false)} />
        )}
        <Section>
          <UserName>{userInfo.fullname}</UserName>
          <Info>
            <InfoItem>
              <Label>
                <MailOutlined /> Email:
              </Label>
              {userInfo.email}
            </InfoItem>
            <InfoItem>
              <Label>
                <PhoneOutlined /> Phone number:
              </Label>
              {userInfo.phone_number
                ? formatPhoneNumber(userInfo.phone_number)
                : "No phone number"}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Create at:
              </Label>
              {formatDate2(userInfo.create_at, "LLL")}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Update at:
              </Label>
              {formatDate2(userInfo.update_at, "LLL")}
            </InfoItem>
          </Info>
        </Section>
        <EditProf>
          <Space>
            <Button
              icon={<LockOutlined />}
              type="primary"
              onClick={() => setChange(true)}
              disabled={!userInfo.is_email_signin}
            >
              Change password
            </Button>
            <Button icon={<EditOutlined />} onClick={() => setEdit(true)}>
              Edit profile
            </Button>
          </Space>
          {change && (
            <ChangePassword open={change} onClose={() => setChange(false)} />
          )}
          {edit && (
            <EditProfile
              open={edit}
              onClose={() => setEdit(false)}
              info={userInfo}
            />
          )}
        </EditProf>
      </Container>
    </MainLayout>
  );
};

export default Profile;
