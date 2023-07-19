import React from "react";
import { Heading, Sub, SubIcon, SubText } from "./team-header-styles";
import { Link } from "react-router-dom";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import { formatDate2 } from "@/utils/formatInfo";
import { Button, Space } from "antd";
import { useState } from "react";
import EditTeam from "../Form/EditTeam";
import { getNoteListRoute } from "@/utils/route";

const TeamHeader = ({ team, creator, teamRefetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Heading>
      <Space>
        <Link
          style={{ fontSize: "20px", fontWeight: "500", color: "#1677ff" }}
          to={getNoteListRoute(team.id)}
        >
          {team.name}
        </Link>
        {creator && (
          <Button
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setIsEdit(true)}
          />
        )}
      </Space>
      {isEdit && (
        <EditTeam
          open={isEdit}
          onClose={() => setIsEdit(false)}
          team={team}
          teamRefetch={teamRefetch}
        />
      )}
      <Sub>
        <SubIcon>
          <CalendarOutlined />
        </SubIcon>
        <SubText>{formatDate2(team.create_at, "LL")}</SubText>
      </Sub>
    </Heading>
  );
};

export default TeamHeader;
