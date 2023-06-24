import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TeamLayout from "@/components/Layout/TeamLayout/TeamLayout";
import Loader from "@/components/Loader/Loader";
import { Bar, TitleBar } from "./team-users-styles";
import UserList from "./UserList";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import AddUser from "./Form/AddUser";
import { useGetTeamUsers } from "@/hooks/team-user";

const TeamUsers = () => {
  const params = useParams();
  const teamId = params["team_id"];
  const [isAdd, setIsAdd] = useState(false);

  const { isTeamUsersLoading, teamUsers, teamUsersRefetch } = useGetTeamUsers(teamId);

  return (
    <TeamLayout>
      {isTeamUsersLoading ? (
        <Loader />
      ) : (
        <>
          {teamUsers && (
            <>
              <Bar>
                <TitleBar>User list</TitleBar>
                {teamUsers.creator && (
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => setIsAdd(true)}
                  >
                    Add user
                  </Button>
                )}
                {isAdd && (
                  <AddUser
                    open={isAdd}
                    onClose={() => setIsAdd(false)}
                    teamId={teamId}
                    teamUsersRefetch={teamUsersRefetch}
                  />
                )}
              </Bar>
              {teamUsers.list.length > 0 && (
                <UserList
                  teamId={teamId}
                  isCreator={teamUsers.creator}
                  teamUsers={teamUsers.list}
                  teamUsersRefetch={teamUsersRefetch}
                />
              )}
            </>
          )}
        </>
      )}
    </TeamLayout>
  );
};

export default TeamUsers;
