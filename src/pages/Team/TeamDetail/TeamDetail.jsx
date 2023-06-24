import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import TeamLayout from "@/components/Layout/TeamLayout/TeamLayout";
import CardList from "@/components/CardList/CardList";
import { getNoteListRoute, getTeamUsersRoute } from '@/utils/route';
import usersImg from "@/assets/images/user-list.svg";
import notesImg from "@/assets/images/note-list.svg";

const TeamDetail = () => {
    const params = useParams();
    const teamId = params["team_id"];

    const TEAM_DETAIL_OPTIONS = useMemo(() => {
        return [
            {
                key: 1,
                title: "Note list",
                route: getNoteListRoute(teamId),
                image: notesImg,
            },
            {
                key: 2,
                title: "User list",
                route: getTeamUsersRoute(teamId),
                image: usersImg,
            }
        ]
    }, [teamId]);
  return (
    <TeamLayout>
        <CardList options={TEAM_DETAIL_OPTIONS} />
    </TeamLayout>
  )
}

export default TeamDetail