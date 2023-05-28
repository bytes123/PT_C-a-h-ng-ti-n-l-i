import React, { useEffect, useState } from "react";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import { Button, Table, Input } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import useAdminDetailProduct from "../../utils/hooks/Admin/useAdminDetailProduct";
import Time from "../../utils/components/Time";
import AddForm from "./DetailProduct/AddForm";
import UpdateForm from "./DetailProduct/UpdateForm";
import Toast from "../../utils/components/Toast";
import Spinner from "../../utils/components/Spinner";
import {
  deleteDetailProduct,
  searchDetailProduct,
} from "../../features/detail_product/detailProductSlice";

import { useDispatch, useSelector } from "react-redux";
export default function MainDetailProduct() {
  const dispatch = useDispatch();
  const { Search } = Input;

  const addData = (values) => {
    console.log(values);
  };

  const {
    values,
    handleChangeValue,
    handleSelect,
    handleSetValue,
    submit,
    errors,
    clearErrors,
    clearValues,
  } = useValidateForm(addData);

  const {
    isDelete,
    isEdit,
    isAdd,
    handleOpenEdit,
    handleCloseEdit,
    handleCloseDelete,
    handleOpenDelete,
    handleCloseAdd,
    handleOpenAdd,
    idDelete,
  } = useAdminController(
    handleChangeValue,
    handleSetValue,
    clearErrors,
    clearValues
  );

  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(deleteDetailProduct({ id: id })).unwrap();
    } catch (error) {
      setIsToast({
        style: "error",
        value: true,
        body: "Xảy ra lỗi!",
      });
    }
  };

  const {
    detailProducts,
    products,
    isLoading,
    handleSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAll,
    handleOutSearch,
    setIsToast,
    isToast,
  } = useAdminDetailProduct(handleCloseDelete, handleCloseEdit, handleCloseAdd);

  const onSearch = async (value, callback) => {
    if (!value) {
      handleSearch(value, () =>
        setIsToast({
          style: "failed",
          value: true,
          body: "Vui lòng nhập tên sản phẩm để tìm kiếm",
        })
      );
    } else {
      handleSearch(value, async () => {
        await dispatch(searchDetailProduct(value));
      });
    }
  };

  console.log(products);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Tên chi nhánh",
      dataIndex: "branch_name",
      key: "branch_name",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Hàng tồn kho",
      dataIndex: "quantity",
      key: "quantity",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (data, arr, index) => (
        <p className="capitalize">
          {Number(data).toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
    {
      title: "Tỉ lệ giảm",
      dataIndex: "discount",
      key: "discount",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },

    {
      title: "Giá bán",
      dataIndex: "newPrice",
      key: "newPrice",
      render: (data, arr, index) => (
        <p className="capitalize">
          {data.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
        </p>
      ),
    },
    {
      title: "Số sao",
      dataIndex: "starpoint",
      key: "starpoint",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => (data ? <Time timestamp={data} /> : ""),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (data, arr, index) =>
        data ? <Time timestamp={data} /> : "Chưa cập nhật lần nào",
    },

    {
      title: "Hành động",
      dataIndex: "id",
      key: "id",
      render: (data, arr, index) => (
        <div className="flex">
          <button
            className="edit-btn mr-5"
            name="edit-btn"
            onClick={() => handleOpenEdit(arr)}
          >
            Sửa
          </button>
          <button className="delete-btn" onClick={() => handleOpenDelete(data)}>
            Xóa
          </button>
          {isDelete ? (
            <ConfirmDialog
              active={true}
              onConfirm={() => handleConfirmDelete(idDelete)}
              onClose={handleCloseDelete}
              header={"Bạn có chắc muốn xóa cột này ?"}
              content={"Bạn sẽ không thể phục hồi sau khi xóa cột!"}
            />
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="main_product mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <h1 className="text-4xl font-bold m-5">Quản lý chi tiết sản phẩm</h1>

      {isAdd && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleCloseAdd}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Thêm chi tiết sản phẩm</h3>
              <AddForm products={products} />
              {/* <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách sản phẩm
          </p>
          <div className="catalog_upload-wrapper">
            <UploadFileExcel dataCheck={catalogDataCheck} />
          </div> */}
            </div>
          </Section>
        </>
      )}

      {isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn cancel-btn p-4 text-right "
              onClick={handleCloseEdit}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Sửa chi tiết sản phẩm</h3>
              <UpdateForm products={products} updateValues={values} />
            </div>
          </Section>
        </>
      )}

      {!isAdd && !isEdit && (
        <>
          <Section span={24} className="p-4">
            <button
              className="form-btn confirm-btn p-4 mr-5 text-right "
              onClick={handleOpenAdd}
            >
              Thêm chi tiết sản phẩm
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">
                Danh sách chi tiết sản phẩm
              </h3>
              <div className="table-wrapper">
                <Search
                  className="w-[400px]  my-5 "
                  placeholder="Nhập tên sản phẩm để tìm kiếm"
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
                      loading={isLoadingAll}
                      onClick={!isLoadingAll && handleOutSearch}
                    >
                      Quay lại tất cả
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={detailProducts}
                  className="text-sm"
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
