import React, { useState } from "react";
import MainLayout from "../../../components/Layout/MainLayout/MainLayout";
import {
  Container,
  ErrorMsg,
  Heading,
  Item,
  ItemTitle,
  Items,
  Section,
  TeamListLayout,
} from "./team-list-styles";
import { Button, Form, Input, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";
import useGetTeams from "../../../hooks/team/useGetTeams";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { getTeamRoute } from "../../../utils/route";

const TeamList = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, teams, setIsFetch } = useGetTeams();
  const [createForm] = Form.useForm();
  const [error, setError] = useState("");
  const handleCreateTeam = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post("teams", values);
          notificationShow(
            "success",
            "Create team successfully",
            "Your team already created."
          );
          createForm.resetFields();
          setOpen(false);
          setIsFetch(true);
        } catch (e) {
          setError(e.response.data.message);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  return (
    <MainLayout>
      <TeamListLayout>
        <Container>
          <Heading>Team List</Heading>
          <Button
            icon={<PlusCircleOutlined />}
            size="large"
            type="primary"
            onClick={() => setOpen(true)}
          >
            Create team
          </Button>
          <Modal
            title="Create team"
            open={open}
            okText="Save"
            cancelText="Cancel"
            onOk={handleCreateTeam}
            onCancel={() => setOpen(false)}
          >
            <Form
              form={createForm}
              layout="vertical"
              name="create_team"
              onFocus={() => setError("")}
            >
              <Form.Item
                name="name"
                label="Team Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter team name.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {error && <ErrorMsg>{error}</ErrorMsg>}
            </Form>
          </Modal>
          <Section>
            {isLoading ? (
              <Loader />
            ) : (
              <Items>
                {teams.map((item) => (
                  <Link key={item.id} to={getTeamRoute(item.id)}>
                    <Item>
                      <ItemTitle>{item.name}</ItemTitle>
                    </Item>
                  </Link>
                ))}
              </Items>
            )}
          </Section>
        </Container>
      </TeamListLayout>
    </MainLayout>
  );
};

export default TeamList;
