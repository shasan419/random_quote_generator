import React from "react";
import { Rate } from "antd";

const CRate = ({ desc, ...rest }) => {
  return (
    <>
      <Rate {...rest} />
      {desc}
    </>
  );
};

export default CRate;
