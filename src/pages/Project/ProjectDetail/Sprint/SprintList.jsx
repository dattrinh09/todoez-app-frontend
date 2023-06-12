import React, { useState } from "react";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { Bar, SprintTitle } from "./sprint-styles";
import { Button, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateSprint from "./Form/CreateSprint";
import Sprints from "./Sprints";
import useGetFilterSprints from "@/hooks/project/sprint/useGetFilterSprints";

const SprintList = () => {
  const params = useParams();
  const projectId = params["project_id"];

  const [isCreate, setIsCreate] = useState(false);

  const { isFSprintsLoading, fSprints, fSprintsFetch } =
    useGetFilterSprints(projectId);

  return (
    <ProjectLayout>
      {isFSprintsLoading ? (
        <Loader />
      ) : (
        <>
          <Bar>
            <SprintTitle>Sprint list</SprintTitle>
            <Button
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
                sprintsRefetch={() => fSprintsFetch(true)}
              />
            )}
          </Bar>
          {fSprints.length > 0 ? (
            <Sprints
              projectId={projectId}
              sprints={fSprints}
              sprintsRefetch={() => fSprintsFetch(true)}
            />
          ) : (
            <Empty description="No sprint" />
          )}
        </>
      )}
    </ProjectLayout>
  );
};

export default SprintList;
