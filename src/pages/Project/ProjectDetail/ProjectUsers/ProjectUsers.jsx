import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetProjectUsers from "@/hooks/project/user/useGetProjectUsers";
import ProjectLayout from "@/components/Layout/ProjectLayout/ProjectLayout";
import Loader from "@/components/Loader/Loader";
import { Bar, TitleBar } from "./project-users-styles";
import UserList from "./UserList";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import AddUser from "./Form/AddUser";

const ProjectUsers = () => {
  const params = useParams();
  const projectId = params["project_id"];

  const [isAdd, setIsAdd] = useState(false);

  const { isProjectUsersLoading, projectUsers, projectUsersFetch } =
    useGetProjectUsers(projectId);

  return (
    <ProjectLayout>
      {isProjectUsersLoading ? (
        <Loader />
      ) : (
        <>
          {projectUsers && (
            <>
              <Bar>
                <TitleBar>User list</TitleBar>
                {projectUsers.creator && (
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
                    projectId={projectId}
                    projectUsersRefetch={() => projectUsersFetch(true)}
                  />
                )}
              </Bar>
              {projectUsers.list.length > 0 && (
                <UserList
                  projectId={projectId}
                  isCreator={projectUsers.creator}
                  projectUsers={projectUsers.list}
                  projectUsersRefetch={() => projectUsersFetch(true)}
                />
              )}
            </>
          )}
        </>
      )}
    </ProjectLayout>
  );
};

export default ProjectUsers;
