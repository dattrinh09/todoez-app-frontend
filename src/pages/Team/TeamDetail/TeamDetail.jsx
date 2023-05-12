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
} from "./team-detail-styles";
import Loader from "../../../components/Loader/Loader";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import TeamUsers from "./TeamUsers";
import { Button, Modal } from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddUser from "./Form/AddUser";
import ChangeName from "./Form/ChangeName";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";
import { ConstantsPath } from "../../../constants/ConstantsPath";

const { confirm } = Modal;

const TeamDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, teamInfo, setIsFetch } = useGetTeam(params.team_id);
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!teamInfo ? (
                <NotFoundPage />
              ) : (
                <>
                  <Heading>
                    <Title>{teamInfo.team.name}</Title>
                    {teamInfo.is_creator && (
                      <BtnGroup>
                        <Button
                          shape="circle"
                          size="small"
                          icon={<EditOutlined />}
                          onClick={() => setIsChange(true)}
                        />
                        <Button
                          shape="circle"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(params.team_id)}
                        />
                      </BtnGroup>
                    )}
                  </Heading>
                  {isChange && (
                    <ChangeName
                      open={isChange}
                      teamId={teamInfo.team.id}
                      onClose={() => setIsChange(false)}
                      reFetch={() => setIsFetch(true)}
                    />
                  )}
                  {teamInfo.is_creator && (
                    <Button
                      size="large"
                      type="primary"
                      icon={<PlusCircleOutlined />}
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
                      reFetch={() => setIsFetch(true)}
                    />
                  )}
                  <Section>
                    <TeamUsers teamId={teamInfo.team.id} />
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
