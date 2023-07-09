import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TeamLayout from "@/components/Layout/TeamLayout/TeamLayout";
import Loader from "@/components/Loader/Loader";
import { Bar, Title } from "./team-users-styles";
import UserList from "./UserList";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import AddUser from "./Form/AddUser";
import { useGetTeamUsers } from "@/hooks/team-user";

const TeamUsers = () => {
  const params = useParams();
  const teamId = params["team_id"];
  const [isAdd, setIsAdd] = useState(false);

  const { isTeamUsersLoading, teamUsers, teamUsersRefetch } =
    useGetTeamUsers(teamId);

  const data = useMemo(() => {
    return {
      list: teamUsers
        ? teamUsers.list
            .filter((item) => !item.delete_at)
            .map((value) => ({
              key: value.id,
              id: value.id,
              userId: value.user.id,
              name: value.user.fullname,
              avatar: value.user.avatar,
              email: value.user.email,
              creator: value.is_creator,
            }))
        : [],
      creator: teamUsers ? teamUsers.creator : null,
    };
  }, [teamUsers]);

  return (
    <TeamLayout>
      <Bar>
        <Title>User list</Title>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setIsAdd(true)}
        >
          Add user
        </Button>
        {isAdd && (
          <AddUser
            open={isAdd}
            onClose={() => setIsAdd(false)}
            teamId={teamId}
            teamUsersRefetch={teamUsersRefetch}
          />
        )}
      </Bar>
      <section>
        {isTeamUsersLoading ? (
          <Loader />
        ) : (
          <UserList
            teamId={teamId}
            data={data}
            isLoading={isTeamUsersLoading}
            teamUsersRefetch={teamUsersRefetch}
          />
        )}
      </section>
    </TeamLayout>
  );
};

export default TeamUsers;
