import React from "react";
import { Heading, Sub, SubIcon, SubText, Title } from "./project-header-styles";
import { CalendarOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import { Link } from "react-router-dom";
import { getProjectDetailRoute } from "@/utils/route";

const ProjectHeader = ({ project }) => {
  return (
    <Heading>
      <div>
        <Link
          style={{ fontSize: "20px", fontWeight: "500", color: "#1677ff" }}
          to={getProjectDetailRoute(project.id)}
        >
          {project.name}
        </Link>
      </div>

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
