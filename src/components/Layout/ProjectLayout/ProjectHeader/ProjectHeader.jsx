import React from "react";
import { Heading, Sub, SubIcon, SubText, Title } from "./project-header-styles";
import { CalendarOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import { Link } from "react-router-dom";
import { getProjectDetailRoute } from "@/utils/route";

const ProjectHeader = ({ project }) => {
  return (
    <Heading>
      <Link to={getProjectDetailRoute(project.id)}>
        <Title>{project.name}</Title>
      </Link>
      <Sub>
        <SubIcon>
          <CalendarOutlined />
        </SubIcon>
        <SubText>{formatDate2(project.create_at, "DD-MM-YYYY")}</SubText>
      </Sub>
    </Heading>
  );
};

export default ProjectHeader;
