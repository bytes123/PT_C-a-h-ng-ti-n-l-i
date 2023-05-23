import React from "react";
import Table from "../../components/Checkout/Table";
export default function CheckoutDetailBill({ detail_bill }) {
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
    <Table
      checkedList={false}
      heading={checkoutHeading}
      list={detail_bill}
      theadClassName={"bg-slate-100 rounded-2xl"}
      thClassName={"p-8 text-2xl text-gray-700"}
    />
  );
}
