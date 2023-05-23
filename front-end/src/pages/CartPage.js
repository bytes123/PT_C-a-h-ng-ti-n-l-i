import React from "react";
import { BsTrash } from "react-icons/bs";
import Table from "../components/Cart/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import useCart from "../utils/hooks/useCart";
import Toast from "../utils/components/Toast";
export default function CartPage() {
  const {
    isToast,
    cart,
    cartCheckedPrice,
    shipPrice,
    cartCheckedSubPrice,
    handleCheckOut,
    handleUpQuantity,
    handleDownQuantity,
    handleChangeInputNumber,
    handleAllCheck,
    handleCheckById,
    handleUpdateCart,
    handleDeleteCart,
  } = useCart();

  const cartHeading = [
    {
      id: 0,
      title: (
        <input
          type="checkbox"
          checked={cart.every((item) => item?.checked)}
          onChange={(e) => handleAllCheck(e.target.checked)}
          className="scale-150  cursor-pointer "
        />
      ),
    },
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
    {
      id: 5,
      title: "Xóa",
    },
  ];

  return (
    <div className="cart_page ">
      <Toast
        position={isToast?.position}
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <div className="grid grid-cols-3">
        <div className="p-8 mt-20  lg:col-span-2 col-span-3">
          <div className="heading flex mb-20 font-quicksand justify-between">
            <div>
              <h1 className="mb-5  font-semibold text-6xl">Giỏ hàng của bạn</h1>
              <p className=" font-semibold text-2xl opacity-70">
                Có {cart.length} sản phẩm trong giỏ của bạn
              </p>
            </div>
            {/* {cart?.length ? (
              <div className="flex items-center">
                <button className="font-semibold text-2xl flex items-center opacity-50 hover:bg-red-500 hover:text-white hover:opacity-100 p-4 rounded-xl transition-all">
                  <BsTrash className=" mr-3" />
                  Xóa giỏ hàng
                </button>
              </div>
            ) : (
              ""
            )} */}
          </div>
          <div className="flex mb-10 justify-between">
            <button className="background-active font-bold flex items-center text-2xl text-white py-4 px-8 rounded-xl">
              <IoMdArrowRoundBack className="mr-3 text-3xl" />
              Tiếp tục mua
            </button>
            <button
              onClick={handleUpdateCart}
              className="background-active items-center flex font-bold text-2xl text-white py-4 px-8 rounded-xl"
            >
              <RxUpdate className="text-white text-3xl mr-3" />
              Cập nhật giỏ hàng
            </button>
          </div>
          <Table
            heading={cartHeading}
            list={cart}
            handleUpQuantity={handleUpQuantity}
            handleDownQuantity={handleDownQuantity}
            handleChangeInputNumber={handleChangeInputNumber}
            handleCheckById={handleCheckById}
            theadClassName={"bg-slate-100 rounded-2xl"}
            thClassName={"p-8 text-2xl text-gray-700"}
            handleDeleteCart={handleDeleteCart}
          />
        </div>
        <div className="lg:col-span-1 col-span-3">
          <div className="p-8">
            <div className="border p-12 max-w-[500px] rounded-2xl mx-auto">
              <div className="border  font-quicksand ">
                <div className=" flex justify-between p-4">
                  <h4 className="text-3xl font-semibold opacity-70">Đơn giá</h4>
                  <p className="text-4xl font-bold text-brand">
                    {cartCheckedSubPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="border-t p-8">
                  <div className="border"></div>
                </div>
                <div className=" flex justify-between border-t p-4">
                  <h4 className="text-3xl font-semibold opacity-70">
                    Tiền Ship
                  </h4>
                  <p className="text-4xl font-bold text-brand">
                    {shipPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
                <div className="border-t p-8">
                  <div className="border"></div>
                </div>
                <div className=" flex justify-between border-t py-4 px-10">
                  <h4 className="text-3xl font-semibold opacity-70">
                    Thành tiền
                  </h4>
                  <p className="text-4xl font-bold text-brand">
                    {cartCheckedPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
              <button
                className="background-active text-white font-semibold text-3xl w-100 py-5 px-10 mt-10 rounded-lg flex justify-center items-center"
                onClick={handleCheckOut}
              >
                Tiếp tục thanh toán
                <FiLogOut className="ml-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
