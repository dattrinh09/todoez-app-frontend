import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";

const Icon = styled.div`
  height: 15px;
  width: 15px;
`;

const MyTooltip = ({ tooltip }) => {
  return (
    <Tooltip title={tooltip.label} color={tooltip.color}>
      <Icon>
        <img
          src={tooltip.icon}
          alt="icon"
          style={{ height: "100%", width: "100%" }}
        />
      </Icon>
    </Tooltip>
  );
};

export default MyTooltip;
