import React from "react";
import Section from "../../utils/components/Section";
import { Row } from "antd";
import { commomBoxList } from "../../static/AdminData";
import { SiWalmart } from "react-icons/si";
export default function MainDashBoard() {
  return (
    <div className="main-dashboard container mx-auto font-quicksand">
      <div className="mt-10 ">
        <img
          className="w-[200px] mx-auto mb-10"
          src="http://localhost:8000/resources/images/kfc.png"
          alt=""
        />
      </div>
      <h1 className="text-6xl text-center mb-10">
        QUẢN LÝ CỬA HÀNG THỨC ĂN NHANH
      </h1>
    </div>
  );
}
