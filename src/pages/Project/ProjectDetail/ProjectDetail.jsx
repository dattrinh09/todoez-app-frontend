import React, { useMemo } from "react";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import CardList from "@/components/CardList/CardList";
import { getProjectUsersRoute, getSprintListRoute, getTaskListRoute } from "@/utils/route";
import { useParams } from "react-router-dom";
import sprintsImg from "@/assets/images/sprint-list.svg";
import tasksImg from "@/assets/images/task-list.svg";
import usersImg from "@/assets/images/user-list.svg";

const ProjectDetail = () => {
  const params = useParams();
  const projectId = params["project_id"];

  const PROJECT_DETAIL_OPTIONS = useMemo(() => {
    return [
      {
        key: 1,
        title: "Sprint list",
        route: getSprintListRoute(projectId),
        image: sprintsImg,
      },
      {
        key: 2,
        title: "Task list",
        route: getTaskListRoute(projectId),
        image: tasksImg,
      },
      {
        key: 3,
        title: "User list",
        route: getProjectUsersRoute(projectId),
        image: usersImg,
      },
    ];
  }, [projectId]);
  return (
    <ProjectLayout>
      <CardList options={PROJECT_DETAIL_OPTIONS} />
    </ProjectLayout>
  );
};

export default ProjectDetail;
