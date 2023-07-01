import { Avatar } from "antd";
import React from "react";
import styled from "styled-components";
import { formatDisplayName } from "@/utils/formatInfo";

const Photo = styled(Avatar)`
  background-color: #1677ff;
  border: none;
`;

const MyAvatar = ({ size, src, name }) => {
  return (
    <Photo size={size || "default"} src={src || ""}>
      {!src && formatDisplayName(name)}
    </Photo>
  );
};

export default MyAvatar;
