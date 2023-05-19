import React, { useState } from "react";
import MainLayout from "../../../components/Layout/MainLayout/MainLayout";
import {
  Container,
  ErrorMsg,
  Heading,
  Item,
  ItemTitle,
  Items,
  ProjectListLayout,
  Section,
} from "./project-list-styles";
import { Button, Form, Input, Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Loader from "../../../components/Loader/Loader";
import useGetProjects from "../../../hooks/project/useGetProjects";
import axiosInstance from "../../../request/axiosInstance";
import { notificationShow } from "../../../utils/notificationShow";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [open, setOpen] = useState(false);
  const { isProjectsLoading, projects, projectsFetch } = useGetProjects();
  const [createForm] = Form.useForm();
  const [error, setError] = useState("");
  const handleCreateProject = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        try {
          await axiosInstance.post("projects", values);
          notificationShow(
            "success",
            "Create project successfully",
            "Your project already created."
          );
          createForm.resetFields();
          setOpen(false);
          projectsFetch(true);
        } catch (e) {
          console.log(e);
          setError(e.response.data.message);
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  return (
    <MainLayout>
      <ProjectListLayout>
        <Container>
          <Heading>Project List</Heading>
          <Button
            icon={<PlusCircleOutlined />}
            size="large"
            type="primary"
            onClick={() => setOpen(true)}
          >
            Create project
          </Button>
          <Modal
            title="Create project"
            open={open}
            okText="Save"
            cancelText="Cancel"
            onOk={handleCreateProject}
            onCancel={() => setOpen(false)}
          >
            <Form
              form={createForm}
              layout="vertical"
              name="create_project"
              onFocus={() => setError("")}
            >
              <Form.Item
                name="name"
                label="Project Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter project name.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Project Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter project description.",
                  },
                ]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
              {error && <ErrorMsg>{error}</ErrorMsg>}
            </Form>
          </Modal>
          <Section>
            {isProjectsLoading ? (
              <Loader />
            ) : (
              <Items>
                {projects.map((item) => (
                  <Link key={item.id} to="">
                    <Item>
                      <ItemTitle>{item.name}</ItemTitle>
                    </Item>
                  </Link>
                ))}
              </Items>
            )}
          </Section>
        </Container>
      </ProjectListLayout>
    </MainLayout>
  );
};

export default ProjectList;
