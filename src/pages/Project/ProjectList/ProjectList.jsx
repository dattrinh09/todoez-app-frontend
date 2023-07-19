import React, { useMemo, useState } from "react";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import { Bar, Container, Heading } from "./project-list-styles";
import { Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { useGetProjects } from "@/hooks/project";
import CreateProject from "./Form/CreateProject";
import { formatDate2 } from "@/utils/formatInfo";
import Projects from "./Projects";
import { useSearchParams } from "react-router-dom";

const ProjectList = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParams = useMemo(() => {
    return {
      page: searchParams.get("page") || 1,
      keyword: searchParams.get("keyword") || undefined,
    };
  }, [searchParams]);
  const { isProjectsLoading, projects, projectsRefetch } =
    useGetProjects(filterParams);

  const data = useMemo(() => {
    return {
      list: projects
        ? projects.list.map((value) => ({
            key: value.id,
            id: value.id,
            name: value.name,
            create: formatDate2(value.create_at, "LL"),
            sprints: value.sprints.length,
            tasks: value.sprints.reduce((count, cur) => {
              return count + cur.tasks.length;
            }, 0),
            users: value.project_users.length,
          }))
        : [],
      total: projects ? projects.total : 0,
    };
  }, [projects]);

  const handleTableChange = (page) => {
    if (page.current !== 1) searchParams.set("page", page.current);
    else searchParams.delete("page");

    setSearchParams(searchParams);
  };

  const handleSearch = (value) => {
    const text = value.replaceAll(" ", "%");
    if (text) searchParams.set("keyword", text);
    else searchParams.delete("keyword");

    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <MainLayout>
      <Container>
        <Heading>Project List</Heading>
        <Bar>
          <Input.Search
            defaultValue={filterParams.keyword || null}
            allowClear
            placeholder="Search project"
            onSearch={handleSearch}
            style={{ width: "300px" }}
          />
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={() => setIsCreate(true)}
          >
            Create project
          </Button>
        </Bar>
        {isCreate && (
          <CreateProject
            open={isCreate}
            onClose={() => setIsCreate(false)}
            projectsRefetch={() => projectsRefetch()}
          />
        )}
        <section>
          {isProjectsLoading ? (
            <Loader />
          ) : (
            <Projects
              data={data}
              isLoading={isProjectsLoading}
              projectsRefetch={projectsRefetch}
              current={Number(filterParams.page)}
              onTableChange={handleTableChange}
            />
          )}
        </section>
      </Container>
    </MainLayout>
  );
};

export default ProjectList;
