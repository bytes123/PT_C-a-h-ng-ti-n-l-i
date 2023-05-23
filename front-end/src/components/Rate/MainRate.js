import React from "react";
import StarPoints from "./StarPoint";
import MainRateForm from "./MainRateForm";
import { Button } from "antd";

export default function MainRate({
  activeItem,
  activeStar,
  handleOpenRateForm,
  form,
  handleSubmit,
  handleChange,
  isOpenRateForm,
}) {
  return (
    <div className="bg-white p-10 min-w-[800px] rounded-xl font-quicksand">
      <div className="border-b-2 border-rate">
        <h2 className="text-3xl mb-10">Đánh giá sản phẩm</h2>
      </div>
      <div className="my-10 flex items-center">
        <div>
          <img
            className="w-[120px] object-cover"
            src={
              activeItem.image1 !== "default.jpg"
                ? `http://localhost:8000/resources/product/${activeItem.product_id}/${activeItem.image1}`
                : `http://localhost:8000/resources/product/${activeItem.image1}`
            }
            alt=""
          />
        </div>
        <div>
          <span className="text-3xl ml-5">
            {activeItem?.name} {activeItem?.size}
          </span>
        </div>
      </div>
      <div className="flex my-10">
        <div className="max-w-[400px]">
          <h4 className="text-3xl">
            Bạn cảm thấy sản phẩm này như thế nào? (chọn sao nhé):
          </h4>
        </div>
        <StarPoints
          customClass="star_select"
          rateContent={true}
          activeStar={activeStar}
          handleOpenRateForm={handleOpenRateForm}
        />
      </div>
      {isOpenRateForm ? (
        <>
          <MainRateForm form={form} handleChange={handleChange} />
          <div className="text-center">
            <button
              className="background-active p-4 text-2xl rounded-xl text-white mt-5"
              onClick={handleSubmit}
            >
              Gửi đánh giá ngay
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
