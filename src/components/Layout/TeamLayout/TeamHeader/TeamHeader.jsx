import React from "react";
import { Heading, Sub, SubIcon, SubText } from "./team-header-styles";
import { Link } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import { getTeamDetailRoute } from "@/utils/route";
import { formatDate2 } from "@/utils/formatInfo";

const TeamHeader = ({ team }) => {
  return (
    <Heading>
      <div>
        <Link
          style={{ fontSize: "20px", fontWeight: "500", color: "#1677ff" }}
          to={getTeamDetailRoute(team.id)}
        >
          {team.name}
        </Link>
      </div>

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
