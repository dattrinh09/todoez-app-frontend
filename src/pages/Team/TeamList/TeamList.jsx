import { useMemo, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Loader from "@/components/Loader/Loader";
import { useGetTeams } from "@/hooks/team";
import { ButtonContainer, Container, Heading } from "./team-list-styles";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import CreateTeam from "./Form/CreateTeam";
import Teams from "./Teams";

const TeamList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { isTeamsLoading, teams, teamsRefetch } = useGetTeams();

  const data = useMemo(() => {
    return teams
      ? teams.map((value) => ({
          key: value.id,
          id: value.id,
          name: value.name,
          create: formatDate2(value.create_at, "LL"),
          notes: value.team_users.reduce((total, cur) => {
            return total + cur.notes.length;
          }, 0),
          users: value.team_users.length,
        }))
      : [];
  }, [teams]);

  return (
    <MainLayout>
      <Container>
        <Heading>Team List</Heading>
        <ButtonContainer>
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setIsCreate(true)}
          >
            Create Team
          </Button>
        </ButtonContainer>
        {isCreate && (
          <CreateTeam
            open={isCreate}
            onClose={() => setIsCreate(false)}
            teamsRefetch={teamsRefetch}
          />
        )}
        <section>
          {isTeamsLoading ? (
            <Loader />
          ) : (
            <Teams
              data={data}
              isLoading={isTeamsLoading}
              teamsRefetch={teamsRefetch}
            />
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export default TeamList;
