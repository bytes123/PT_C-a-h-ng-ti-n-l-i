import { Button, Input, Table, Tag } from "antd";
import React from "react";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import Time from "../../utils/components/Time";
import { loginedUser } from "../../utils/hooks/useAccessUser";

export default function MainBill({ bills, handleOpenDetailBill }) {
  const {
    isDelete,
    idDelete,
    handleCloseDelete,
    handleOpenDelete,
    handleUpdateStatement,
  } = useAdminController();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Đơn giá",
      dataIndex: "bill_price",
      key: "bill_price",
      render: (bill_price) =>
        bill_price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "checkout_method",
      key: "checkout_method",
      render: (checkout_method) =>
        checkout_method == "COD"
          ? "Thanh toán trực tiếp"
          : checkout_method == "ATM"
          ? "Thanh toán ATM"
          : checkout_method == "PAYPAL"
          ? "Thanh toán PAYPAL"
          : "",
    },
    {
      title: "Ngày lập đơn",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => <Time timestamp={data} />,
    },

    {
      title: "Thao tác",
      dataIndex: "id",
      key: "watch",
      render: (bill_id) => (
        <div className="flex justify-center">
          <button
            className="btn-dark font-semibold "
            onClick={() => handleOpenDetailBill(bill_id)}
          >
            Xem chi tiết
          </button>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "bill_statement",
      key: "bill_statement",
      render: (_, { bill_statement }) => {
        let color = "";
        if (bill_statement == "canceled") {
          color = "volcano";
        } else if (bill_statement == "confirmed") {
          color = "green";
        } else if (bill_statement == "success") {
          color = "green";
        } else if (bill_statement == "ship_success") {
          color = "green";
        } else if (bill_statement == "pending") {
          color = "gold";
        }
        return (
          <div className="flex justify-center">
            <Tag color={color} key={bill_statement}>
              {bill_statement == "ship_success"
                ? "Giao thành công".toUpperCase()
                : ""}
              {bill_statement == "success"
                ? "Nhận hàng thành công".toUpperCase()
                : ""}
              {bill_statement == "confirmed" ? "Đã duyệt".toUpperCase() : ""}
              {bill_statement == "canceled" ? "Đã hủy".toUpperCase() : ""}
              {bill_statement == "pending"
                ? "Đang chờ duyệt".toUpperCase()
                : ""}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "bill_statement",
      key: "action",
      render: (bill_statement, bill, index) => (
        <div className="flex items-center justify-center">
          <div>
            {bill_statement == "pending" &&
            bill?.checkout_method == "COD" &&
            loginedUser ? (
              <button
                className="delete-btn font-semibold ml-5 inline"
                onClick={() => handleOpenDelete(bill)}
              >
                Hủy đơn
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={bills}
        className="text-sm"
      />
    </div>
  );
}
