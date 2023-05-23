import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import useSectionObserver from "../hooks/useSectionObserver";

export default function BannerSection({ children, img, background = "#fff" }) {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  let observe = useSectionObserver(imageRef, contentRef);

  return (
    <Row className="mb-10 md:mx-10" style={{ backgroundColor: background }}>
      <Col span={26} lg={12} xl={12}>
        <img
          className="section_img h-full"
          ref={imageRef}
          src={require(`../../assets/images/${img}`)}
          alt=""
        />
      </Col>
      <Col span={24} lg={12} xl={12}>
        <div ref={contentRef} className="section_content h-full">
          {children}
        </div>
      </Col>
    </Row>
  );
}
