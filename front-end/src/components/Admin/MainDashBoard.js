import React from "react";
import Section from "../../utils/components/Section";
import { Row } from "antd";
import { commomBoxList } from "../../static/AdminData";
import { SiWalmart } from "react-icons/si";
export default function MainDashBoard() {
  return (
    <div className="main-dashboard container mx-auto font-quicksand">
      <div className="mt-10">
        <SiWalmart className="text-[200px] mx-auto" />
      </div>
      <h1 className="text-6xl text-center mb-10">CỬA HÀNG TIỆN LỢI ONLINE</h1>
    </div>
  );
}
