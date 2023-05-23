import React from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Table, Button } from "antd";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import { Input } from "antd";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import validateBrand from "../../utils/validates/validateBrand";
import AddForm from "./Brand/AddForm";
import UpdateForm from "./Brand/UpdateForm";
import useAdminBrand from "../../utils/hooks/Admin/UseAdminBrand";
import Toast from "../../utils/components/Toast";
import Time from "../../utils/components/Time";
import { resetAllErrors } from "../../features/brand/brandSlice";
import Spinner from "../../utils/components/Spinner";
import { useDispatch } from "react-redux";

export default function MainBrand() {
  const dispatch = useDispatch();
  const { Search } = Input;
  const addData = () => {};
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

  const {
    brands,
    onSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllBrand,
    handleOutSearch,
    isToast,
    handleConfirmDelete,
    isLoading,
  } = useAdminBrand(handleCloseAdd, handleCloseEdit, handleCloseDelete);

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Tên nhãn hàng",
      dataIndex: "name",
      key: "name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Số điện thoại ",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Email ",
      dataIndex: "email",
      key: "email",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Địa chỉ ",
      dataIndex: "address",
      key: "address",
      render: (data, arr, index) => <p>{data}</p>,
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
    <div className="main_brand mx-2">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />

      {isDelete ? (
        <ConfirmDialog
          active={true}
          onClose={handleCloseDelete}
          header={"Bạn có chắc muốn xóa cột này ?"}
          content={"Bạn sẽ không thể phục hồi sau khi xóa cột!"}
        />
      ) : (
        ""
      )}
      <h1 className="text-4xl font-bold m-5">Quản lý nhãn hàng</h1>

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
              <h3 className="text-2xl font-bold">Thêm nhãn hàng</h3>
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
              <h3 className="text-2xl font-bold">Cập nhật nhãn hàng</h3>
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
              Thêm nhãn hàng
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8">
              <h3 className="text-2xl font-bold mb-5">Danh sách nhãn hàng</h3>
              <Search
                className="w-[400px]  my-5 "
                placeholder="Nhập tên nhãn hàng để tìm kiếm"
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
                    loading={isLoadingAllBrand}
                    onClick={!isLoadingAllBrand && handleOutSearch}
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
                  dataSource={brands}
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
