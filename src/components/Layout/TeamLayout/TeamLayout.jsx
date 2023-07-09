import React from "react";
import { useParams } from "react-router-dom";
import { useGetTeam } from "@/hooks/team";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import TeamHeader from "./TeamHeader/TeamHeader";
import { Container } from "./team-layout-styles";
import Loader from "@/components/Loader/Loader";

const TeamLayout = ({ children }) => {
  const params = useParams();
  const teamId = params["team_id"];
  const { isTeamLoading, team, teamRefetch } = useGetTeam(teamId);
  return (
    <MainLayout>
      <Container>
        {isTeamLoading ? (
          <Loader />
        ) : (
          <>
            <TeamHeader team={team.information} teamRefetch={teamRefetch} />
            {team && children}
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default TeamLayout;
