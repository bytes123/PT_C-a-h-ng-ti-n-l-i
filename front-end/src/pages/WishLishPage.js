import React from "react";
import { BsTrash } from "react-icons/bs";
import Table from "../components/WishList/Table";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import useWishList from "../utils/hooks/useWishList";

export default function WishLishPage() {
  const heading = [
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
      title: "Trạng thái kho",
    },
    {
      id: 4,
      title: "Hành động",
    },
    {
      id: 5,
      title: "Xóa",
    },
  ];

  const { values } = useWishList();

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="p-8 mt-20  lg:col-span-2 col-span-3">
          <div className="heading flex mb-20 font-quicksand justify-between">
            <div>
              <h1 className="mb-5  font-semibold text-6xl">
                Danh sách yêu thích
              </h1>
              <p className=" font-semibold text-2xl opacity-70">
                Có 3 sản phẩm trong danh sách yêu thích của bạn
              </p>
            </div>
            <div className="flex items-center">
              <button className="font-semibold text-2xl flex items-center opacity-50 hover:bg-red-500 hover:text-white hover:opacity-100 p-4 rounded-xl transition-all">
                <BsTrash className=" mr-3" />
                Xóa danh sách yêu thích
              </button>
            </div>
          </div>
          <div className="flex mb-10 justify-between">
            <button className="background-active font-bold flex items-center text-2xl text-white py-4 px-8 rounded-xl">
              <IoMdArrowRoundBack className="mr-3 text-3xl" />
              Tiếp tục mua
            </button>
          </div>
          <Table
            heading={heading}
            list={values}
            theadClassName={"bg-slate-100 rounded-2xl"}
            thClassName={"p-8 text-2xl text-gray-700"}
          />
        </div>
      </div>
    </div>
  );
}
