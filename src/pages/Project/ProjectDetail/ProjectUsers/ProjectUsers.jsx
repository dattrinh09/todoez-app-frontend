import React, { useState } from "react";
import {
  Container,
  Description,
  Heading,
  ProjectUsersLayout,
  Sub,
  SubIcon,
  SubText,
  Title,
} from "./project-users-styles";
import MainLayout from "../../../../components/Layout/MainLayout/MainLayout";
import useGetProject from "../../../../hooks/project/useGetProject";
import { useParams } from "react-router-dom";
import useGetProjectUsers from "../../../../hooks/project/user/useGetProjectUsers";
import Loader from "../../../../components/Loader/Loader";
import CanNotAccessPage from "../../../CanNotAccessPage/CanNotAccessPage";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate } from "../../../../utils/formatInfo";
import { Button } from "antd";
import UserList from "./UserList";
import AddUser from "./Form/AddUser";
import UpdateInfo from "./Form/UpdateInfo";

const ProjectUsers = () => {
  const params = useParams();
  const { isProjectLoading, project, projectFetch } = useGetProject(
    params.project_id
  );
  const { isProjectUsersLoading, projectUsers, projectUsersFetch } =
    useGetProjectUsers(params.project_id);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <MainLayout>
      <ProjectUsersLayout>
        <Container>
          {isProjectLoading ? (
            <Loader />
          ) : (
            <>
              {!project ? (
                <CanNotAccessPage />
              ) : (
                <>
                  <Heading>
                    <Title>{project.project.name}</Title>
                  </Heading>
                  <Sub>
                    <SubIcon>
                      <CalendarOutlined />
                    </SubIcon>
                    <SubText>
                      {formatDate(project.project.create_time).toLocaleString()}
                    </SubText>
                    <SubIcon>
                      <UserOutlined />
                    </SubIcon>
                    <SubText>{project.user_number}</SubText>
                    {project.is_creator && (
                      <>
                        <Button
                          shape="circle"
                          size="small"
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => setIsUpdate(true)}
                        />
                        <Button
                          shape="circle"
                          size="small"
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(params.team_id)}
                        />
                      </>
                    )}
                  </Sub>
                  <Description>
                    <span>{project.project.description}</span>
                  </Description>
                  {project.is_creator && (
                    <Button
                      size="large"
                      type="primary"
                      icon={<UserAddOutlined />}
                      onClick={() => setIsAdd(true)}
                    >
                      Add user
                    </Button>
                  )}
                  <section>
                    {isProjectUsersLoading ? (
                      <Loader />
                    ) : (
                      <UserList
                        projectId={project.project.id}
                        projectUsers={projectUsers}
                        projectUsersRefetch={() => projectUsersFetch(true)}
                        projectRefetch={() => projectFetch(true)}
                      />
                    )}
                  </section>
                  {isAdd && (
                    <AddUser
                      open={isAdd}
                      projectId={project.project.id}
                      onClose={() => setIsAdd(false)}
                      projectRefetch={() => projectFetch(true)}
                      projectUsersRefetch={() => projectUsersFetch(true)}
                    />
                  )}
                  {isUpdate && (
                    <UpdateInfo
                      open={isUpdate}
                      projectId={project.project.id}
                      projectInfo={project.project}
                      onClose={() => setIsUpdate(false)}
                      projectRefetch={() => projectFetch(true)}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </ProjectUsersLayout>
    </MainLayout>
  );
};

export default ProjectUsers;
