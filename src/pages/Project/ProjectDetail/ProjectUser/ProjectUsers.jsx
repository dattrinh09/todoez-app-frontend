import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectUsers } from "@/hooks/project-user";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import Loader from "@/components/Loader/Loader";
import { Bar, Title } from "./project-users-styles";
import UserList from "./UserList";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import AddUser from "./Form/AddUser";

const ProjectUsers = () => {
  const params = useParams();
  const projectId = params["project_id"];
  const [isAdd, setIsAdd] = useState(false);

  const { isProjectUsersLoading, projectUsers, projectUsersRefetch } =
    useGetProjectUsers(projectId);

  const data = useMemo(() => {
    return {
      list: projectUsers
        ? projectUsers.list
            .filter((item) => !item.delete_at)
            .map((value) => ({
              key: value.id,
              id: value.id,
              name: value.user.fullname,
              userId: value.user.id,
              avatar: value.user.avatar,
              email: value.user.email,
              creator: value.is_creator,
            }))
        : [],
      creator: projectUsers ? projectUsers.creator : null,
    };
  }, [projectUsers]);

  return (
    <ProjectLayout>
      {isProjectUsersLoading ? (
        <Loader />
      ) : (
        <>
          <Bar>
            <Title>User list</Title>
            {data.creator && (
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => setIsAdd(true)}
              >
                Add user
              </Button>
            )}
          </Bar>
          {isAdd && (
            <AddUser
              open={isAdd}
              onClose={() => setIsAdd(false)}
              projectId={projectId}
              projectUsersRefetch={projectUsersRefetch}
            />
          )}
          <UserList
            projectId={projectId}
            data={data}
            isLoading={isProjectUsersLoading}
            projectUsersRefetch={projectUsersRefetch}
          />
        </>
      )}
    </ProjectLayout>
  );
};

export default ProjectUsers;
