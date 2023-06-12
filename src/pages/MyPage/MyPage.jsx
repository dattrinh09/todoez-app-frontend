import React from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import { ConstantsPath } from "@/constants/ConstantsPath";
import CardList from "@/components/CardList/CardList";

import projectImg from "@/assets/images/project-img.svg";
import taskImg from "@/assets/images/task-img.svg";
import teamImg from "@/assets/images/team-img.svg";
import { MyPageLayout } from "./my-page-styles";

const MY_PAGE_OPTIONS = [
  {
    key: 1,
    title: "Tasks",
    route: "",
    image: taskImg,
  },
  {
    key: 2,
    title: "Teams",
    route: ConstantsPath.TEAM_LIST,
    image: teamImg,
  },
  {
    key: 3,
    title: "Projects",
    route: ConstantsPath.PROJECT_LIST,
    image: projectImg,
  },
];

const MyPage = () => {
  return (
    <MainLayout>
      <MyPageLayout>
        <CardList options={MY_PAGE_OPTIONS} />
      </MyPageLayout>
    </MainLayout>
  );
};

export default MyPage;
