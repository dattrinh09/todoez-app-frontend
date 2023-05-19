import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../components/Layout/MainLayout/MainLayout";
import useGetTeam from "../../../hooks/team/useGetTeam";
import {
  Container,
  BtnGroup,
  Heading,
  Section,
  TeamDetailLayout,
  Title,
  Sub,
  SubIcon,
  SubText,
} from "./team-detail-styles";
import Loader from "../../../components/Loader/Loader";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import TeamUsers from "./TeamUsers";
import { Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  UserAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import AddUser from "./Form/AddUser";
import ChangeName from "./Form/ChangeName";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";
import { ConstantsPath } from "../../../constants/ConstantsPath";
import useGetTeamUsers from "../../../hooks/team/user/useGetTeamUsers";
import { formatDate } from "../../../utils/formatInfo";

const { confirm } = Modal;

const TeamDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isTeamLoading, teamInfo, teamFetch } = useGetTeam(params.team_id);
  const { isTeamUsersLoading, teamUsers, teamUsersFetch } = useGetTeamUsers(
    params.team_id
  );
  const [isAdd, setIsAdd] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const handleDelete = async (id) => {
    confirm({
      title: "Do you want to remove this team ?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosInstance.delete(`teams/${id}`);
          navigate(ConstantsPath.TEAM_LIST);
          notificationShow("success", "Remove team successfully");
        } catch (e) {
          notificationShow(
            "error",
            "Remove user unsuccessfully",
            e.response.data.message
          );
        }
      },
    });
  };
  return (
    <MainLayout>
      <TeamDetailLayout>
        <Container>
          {isTeamLoading ? (
            <Loader />
          ) : (
            <>
              {!teamInfo ? (
                <NotFoundPage />
              ) : (
                <>
                  <Heading>
                    <Title>{teamInfo.team.name}</Title>
                  </Heading>
                  <Sub>
                    <SubIcon>
                      <CalendarOutlined />
                    </SubIcon>
                    <SubText>
                      {formatDate(teamInfo.team.create_time).toLocaleString()}
                    </SubText>
                    <SubIcon>
                      <UserOutlined />
                    </SubIcon>
                    <SubText>{teamInfo.user_number}</SubText>
                    {teamInfo.is_creator && (
                      <>
                        <Button
                          shape="circle"
                          size="small"
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={() => setIsChange(true)}
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
                  {isChange && (
                    <ChangeName
                      open={isChange}
                      teamId={teamInfo.team.id}
                      onClose={() => setIsChange(false)}
                      teamRefetch={() => teamFetch(true)}
                    />
                  )}
                  {teamInfo.is_creator && (
                    <Button
                      size="large"
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
                      teamId={teamInfo.team.id}
                      onClose={() => setIsAdd(false)}
                      teamRefetch={() => teamFetch(true)}
                      teamUsersRefetch={() => teamUsersFetch(true)}
                    />
                  )}
                  <Section>
                    {isTeamUsersLoading ? (
                      <Loader />
                    ) : (
                      <TeamUsers
                        teamId={teamInfo.team.id}
                        teamUsers={teamUsers}
                        teamRefetch={() => teamFetch(true)}
                        teamUsersRefetch={() => teamUsersFetch(true)}
                      />
                    )}
                  </Section>
                </>
              )}
            </>
          )}
        </Container>
      </TeamDetailLayout>
    </MainLayout>
  );
};

export default TeamDetail;
