import React from "react";
import { Container } from "./project-layout-styles";
import { useGetProject } from "@/hooks/project";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";

const ProjectLayout = ({ children }) => {
  const params = useParams();
  const projectId = params["project_id"];
  const { isProjectLoading, project, projectRefetch } =
    useGetProject(projectId);

  return (
    <MainLayout>
      <Container>
        {isProjectLoading ? (
          <Loader />
        ) : (
          <>
            <ProjectHeader
              project={project.information}
              projectRefetch={projectRefetch}
            />
            {project && children}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default ProjectLayout;
