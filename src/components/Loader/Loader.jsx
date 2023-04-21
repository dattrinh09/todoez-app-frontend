import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = () => {
  return (
    <LoaderContainer>
      <Spin size="large" indicator={antIcon} />
    </LoaderContainer>
  );
};

export default Loader;
