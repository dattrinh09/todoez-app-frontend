import React from "react";
import { Container } from "./project-layout-styles";
import useGetProject from "@/hooks/project/useGetProject";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import ProjectHeader from "./ProjectHeader/ProjectHeader";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";

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
            {project && (
              <>
                <ProjectHeader project={project.information} />
                {children}
              </>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default ProjectLayout;
