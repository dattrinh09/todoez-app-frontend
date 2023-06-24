import React, { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Loader from "@/components/Loader/Loader";
import { useGetTeams } from "@/hooks/team";
import { Button, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Container,
  Heading,
  Item,
  ItemTitle,
  Items,
  Section,
} from "./team-list-styles";
import { getTeamDetailRoute } from "@/utils/route";
import CreateTeam from "./Form/CreateTeam";
import { Link } from "react-router-dom";

const TeamList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { isTeamsLoading, teams, teamsRefetch } = useGetTeams();

  return (
    <MainLayout>
      <Container>
        <Heading>Team List</Heading>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={() => setIsCreate(true)}
        >
          Create team
        </Button>
        {isCreate && (
          <CreateTeam
            open={isCreate}
            onClose={() => setIsCreate(false)}
            teamsRefetch={teamsRefetch}
          />
        )}
        <Section>
          {isTeamsLoading ? (
            <Loader />
          ) : (
            <>
              {teams.length > 0 ? (
                <Items>
                  {teams.map((item) => (
                    <Item key={item.id}>
                      <Link to={getTeamDetailRoute(item.id)}>
                        <ItemTitle>{item.name}</ItemTitle>
                      </Link>
                    </Item>
                  ))}
                </Items>
              ) : (
                <Empty description="No team" />
              )}
            </>
          )}
        </Section>
      </Container>
    </MainLayout>
  );
};

export default TeamList;
