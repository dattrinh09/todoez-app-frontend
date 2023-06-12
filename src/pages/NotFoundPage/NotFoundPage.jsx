import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ConstantsPath } from "@/constants/ConstantsPath";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="Page not found"
      extra={
        <Link to={ConstantsPath.MY_PAGE}>
          <Button size="large" type="primary">
            Go to my page
          </Button>
        </Link>
      }
    />
  );
};

export default NotFoundPage;
