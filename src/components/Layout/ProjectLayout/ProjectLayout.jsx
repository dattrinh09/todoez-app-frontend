import React from "react";
import MainLayout from "../MainLayout/MainLayout";
import { Container } from "./project-layout-styles";
import useGetProject from "../../../hooks/project/useGetProject";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import CanNotAccessPage from "../../../pages/CanNotAccessPage/CanNotAccessPage";
import ProjectHeader from "./ProjectHeader/ProjectHeader";

const ProjectLayout = ({ children }) => {
  const params = useParams();
  const projectId = params["project_id"];
  const { isProjectLoading, project } = useGetProject(projectId);

  return (
    <MainLayout>
      <Container>
        {isProjectLoading ? (
          <Loader />
        ) : (
          <>
            {!project ? (
              <CanNotAccessPage />
            ) : (
              <>
                <ProjectHeader project={project.project} />
                { children }
              </>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default ProjectLayout;
