import React from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Loader from "@/components/Loader/Loader";
import { useParams } from "react-router-dom";
import { useGetUserProfile } from "../../hooks/user";
import {
  Container,
  Header,
  Info,
  InfoItem,
  Label,
  Section,
  UserName,
  UserPhoto,
} from "./user-profile-styles";
import {
  formatDate2,
  formatDisplayName,
  formatPhoneNumber,
} from "@/utils/formatInfo";
import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const UserProfile = () => {
  const params = useParams();
  const userId = params["user_id"];
  const { userProfile, isUserProfileLoading } = useGetUserProfile(userId);
  return (
    <MainLayout>
      <Header />
      {isUserProfileLoading ? (
        <Loader />
      ) : (
        <>
          {userProfile && (
            <Container>
              <UserPhoto
                size="large"
                style={{ backgroundColor: "#1677ff", color: "fff" }}
                src={userProfile.avatar || ""}
              >
                <span>
                  {!userProfile.avatar &&
                    formatDisplayName(userProfile.fullname)}
                </span>
              </UserPhoto>
              <Section>
                <UserName>{userProfile.fullname}</UserName>
                <Info>
                  <InfoItem>
                    <Label>
                      <MailOutlined /> Email:
                    </Label>
                    {userProfile.email}
                  </InfoItem>
                  <InfoItem>
                    <Label>
                      <PhoneOutlined /> Phone number:
                    </Label>
                    {userProfile.phone_number &&
                      formatPhoneNumber(userProfile.phone_number)}
                  </InfoItem>
                  <InfoItem>
                    <Label>
                      <CalendarOutlined /> Create at:
                    </Label>
                    {formatDate2(userProfile.create_at, "LLL")}
                  </InfoItem>
                  <InfoItem>
                    <Label>
                      <CalendarOutlined /> Update at:
                    </Label>
                    {formatDate2(userProfile.update_at, "LLL")}
                  </InfoItem>
                </Info>
              </Section>
            </Container>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default UserProfile;
