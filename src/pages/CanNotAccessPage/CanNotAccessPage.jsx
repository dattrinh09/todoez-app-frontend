import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ConstantsPath } from "../../constants/ConstantsPath";
import styled from "styled-components";

const PageContainer = styled.div`
  height: calc(100vh - 54px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CanNotAccessPage = () => {
  return (
    <PageContainer>
      <Result
        status="error"
        title="Can not accees this page"
        extra={
          <Link to={ConstantsPath.MY_PAGE}>
            <Button size="large" type="primary">
              Go to my page
            </Button>
          </Link>
        }
      />
    </PageContainer>
  );
};

export default CanNotAccessPage;
