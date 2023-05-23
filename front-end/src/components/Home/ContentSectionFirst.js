import React from "react";
import { Button } from "antd";

export default function ContentSectionFirst() {
  return (
    <div
      className="first_section my-10 flex flex-col justify-center items-center  opacity-100"
      style={{
        backgroundImage: `url(${require("../../assets/images/bn1.png")})`,
      }}
    >
      <div className="flex">
        <div>
          <img
            className="h-[300px] scale-x-[-1]"
            src={require("../../assets/images/h1.png")}
            alt=""
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <h3 className="font-bold text-xl mb-10 text-brand text-6xl font-quicksand">
            THỰC PHẨM SẠCH
          </h3>
          <p className="mb-5 font-medium text-[15px] lg:w-[400px] text-center">
            {/* Send holiday cheer in a flash with a thoughtful Starbucks eGift. */}
          </p>
          <button className="background-active p-6 rounded-xl font-bold text-3xl w-auto text-white">
            Dọn hàng ngay
          </button>
        </div>
      </div>
    </div>
  );
}
