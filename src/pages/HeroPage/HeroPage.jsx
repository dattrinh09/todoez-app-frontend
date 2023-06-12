import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
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
import { ConstantsPath } from "@/constants/ConstantsPath";
import image from "@/assets/images/hero-img.svg";

const items = [
  {
    key: 1,
    content: "Manage your task",
  },
  {
    key: 2,
    content: "Manage your team",
  },
  {
    key: 3,
    content: "Manage your project",
  },
];

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
              {items.map((item) => (
                <Item key={item.key}>
                  <Icon>
                    <CheckCircleFilled />
                  </Icon>
                  {item.content}
                </Item>
              ))}
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
