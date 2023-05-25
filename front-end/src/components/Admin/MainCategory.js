import React, { useState, useEffect } from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import { Button, Table, Input } from "antd";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../utils/components/Time";
import AddForm from "./Category/AddForm";
import UpdateForm from "./Category/UpdateForm";
import useAdminCategory from "../../utils/hooks/Admin/useAdminCategory";
import { resetAllErrors } from "../../features/category/categorySlice";
import Toast from "../../utils/components/Toast";
import {
  deleteCategory,
  searchCategory,
} from "../../features/category/categorySlice";

export default function MainCategory() {
  const { Search } = Input;
  const dispatch = useDispatch();

  const addData = (values) => {
    console.log(values);
  };

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

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
    handleOpenDelete,
    handleCloseDelete,
    handleOpenAdd,
    handleCloseAdd,
    idDelete,
  } = useAdminController(
    handleChangeValue,
    handleSetValue,
    clearUpdate,
    clearAdd
  );

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  const addSuccess = () => {
    handleCloseAdd();
    setIsToast({
      style: "success",
      value: true,
      body: "Thêm danh mục thành công",
    });
  };

  const updateSuccess = () => {
    handleCloseEdit();
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật danh mục thành công",
    });
  };

  const deleteSuccess = () => {
    handleCloseDelete();
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa danh mục thành công",
    });
  };

  const {
    categories,
    handleSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllCategory,
    handleOutSearch,
  } = useAdminCategory(addSuccess, updateSuccess, deleteSuccess, resetToast);

  const handleConfirmDelete = async (id) => {
    try {
      await dispatch(deleteCategory({ id: id })).unwrap();
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
          body: "Vui lòng nhập tên danh mục để tìm kiếm",
        })
      );
    } else {
      handleSearch(value, async () => {
        await dispatch(searchCategory(value));
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tên chi nhánh",
      dataIndex: "branch_name",
      key: "branch_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => <Time timestamp={data} />,
    },
    {
      title: "Ngày cập nhật gần nhất",
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
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <h1 className="text-4xl font-bold m-5">Quản lý danh mục</h1>

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
              <h3 className="text-2xl font-bold">Thêm danh mục</h3>
              <AddForm />
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
              <h3 className="text-2xl font-bold">Sửa danh mục</h3>
              <UpdateForm updateValues={values} />
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
              Thêm danh mục
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách danh mục</h3>
              <Search
                className="w-[400px]  my-5 "
                placeholder="Nhập tên danh mục để tìm kiếm"
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
                    loading={isLoadingAllCategory}
                    onClick={!isLoadingAllCategory && handleOutSearch}
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
                  dataSource={categories}
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
