import React from "react";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {
  CardPhoto,
  CardTitle,
  Container,
  MyCard,
  MyPageLayout,
} from "./my-page-styles";
// Image
import projectImg from "/src/assets/image2.svg";
import taskImg from "/src/assets/image3.svg";
import teamImg from "/src/assets/image4.svg";
import { Link } from "react-router-dom";
import { ConstantsPath } from "../../constants/ConstantsPath";

const MyPage = () => {
  return (
    <MainLayout>
      <MyPageLayout>
        <Container>
          <Link to="">
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
          </Link>
          <Link to={ConstantsPath.TEAM_LIST}>
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
          </Link>
          <Link to={ConstantsPath.PROJECT_LIST}>
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
          </Link>
        </Container>
      </MyPageLayout>
    </MainLayout>
  );
};

export default MyPage;
