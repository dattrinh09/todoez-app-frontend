import React, { useState } from "react";
import MainLayout from "../../../../components/Layout/MainLayout/MainLayout";
import { Container, Heading, Item, ItemSub, ItemTitle, Items, Sub, SubText, Title } from "./sprint-styles";
import { Button } from "antd";
import CreateSprint from "./Form/CreateSprint";
import { useParams } from "react-router-dom";
import useGetProject from "../../../../hooks/project/useGetProject";
import Loader from "../../../../components/Loader/Loader";
import CanNotAccessPage from "../../../CanNotAccessPage/CanNotAccessPage";
import { PlusCircleOutlined } from "@ant-design/icons";
import useGetSprints from "../../../../hooks/project/sprint/useGetSprints";
import { formatRange } from "../../../../utils/formatInfo";

const SprintList = () => {
  const params = useParams();
  const projectId = params.project_id;
  const { isProjectLoading, project, projectFetch } = useGetProject(projectId);
  const { isSprintsLoading, sprints, sprintsFetch } = useGetSprints(projectId);
  const [isCreate, setIsCreate] = useState(false);
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
                <Heading>
                  <Title>{project.project.name}</Title>
                </Heading>
                <Sub>
                  <SubText>Sprint:</SubText>
                  <SubText>{project.sprint_number}</SubText>
                </Sub>
                <Button
                  size="large"
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={() => setIsCreate(true)}
                >
                  Create sprint
                </Button>
                {isCreate && (
                  <CreateSprint
                    open={isCreate}
                    onClose={() => setIsCreate(false)}
                    projectId={projectId}
                    projectRefetch={() => projectFetch(true)}
                    sprintsRefetch={() => sprintsFetch(true)}
                  />
                )}
                <section>
                    {isSprintsLoading ? (
                        <Loader />
                    ) : (
                        <>
                        {!sprints ? (
                            <div>No data</div>
                        ) : (
                            <Items>
                                {sprints.map((sprint) => (
                                    <Item key={sprint.id}>
                                        <ItemTitle>
                                            {sprint.title}
                                        </ItemTitle>
                                        <ItemSub>
                                            {formatRange(sprint.start_time, sprint.end_time)}
                                        </ItemSub>
                                    </Item>
                                ))}
                            </Items>
                        ) 
                        }
                        </>
                    )}
                </section>
              </>
            )}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default SprintList;
