import React, { useState, useEffect } from "react";
import Section from "../../utils/components/Section";
import UploadFileExcel from "../../utils/components/UploadFileExcel";
import ConfirmDialog from "../../utils/components/ConfirmDialog";
import useAdminController from "../../utils/hooks/Admin/useAdminController";
import { Button, Table, Input } from "antd";
import useValidateForm from "../../utils/hooks/Admin/useValidateForm";
import Toast from "../../utils/components/Toast";
import AddForm from "./User/AddForm";
import {
  deleteUser,
  searchUser,
  resetUpdateStatus,
  resetErrors,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../utils/components/Time";
import useMainUser from "../../utils/hooks/useMainUser";
import UpdateForm from "./User/UpdateForm";
import useClassifySection from "../../utils/hooks/useClassifySection";
import ClassifySection from "../../utils/components/ClassifySection";
import { loginedUser } from "../../utils/hooks/useAccessUser";
export default function MainUser() {
  const { Search } = Input;
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [error, setError] = useState({});

  const addData = (values) => {
    values.user_type = "admin";
  };
  const clearUpdate = async () => {
    await dispatch(resetUpdateStatus());
    await dispatch(resetErrors());
  };

  const successDelete = () => {
    handleCloseDelete();
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa tài khoản thành công",
    });
  };

  const successUpdate = () => {
    handleCloseEdit();
    setError({});
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật tài khoản thành công",
    });
  };

  const clearToast = () => {
    setIsToast({
      value: false,
      body: "",
    });
  };

  const { values, handleChangeValue, handleSetValue } =
    useValidateForm(addData);

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
  } = useAdminController(handleChangeValue, handleSetValue, clearUpdate);

  const sortChildren = [
    {
      key: 10,
      value: 10,
    },
    {
      key: 20,
      value: 20,
    },
  ];

  const displayChildren = [
    {
      key: "all",
      value: "Tất cả",
    },
    {
      key: "customer",
      value: "Khách hàng",
    },
    {
      key: "admin",
      value: "Admin",
    },
    {
      key: "createdAt",
      value: "Ngày tạo",
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
  } = useClassifySection(sortChildren, displayChildren);

  useEffect(() => {
    handleActiveDisplayIndex(10);
    handleActiveSortIndex("all");
  }, []);

  useEffect(() => {
    setPageSize(activeDisplayIndex);
  }, [activeDisplayIndex]);

  const {
    users,
    isLoadingSearch,
    isSearch,
    handleSearch,
    handleOutSearch,
    isLoadingAllUsers,
    currentSearch,
  } = useMainUser(
    successDelete,
    successUpdate,
    clearToast,
    activeDisplayIndex,
    activeSortIndex
  );

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleEditBack = async () => {
    console.log(isEdit);
    handleCloseEdit();
  };

  const handleConfirmDelete = async (user_name) => {
    try {
      await dispatch(deleteUser({ user_name: user_name })).unwrap();
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
          body: "Vui lòng nhập tên tài khoản hoặc email để tìm kiếm",
        })
      );
    } else {
      handleSearch(value, async () => {
        await dispatch(searchUser(value));
      });
    }
  };

  useEffect(() => {
    console.log(currentSearch);
  }, [currentSearch]);

  const columns = [
    {
      title: "STT",
      key: "row_index",
      render: (data, arr, index) => index + 1,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (data, arr, index) => (
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={`http://localhost:8000/resources/avatar/${data}`}
          alt=""
        />
      ),
    },
    {
      title: "Tên chủ tài khoản",
      dataIndex: "fullname",
      key: "fullname",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Tài khoản",
      dataIndex: "user_name",
      key: "user_name",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (data, arr, index) => <p>{data}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (data, user, index) => (
        <p>
          {user.address +
            "," +
            user.ward_name +
            "," +
            user.district_name +
            "," +
            user.province_name}
        </p>
      ),
    },
    {
      title: "Trạng thái online",
      dataIndex: "online",
      key: "online",
      render: (data, arr, index) =>
        data ? (
          <p className="flex items-center mt-2">
            <p className="w-[10px] h-[10px] rounded-full bg-green-700"></p>
            <span className="text-xl ml-2 font-semibold text-brand">
              Online
            </span>
          </p>
        ) : (
          <p className="flex items-center mt-2">
            <p className="w-[10px] h-[10px] rounded-full bg-slate-700"></p>
            <span className="text-xl ml-2 font-semibold text-slate-500">
              Offline
            </span>
          </p>
        ),
    },
    {
      title: "Loại tài khoản",
      dataIndex: "detail_type_user",
      key: "detail_type_user",
      render: (data, arr, index) => {
        let renders = []; // Mảng lưu trữ các phần tử render cần hiển thị

        if (data.some((item) => item.type_user_id == "admin")) {
          renders.push(
            <div key="admin">
              <p className="font-bold text-red-700">Admin</p>
            </div>
          );
        }

        if (data.some((item) => item.type_user_id == "staff")) {
          renders.push(
            <p key="staff" className="font-semibold text-red-700">
              Nhân viên
            </p>
          );
        }

        if (data.some((item) => item.type_user_id == "normal-customer")) {
          renders.push(
            <p key="normal-customer" className="font-semibold text-slate-900">
              Khách hàng
            </p>
          );
        }

        if (renders.length > 0) {
          // Kiểm tra nếu có ít nhất một phần tử trong mảng renders
          return renders;
        } else {
          return <p className="font-semibold text-slate-900">None</p>;
        }
      },
    },
    {
      title: "Thời gian tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data, arr, index) => <Time timestamp={data} />,
    },
    {
      title: "Thời gian cập nhật gần nhất",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (data, arr, index) =>
        data ? <Time timestamp={data} /> : "Chưa cập nhật lần nào",
    },

    {
      title: "Hành động",
      dataIndex: "user_name",
      key: "user_name",
      render: (data, arr, index) => (
        <>
          <div className="flex">
            <button
              className="edit-btn mr-5"
              name="edit-btn"
              onClick={() => handleOpenEdit(arr, index)}
            >
              Sửa
            </button>
            <button
              className="delete-btn"
              onClick={() => handleOpenDelete(data)}
            >
              Xóa
            </button>
          </div>
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
        </>
      ),
    },
  ];

  return loginedUser &&
    loginedUser.type_user.some((item) => item.type_user_id == "admin") ? (
    <div className="main_user mx-2">
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <h1 className="text-4xl font-bold m-5">Quản lý tài khoản</h1>

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
              <h3 className="text-2xl font-bold">Thêm tài khoản</h3>
              <AddForm />
              {/* <p className="admin_catalog-add-content m-5">
            Chọn 1 tệp Excel bao gồm danh sách tài khoản
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
              onClick={handleEditBack}
            >
              Trở về
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold">Sửa tài khoản</h3>
              <UpdateForm
                error={error}
                setError={setError}
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
              Thêm tài khoản
            </button>
          </Section>
          <Section span={24}>
            <div className="wrapper p-8 ">
              <h3 className="text-2xl font-bold mb-5">Danh sách tài khoản</h3>
              <div className="flex justify-between items-center mb-5">
                <Search
                  className="w-[400px]  my-5 "
                  placeholder="Nhập tên tài khoản hoặc email để tìm kiếm"
                  enterButton="Tìm kiếm"
                  size="large"
                  onSearch={onSearch}
                  loading={isLoadingSearch}
                />
                <ClassifySection
                  className="justify-end"
                  activeIndex={activeIndex}
                  data={classifyMenu}
                  onSwitch={handleSwitch}
                  activeDisplayIndex={activeDisplayIndex}
                  onActiveDisplayIndex={handleActiveDisplayIndex}
                  activeSortIndex={activeSortIndex}
                  onActiveSortIndex={handleActiveSortIndex}
                />
              </div>

              {isSearch ? (
                <div>
                  <Button
                    className="mb-5"
                    type="primary"
                    danger
                    loading={isLoadingAllUsers}
                    onClick={!isLoadingAllUsers && handleOutSearch}
                  >
                    Quay lại tất cả
                  </Button>
                </div>
              ) : (
                ""
              )}

              <div className="table-wrapper">
                <Table
                  pagination={{ pageSize: pageSize }}
                  bordered={true}
                  columns={columns}
                  dataSource={users}
                  className="text-sm"
                />
              </div>
            </div>
          </Section>
        </>
      )}
    </div>
  ) : (
    <h1 className="font-semibold text-4xl text-center p-10">
      Bạn không đủ quyền để truy cập trang này
    </h1>
  );
}
