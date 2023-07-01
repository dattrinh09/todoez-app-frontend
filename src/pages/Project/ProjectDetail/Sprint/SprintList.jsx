import React, { useState } from "react";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import { Bar, SprintTitle } from "./sprint-styles";
import { Button, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import CreateSprint from "./Form/CreateSprint";
import Sprints from "./Sprints";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteSprints } from "@/hooks/sprint";

const SprintList = () => {
  const params = useParams();
  const projectId = params["project_id"];
  const [isCreate, setIsCreate] = useState(false);

  const {
    infiniteSprints,
    isInfiniteSprintNext,
    infiniteSprintsFetchNext,
    isInfiniteSprintsLoading,
    infiniteSprintsRefetch,
  } = useGetInfiniteSprints(projectId);

  const loadMoreSprints = async () => {
    if (isInfiniteSprintNext) await infiniteSprintsFetchNext();
  };

  return (
    <ProjectLayout>
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
            sprintsRefetch={infiniteSprintsRefetch}
          />
        )}
      </Bar>
      {isInfiniteSprintsLoading ? (
        <Loader />
      ) : (
        <>
          {infiniteSprints.length > 0 ? (
            <InfiniteScroll
              dataLength={3}
              next={loadMoreSprints}
              hasMore={isInfiniteSprintNext}
              loader={<Loader />}
            >
              <Sprints
                projectId={projectId}
                sprints={infiniteSprints}
                sprintsRefetch={infiniteSprintsRefetch}
              />
            </InfiniteScroll>
          ) : (
            <Empty description="No sprint" />
          )}
        </>
      )}
    </ProjectLayout>
  );
};

export default SprintList;
