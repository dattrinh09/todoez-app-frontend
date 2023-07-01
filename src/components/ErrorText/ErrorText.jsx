import React from "react";
import { Tooltip } from "antd";

const ErrorText = ({ check, title, content }) => {
  return (
    <>
      {check ? (
        <Tooltip color="red" title={title}>
          <span style={{ color: "red" }}>{content}</span>
        </Tooltip>
      ) : (
        <span>{content}</span>
      )}
    </>
  );
};

export default ErrorText;
