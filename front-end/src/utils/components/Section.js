import React, { Children } from "react";
import { Row, Col } from "antd";

export default function Section({
  children,
  background = "#fff",
  className,
  span = 24,
  lg = 24,
  xl = 24,
}) {
  return (
    <Col className={` mb-5 px-3 `} span={span} lg={lg} xl={xl}>
      <div
        className={`section-main rounded-lg  ${className}`}
        style={{ backgroundColor: background }}
      >
        {children}
      </div>
    </Col>
  );
}
