import React, { useState } from "react";
import { Heading, Sub, SubIcon, SubText } from "./project-header-styles";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import { Link } from "react-router-dom";
import { getTaskListRoute } from "@/utils/route";
import { Button, Space } from "antd";
import EditProject from "../Form/EditProject";

const ProjectHeader = ({ project, projectRefetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Heading>
      <Space>
        <Link
          style={{ fontSize: "20px", fontWeight: "500", color: "#1677ff" }}
          to={getTaskListRoute(project.id)}
        >
          {project.name}
        </Link>
        <Button
          size="small"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => setIsEdit(true)}
        />
      </Space>
      {isEdit && (
        <EditProject
          open={isEdit}
          onClose={() => setIsEdit(false)}
          project={project}
          projectRefetch={projectRefetch}
        />
      )}
      <Sub>
        <SubIcon>
          <CalendarOutlined />
        </SubIcon>
        <SubText>{formatDate2(project.create_at, "LL")}</SubText>
      </Sub>
    </Heading>
  );
};

export default ProjectHeader;
