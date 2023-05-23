import React from "react";
import Table from "../../components/Checkout/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
export default function CheckoutCart({ checkoutCart }) {
  const checkoutHeading = [
    {
      id: 1,
      title: "Sản phẩm",
    },
    {
      id: 2,
      title: "Giá",
    },
    {
      id: 3,
      title: "Số lượng",
    },
    {
      id: 4,
      title: "Thành tiền",
    },
  ];

  return (
    <div>
      <div className="heading flex mb-20 font-quicksand justify-between">
        <div>
          <h1 className="mb-5  font-semibold text-6xl">Thanh toán</h1>
          <p className=" font-semibold text-2xl opacity-70">
            Có {checkoutCart.length} sản phẩm sẽ được thanh toán
          </p>
        </div>
      </div>
      <div className="flex mb-10 justify-between">
        <Link to="/gio-hang">
          <button className="background-active font-bold flex items-center text-2xl text-white py-4 px-8 rounded-xl">
            <IoMdArrowRoundBack className="mr-3 text-3xl" />
            Quay lại giỏ hàng
          </button>
        </Link>
      </div>
      <Table
        checkedList={false}
        heading={checkoutHeading}
        list={checkoutCart}
        theadClassName={"bg-slate-100 rounded-2xl"}
        thClassName={"p-8 text-2xl text-gray-700"}
      />
    </div>
  );
}
