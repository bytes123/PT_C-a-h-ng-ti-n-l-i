import React, { useState, useEffect } from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import { Button, Table, Input } from "antd";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../utils/components/Time";
import AddForm from "./Product/AddForm";
import UpdateForm from "./Product/UpdateForm";
import useAdminProduct from "../../utils/hooks/Admin/useAdminProduct";
import { resetAllErrors } from "../../features/product/productSlice";
import Toast from "../../utils/components/Toast";
import {
  deleteProduct,
  searchProduct,
} from "../../features/product/productSlice";
import Spinner from "../../utils/components/Spinner";

export default function MainProduct() {
  const { Search } = Input;
  const dispatch = useDispatch();

  const addData = (values) => {
    console.log(values);
  };

  const { values, handleChangeValue, handleSetValue } =
    useValidateForm(addData);

  const clearUpdate = async () => {
    dispatch(resetAllErrors());
  };
  const clearAdd = async () => {
    dispatch(resetAllErrors());
  };

  const {
    isDelete,
    isEdit,
    isAdd,
    handleOpenEdit,
    handleCloseEdit,
    handleCloseDelete,
    handleCloseAdd,
    handleOpenDelete,
    handleOpenAdd,
    idDelete,
  } = useAdminController(
    handleChangeValue,
    handleSetValue,
    clearUpdate,
    clearAdd
  );

  const {
    products,
    categories,
    branches,
    brands,
    handleSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllProducts,
    handleOutSearch,
    isLoading,
    isToast,
    setIsToast,
  } = useAdminProduct(handleCloseEdit, handleCloseDelete, handleCloseAdd);

  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(deleteProduct({ id: id })).unwrap();
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

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
        await dispatch(searchProduct(value));
      });
    }
  };

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
      title: "Hình sản phẩm",
      dataIndex: "image1",
      key: "image1",
      render: (data, arr, index) => (
        <img
          className="w-[80px] object-contain"
          src={
            arr.image1 !== "default.jpg"
              ? `http://localhost:8000/resources/product/${arr.id}/${arr.image1}`
              : `http://localhost:8000/resources/product/${arr.image1}`
          }
          alt=""
        />
      ),
    },
    {
      title: "Tên chi nhánh",
      dataIndex: "branch_name",
      key: "branch_name",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Tên nhà sản xuất",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (data, arr, index) => <p className="capitalize">{data}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => <Time timestamp={data} />,
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
    <div className="main_catalog mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <h1 className="text-4xl font-bold m-5">Quản lý loại sản phẩm</h1>

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
              <h3 className="text-2xl font-bold">Thêm sản phẩm</h3>
              <AddForm
                categories={categories}
                brands={brands}
                branches={branches}
              />
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
              <h3 className="text-2xl font-bold">Cập nhật sản phẩm</h3>
              <UpdateForm
                categories={categories}
                brands={brands}
                updateValues={values}
              />
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
              Thêm sản phẩm
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h3>
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
                    loading={isLoadingAllProducts}
                    onClick={!isLoadingAllProducts && handleOutSearch}
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
                  dataSource={products}
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
