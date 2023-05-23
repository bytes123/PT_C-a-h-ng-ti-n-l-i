import React, { useState } from "react";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import Section from "../../utils/components/Section";
import { Table, Button, Input, Tag } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import Toast from "../../utils/components/Toast";
import Time from "../../utils/components/Time";
import Spinner from "../../utils/components/Spinner";
import useAdminRate from "../../utils/hooks/Admin/useAdminRate";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
export default function MainRate() {
  const { isDelete, handleOpenDelete, handleCloseDelete, handleConfirmRate } =
    useAdminController();
  const { Search } = Input;
  const {
    rates,
    isToast,
    isLoading,
    isLoadingAllRates,
    isSearch,
    isLoadingSearch,
    onSearch,
    handleOutSearch,
    handleUpdate,
  } = useAdminRate();
  const columns = [
    {
      title: "STT",
      key: "rate_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "size",
      key: "size",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tên người đánh giá",
      dataIndex: "author",
      key: "author",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "content",
      key: "content",
      render: (data, arr, index) => <p>{data}</p>,
    },

    {
      title: "Số sao đánh giá",
      dataIndex: "starpoint",
      key: "starpoint",
      render: (data, arr, index) => <p>{data}</p>,
    },

    {
      title: "Ngày đánh giá",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => <Time timestamp={data} />,
    },

    {
      title: "Trạng thái",
      dataIndex: "statement",
      key: "statement",
      render: (data, arr, index) => (
        <>
          {data == "pending" ? (
            <div className="text-right">
              <Tag
                icon={<ExclamationCircleOutlined />}
                className="flex max-w-[180px] items-center ml-auto p-3 text-xl"
                color="warning"
              >
                Đang chờ duyệt đánh giá
              </Tag>
            </div>
          ) : (
            ""
          )}

          {data == "success" ? (
            <div className="text-right">
              <Tag
                icon={<CheckCircleOutlined />}
                className="flex max-w-[150px] items-center ml-auto p-3 text-xl"
                color="success"
              >
                Đánh giá thành công
              </Tag>
            </div>
          ) : (
            ""
          )}

          {data == "canceled" ? (
            <div className="text-right">
              <Tag
                icon={<CloseCircleOutlined />}
                className="flex max-w-[150px] items-center ml-auto p-3 text-xl"
                color="error"
              >
                Đánh giá thất bại
              </Tag>
            </div>
          ) : (
            ""
          )}
        </>
      ),
    },

    {
      title: "Hành động",
      dataIndex: "id",
      key: "action",
      render: (data, rate, index) => (
        <div className="flex">
          {rate.statement !== "success" ? (
            <button
              className="edit-btn mr-5"
              name="edit-btn"
              onClick={() =>
                handleUpdate({
                  statement: "success",
                  id: data,
                })
              }
            >
              Duyệt
            </button>
          ) : (
            <button
              className="delete-btn"
              onClick={() =>
                handleUpdate({
                  statement: "canceled",
                  id: data,
                })
              }
            >
              Hủy
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="main_brand mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />

      <h1 className="text-4xl font-bold m-5">Quản lý đánh giá</h1>

      <Section span={24}>
        <div className="wrapper p-8">
          <h3 className="text-2xl font-bold mb-5">Danh sách đánh giá</h3>
          <Search
            className="w-[400px]  my-5 "
            placeholder="Nhập tên mã sản phẩm hoặc tên sản phẩm để tìm kiếm"
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
                loading={isLoadingAllRates}
                onClick={!isLoadingAllRates && handleOutSearch}
              >
                Quay lại tất cả
              </Button>
            </div>
          ) : (
            ""
          )}
          <div className="table-wrapper">
            <Table
              bordered={true}
              columns={columns}
              dataSource={rates}
              className="text-sm"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
