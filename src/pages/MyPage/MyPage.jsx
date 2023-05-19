import React from "react";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {
  CardPhoto,
  CardTitle,
  Container,
  MyCard,
  MyPageLayout,
} from "./my-page-styles";

import projectImg from "../../assets/image2.svg";
import taskImg from "../../assets/image3.svg";
import teamImg from "../../assets/image4.svg";

const MyPage = () => {
  return (
    <MainLayout>
      <MyPageLayout>
        <Container>
          <MyCard>
            <CardPhoto>
              <img
                src={taskImg}
                alt="work"
                style={{ height: "100%", width: "100%" }}
              />
            </CardPhoto>
            <CardTitle>Tasks</CardTitle>
          </MyCard>
          <MyCard>
            <CardPhoto>
              <img
                src={teamImg}
                alt="work"
                style={{ height: "100%", width: "100%" }}
              />
            </CardPhoto>
            <CardTitle>Teams</CardTitle>
          </MyCard>
          <MyCard>
            <CardPhoto>
              <img
                src={projectImg}
                alt="work"
                style={{ height: "100%", width: "100%" }}
              />
            </CardPhoto>
            <CardTitle>Project</CardTitle>
          </MyCard>
        </Container>
      </MyPageLayout>
    </MainLayout>
  );
};

export default MyPage;
