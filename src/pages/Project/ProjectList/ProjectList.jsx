import React, { useMemo, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import { ButtonContainer, Container, Heading } from "./project-list-styles";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { useGetProjects } from "@/hooks/project";
import CreateProject from "./Form/CreateProject";
import { formatDate2 } from "@/utils/formatInfo";
import Projects from "./Projects";

const ProjectList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { isProjectsLoading, projects, projectsRefetch } = useGetProjects();

  const data = useMemo(() => {
    return projects
      ? projects.map((value) => ({
          key: value.id,
          id: value.id,
          name: value.name,
          create: formatDate2(value.create_at, "LL"),
          sprints: value.sprints.length,
          tasks: value.sprints.reduce((total, cur) => {
            return total + cur.tasks.length;
          }, 0),
          users: value.project_users.length,
        }))
      : [];
  }, [projects]);

  return (
    <MainLayout>
      <Container>
        <Heading>Project List</Heading>
        <ButtonContainer>
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setIsCreate(true)}
          >
            Create project
          </Button>
        </ButtonContainer>
        {isCreate && (
          <CreateProject
            open={isCreate}
            onClose={() => setIsCreate(false)}
            projectsRefetch={() => projectsRefetch()}
          />
        )}
        <section>
          {isProjectsLoading ? (
            <Loader />
          ) : (
            <Projects
              data={data}
              isLoading={isProjectsLoading}
              projectsRefetch={projectsRefetch}
            />
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export default ProjectList;
