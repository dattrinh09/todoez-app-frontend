import React, { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import {
  Container,
  Heading,
  Item,
  ItemTitle,
  Items,
  Section,
} from "./project-list-styles";
import { Button, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { useGetProjects } from "@/hooks/project";
import { Link } from "react-router-dom";
import { getProjectDetailRoute } from "@/utils/route";
import CreateProject from "./Form/CreateProject";

const ProjectList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { isProjectsLoading, projects, projectsRefetch } = useGetProjects();

  return (
    <MainLayout>
      <Container>
        <Heading>Project List</Heading>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsCreate(true)}
        >
          Create project
        </Button>
        {isCreate && (
          <CreateProject
            open={isCreate}
            onClose={() => setIsCreate(false)}
            projectsRefetch={() => projectsRefetch()}
          />
        )}
        <Section>
          {isProjectsLoading ? (
            <Loader />
          ) : (
            <>
              {projects.length > 0 ? (
                <Items>
                  {projects.map((item) => (
                    <Item key={item.id}>
                      <Link to={getProjectDetailRoute(item.id)}>
                        <ItemTitle>{item.name}</ItemTitle>
                      </Link>
                    </Item>
                  ))}
                </Items>
              ) : (
                <Empty description="No project" />
              )}
            </>
          )}
        </Section>
      </Container>
    </MainLayout>
  );
};

export default ProjectList;
