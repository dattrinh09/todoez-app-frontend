import { Tag } from "antd";
import React from "react";

const MyTag = ({ tag }) => {
  return <Tag color={tag.color}>{tag.label}</Tag>;
};

export default MyTag;
