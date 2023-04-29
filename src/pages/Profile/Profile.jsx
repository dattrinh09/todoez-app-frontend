import React, { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
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
  formatDate,
  formatDisplayName,
  formatPhoneNumber,
} from "../../utils/formatInfo";
import { Button } from "antd";
import ChangePassword from "./Form/ChangePassword";
import EditProfile from "./Form/EditProfile";
import { useSelector } from "react-redux";
import { userSelector } from "../../stores/selectors";

const Profile = () => {
  const { userInfo } = useSelector(userSelector);
  const [change, setChange] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <MainLayout>
      <Header />
      <Container>
        <UserPhoto>{formatDisplayName(userInfo.fullname)}</UserPhoto>
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
              {userInfo.phone_number && formatPhoneNumber(userInfo.phone_number)}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Create time:
              </Label>
              {formatDate(userInfo.create_time).toLocaleString()}
            </InfoItem>
            <InfoItem>
              <Label>
                <CalendarOutlined /> Update time:
              </Label>
              {formatDate(userInfo.update_time).toLocaleString()}
            </InfoItem>
          </Info>
          <ChangePass>
            <Button
              type="primary"
              size="large"
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
