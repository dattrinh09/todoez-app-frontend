import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {
  Container,
  HeroButton,
  HeroLayout,
  HeroPhoto,
  Icon,
  Item,
  Menu,
  Photo,
  Section,
  SubTitle,
  Title,
} from "./hero-page-styles";
import { useNavigate } from "react-router-dom";
import { ConstantsPath } from "../../constants/ConstantsPath";
import image from "../../assets/image1.svg";

const HeroPage = () => {
  const navigate = useNavigate();
  const handleClickStart = () => {
    const token = localStorage.getItem("token");
    if (token) navigate(ConstantsPath.MY_PAGE);
    else navigate(ConstantsPath.SIGN_UP);
  };
  return (
    <MainLayout>
      <HeroLayout>
        <Container>
          <Section>
            <Title>A basic task manager application with React & Nest</Title>
            <SubTitle>
              This application will help you manage your work in a simple, fast
              and modern way.
            </SubTitle>
            <Menu>
              <Item>
                <Icon>
                  <CheckCircleFilled />
                </Icon>
                Manage your task
              </Item>
              <Item>
                <Icon>
                  <CheckCircleFilled />
                </Icon>
                Manage your team
              </Item>
              <Item>
                <Icon>
                  <CheckCircleFilled />
                </Icon>
                Manage your project
              </Item>
            </Menu>
            <HeroButton onClick={handleClickStart}>Get Started</HeroButton>
          </Section>
          <HeroPhoto>
            <Photo>
              <img
                src={image}
                alt="work"
                style={{ height: "100%", width: "100%" }}
              />
            </Photo>
          </HeroPhoto>
        </Container>
      </HeroLayout>
    </MainLayout>
  );
};

export default HeroPage;
