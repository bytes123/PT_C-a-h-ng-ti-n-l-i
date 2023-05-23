import React, { useState, useEffect } from "react";
import Section from "../../utils/components/Section";
import { Button, Input, Table, Tag } from "antd";
import useAdminBill from "../../utils/hooks/Admin/useAdminBill";
import Toast from "../../utils/components/Toast";
import Spinner from "../../utils/components/Spinner";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import ClassifySection from "../../utils/components/ClassifySection";
import useClassifySection from "../../utils/hooks/useClassifySection";
import DetailBill from "../../components/HistoryBill/DetailBill";
import Time from "../../utils/components/Time";

export default function MainBill() {
  const { Search } = Input;

  const { isDelete, idDelete, handleCloseDelete, handleOpenDelete } =
    useAdminController();

  const defaultDisplay = 10;
  const defaultSort = "all";

  const displayChildren = [
    {
      key: defaultDisplay,
      value: 10,
    },
    {
      key: 20,
      value: 20,
    },
  ];

  const sortChildren = [
    {
      key: defaultSort,
      value: "Tất cả",
    },
    {
      key: "pending",
      value: "Chờ duyệt",
    },
    {
      key: "payed_success",
      value: "Đã thanh toán",
    },
    {
      key: "payed_pending",
      value: "Chưa thanh toán",
    },
    {
      key: "ship_success",
      value: "Đã giao",
    },
    {
      key: "success",
      value: "Đã nhận hàng",
    },
    {
      key: "canceled",
      value: "Đã hủy",
    },
    {
      key: "createdAt",
      value: "Ngày lập đơn",
    },
  ];

  const {
    handleSwitch,
    activeIndex,
    activeDisplayIndex,
    handleActiveDisplayIndex,
    activeSortIndex,
    handleActiveSortIndex,
    classifyMenu,
  } = useClassifySection(displayChildren, sortChildren);

  const {
    bills,
    handleUpdateStatement,
    isToast,
    isLoading,
    onSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllBill,
    handleOutSearch,
    handleUpdatePayed,
    handleOpenDetailBill,
    isDetailBill,
    detailBill,
    billId,
    bill,
    handleCloseDetailBill,
  } = useAdminBill(activeSortIndex);
  const [pageSize, setPageSize] = useState(defaultDisplay);

  useEffect(() => {
    if (activeDisplayIndex) {
      setPageSize(activeDisplayIndex);
    }
  }, [activeDisplayIndex]);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số điện thoại khách hàng",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ khách hàng",
      dataIndex: "address",
      key: "address",
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
      render: (data) => <Time timestamp={data} />,
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "watch",
      render: (bill_id) => (
        <div className="flex justify-center">
          <button
            className="btn-dark font-semibold "
            onClick={() => handleOpenDetailBill(bill_id, true)}
          >
            Xem chi tiết
          </button>
        </div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "bill_statement",
      key: "bill_statement",
      render: (_, { bill_statement }) => {
        let color = "";
        if (bill_statement == "canceled") {
          color = "volcano";
        } else if (bill_statement == "confirmed") {
          color = "green";
        } else if (bill_statement == "ship_success") {
          color = "green";
        } else if (bill_statement == "success") {
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
      title: "Trạng thái thanh toán",
      dataIndex: "bill_payed",
      key: "bill_payed",
      render: (_, { bill_payed }) => {
        let color = "";
        if (bill_payed) {
          color = "green";
        } else {
          color = "gold";
        }
        return (
          <div className="flex justify-center">
            <Tag color={color} key={bill_payed}>
              {bill_payed
                ? "ĐÃ THANH TOÁN".toUpperCase()
                : "CHƯA THANH TOÁN".toUpperCase()}
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
          <div className="flex flex-col justify-center">
            {bill_statement == "pending" ? (
              <button
                className="confirm-btn mb-5  font-semibold"
                onClick={() =>
                  handleUpdateStatement({
                    bill_statement: "confirmed",
                    id: bill.id,
                  })
                }
              >
                Duyệt
              </button>
            ) : (
              ""
            )}
            {bill_statement == "confirmed" ? (
              <button
                className="confirm-btn font-semibold mb-5"
                onClick={() =>
                  handleUpdateStatement({
                    bill_statement: "ship_success",
                    id: bill.id,
                  })
                }
              >
                Đã giao
              </button>
            ) : (
              ""
            )}
            {bill_statement == "pending" || bill_statement == "confirmed" ? (
              <button
                className="delete-btn  mb-5  font-semibold "
                onClick={() =>
                  handleUpdateStatement({
                    bill_statement: "canceled",
                    id: bill.id,
                  })
                }
              >
                Hủy
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col justify-center items-center">
            {!bill?.bill_payed && bill?.checkout_method == "ATM" ? (
              <button
                className="confirm-btn font-semibold ml-5 mb-5 inline"
                onClick={() => handleUpdatePayed(bill.id)}
              >
                Xác nhận thanh toán
              </button>
            ) : (
              ""
            )}
            {/* <div>
              <button
                className="delete-btn font-semibold ml-5 mb-5 inline"
                onClick={() => handleOpenDelete(bill)}
              >
                Xóa
              </button>
            </div>

            {isDelete ? (
              <ConfirmDialog
                active={true}
                // onConfirm={() => handleConfirmDelete(idDelete)}
                onClose={handleCloseDelete}
                header={"Bạn có chắc muốn xóa cột này ?"}
                content={"Bạn sẽ không thể phục hồi sau khi xóa cột!"}
              />
            ) : (
              ""
            )} */}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    console.log(bills);
  }, [bills]);

  return (
    <div className="main_product mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      {isDetailBill ? (
        <Section span={24} className="p-20">
          <DetailBill
            handleUpdateStatement={handleUpdateStatement}
            bill={bill}
            detailBill={detailBill}
            billId={billId}
            handleCloseDetailBill={handleCloseDetailBill}
          />
        </Section>
      ) : (
        <Section span={24}>
          <div className="wrapper p-8">
            <h1 className="text-4xl font-bold mb-8">Quản lý đơn hàng</h1>

            <div className="flex justify-between items-center mb-5">
              <div>
                <Search
                  className="w-[800px]  my-5 "
                  placeholder="Nhập mã đơn hàng hoặc số điện thoại để tìm kiếm"
                  enterButton="Tìm kiếm"
                  size="large"
                  onSearch={onSearch}
                  loading={isLoadingSearch}
                />

                {isSearch ? (
                  <div>
                    <Button
                      className="mb-5"
                      type="primary"
                      danger
                      loading={isLoadingAllBill}
                      onClick={!isLoadingAllBill && handleOutSearch}
                    >
                      Quay lại tất cả
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <ClassifySection
                className="justify-end"
                activeIndex={activeIndex}
                data={classifyMenu}
                onSwitch={handleSwitch}
                activeDisplayIndex={activeDisplayIndex ?? defaultDisplay}
                onActiveDisplayIndex={handleActiveDisplayIndex}
                activeSortIndex={activeSortIndex ?? defaultSort}
                onActiveSortIndex={handleActiveSortIndex}
              />
            </div>

            <div className="table-wrapper">
              <Table
                pagination={{ pageSize: pageSize }}
                bordered={true}
                columns={columns}
                dataSource={bills}
                className="text-sm"
              />
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
