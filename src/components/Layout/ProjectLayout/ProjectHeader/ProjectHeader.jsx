import React from "react";
import { Heading, Sub, SubIcon, SubText, Title } from "./project-header-styles";
import { CalendarOutlined } from "@ant-design/icons";
import { formatDate2 } from "../../../../utils/formatInfo";

const ProjectHeader = ({ project }) => {
  return (
    <Heading>
      <Title>{project.name}</Title>
      <Sub>
        <SubIcon>
          <CalendarOutlined />
        </SubIcon>
        <SubText>
          {formatDate2(project.create_time)}
        </SubText>
      </Sub>
    </Heading>
  );
};

export default ProjectHeader;
