import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import {
  ChangePass,
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
import { Avatar, Button } from "antd";
import ChangePassword from "./Form/ChangePassword";
import EditProfile from "./Form/EditProfile";
import { useSelector } from "react-redux";
import { userSelector } from "@/stores/selectors";
import ChangeAvatar from "./Form/ChangeAvatar";

const Profile = () => {
  const { userInfo } = useSelector(userSelector);
  const [change, setChange] = useState(false);
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  return (
    <MainLayout>
      <Header />
      <Container>
        <UserPhoto
          size="large"
          style={{ backgroundColor: "#1677ff", color: "fff" }}
          src={userInfo.avatar || ""}
        >
          {!userInfo.avatar && formatDisplayName(userInfo.fullname)}
        </UserPhoto>
        {upload && (
          <ChangeAvatar
            open={upload}
            url={"image.png"}
            onClose={() => setUpload(false)}
          />
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
              {userInfo.phone_number &&
                formatPhoneNumber(userInfo.phone_number)}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Create at:
              </Label>
              {formatDate2(userInfo.create_at, "LL")}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Update at:
              </Label>
              {formatDate2(userInfo.update_at, "LL")}
            </InfoItem>
          </Info>
          <ChangePass>
            <Button
              type="primary"
              onClick={() => setChange(true)}
              disabled={!userInfo.is_email_signin}
            >
              Change password
            </Button>
            {change && (
              <ChangePassword open={change} onClose={() => setChange(false)} />
            )}
          </ChangePass>
        </Section>
        <EditProf>
          <Button icon={<EditOutlined />} onClick={() => setEdit(true)}>
            Edit profile
          </Button>
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
