import React from "react";
import Section from "../../utils/components/Section";
import { Row } from "antd";
import { commomBoxList } from "../../static/AdminData";

export default function MainDashBoard() {
  return (
    <div className="main-dashboard container mx-auto">
      <Row className="h-full">
        <Section span={24} lg={8} xl={8} className="h-full">
          <div className="section-earning p-8 flex justify-between">
            <div>
              <h2 className="mb-4 font-bold opacity-50 text-2xl">
                Số tiền kiếm được tháng này
              </h2>
              <p class="text-4xl">360.0000 VNĐ</p>
            </div>
            <div className="earning-icon rounded-full h-[54px] bg-sky-400 flex items-center justify-center w-[54px]">
              <p class="text-4xl text-white font-semibold">$</p>
            </div>
          </div>
        </Section>
        {commomBoxList.map((item) => (
          <Section span={6} lg={4} xl={4}>
            <div className="section-customer p-8">
              <div
                className={`rounded-full ${item.bg} inline-block p-6 text-3xl mb-3`}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-bold">39.500</p>
                <p>{item.text}</p>
              </div>
            </div>
          </Section>
        ))}
        <Section span={24}>
          <div className="p-8">
            <h2 className="font-bold text-3xl opacity-80">Revenue Updates</h2>
          </div>
        </Section>
      </Row>
    </div>
  );
}
