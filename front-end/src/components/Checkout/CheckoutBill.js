import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function CheckoutBill({ bill_infor }) {
  return (
    <div>
      <div>
        <div className="flex items-center justify-center mr-40 mt-10">
          <div>
            <GiConfirmed className="text-8xl text-green-600" />
          </div>
          <div className=" ml-10 font-quicksand font-semibold text-4xl flex flex-col items-center">
            <p className="mb-5">WEBSITE BÁN THỰC PHẨM </p>
            <p>Đặt hàng thành công</p>
          </div>
        </div>
        <div className="flex justify-center font-quicksand mt-20">
          <div className="border-2 px-40 py-10 rounded-xl">
            <h1 className="text-3xl ">Thông tin đơn hàng</h1>
            <div className="mt-5 ml-10">
              <div className="mb-5">
                <p>Mã đơn hàng: {bill_infor?.id}</p>
              </div>
              <div className="mb-5">
                <p>Tên khách hàng: {bill_infor?.fullname}</p>
              </div>
              <div className="mb-5">
                <p>Số điện thoại: {bill_infor?.phone_number}</p>
              </div>
              <div className="mb-5">
                <p>Địa chỉ giao hàng: {bill_infor?.address}</p>
              </div>
              <div>
                <p>Ghi chú: {bill_infor?.note}</p>
              </div>
            </div>
            <h1 className="text-3xl mt-10">Phương thức thanh toán</h1>
            <div className="mt-5 ml-10">
              <div>
                {bill_infor?.ship_method == "COD" ? (
                  <p>Thanh toán khi giao hàng COD</p>
                ) : (
                  ""
                )}
                {bill_infor?.ship_method == "ATM" ? (
                  <p>Thanh toán bằng ATM</p>
                ) : (
                  ""
                )}
                {bill_infor?.ship_method == "PAYPAL" ? (
                  <p>Đã thanh toán paypal</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h1 className="text-3xl mt-10">Tiền thu người nhận</h1>
            <div className="mt-5 ml-10">
              <div>
                <p className="text-3xl font-semibold">
                  {bill_infor?.bill_price?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/thuc-don">
          {" "}
          <button className="background-active text-white font-semibold text-3xl w-[300px] py-5 px-10 mt-10 rounded-lg flex justify-center items-center">
            Tiếp tục mua hàng{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
