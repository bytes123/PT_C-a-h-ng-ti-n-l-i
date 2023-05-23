import React, { useState, useEffect } from "react";
import { Card, Input, Form, Button, Radio } from "antd";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../../static/UserForm";
import useSignUp from "../../../utils/hooks/useSignUp";
import AddressForm from "../../../utils/components/AddressForm";
import Cookies from "js-cookie";
import {
  fetchAdminTypeUser,
  getAdminType,
  getErrors,
  getUpdateStatus,
} from "../../../features/user/userSlice";
import { fetchAllUser, updateStaff } from "../../../features/user/userSlice";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Utils/Avatar";
import useUploadImage from "../../../utils/hooks/useUploadImage";
import Toast from "../../../utils/components/Toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { update } from "lodash";

export default function UpdateForm({ error, setError, updateValues }) {
  const [form] = Form.useForm();

  let newrules = useSelector(getErrors);

  let adminTypes = useSelector(getAdminType);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const dispatch = useDispatch();

  const { setSelectedFile, imgData, clearImage } = useUploadImage(
    `http://localhost:8000/resources/avatar/${updateValues?.avatar}`
  );

  const handleChangeAvatar = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    console.log(newrules);
    setError(newrules);
  }, [newrules]);

  const updateSubmit = async (values) => {
    newValues?.confirmpassword && delete newValues.confirmpassword;
    newValues.old_user_avatar = updateValues?.avatar;
    newValues.current_user_name = updateValues?.user_name;
    newValues.type_user = checked;
    await dispatch(updateStaff(newValues)).unwrap();
  };

  const {
    placeHolder,
    handleChangeGender,
    setErrors,
    checked,
    handleSubmit,
    newValues,
    setNewValues,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    clearErrors,
    handleUpdatePermission,
    isChange,
  } = useSignUp(imgData, updateSubmit, updateValues);

  const handleChangeInput = (e) => {
    if ((error && error.user_name) || (error && error.email)) {
      setError({});
    }

    if (e.target.value == updateValues.user_name) {
      setError({
        user_name: "Vui lòng nhập tài khoản khác tại khoản hiện tại",
      });
      setErrors({
        user_name: "Vui lòng nhập tài khoản khác tại khoản hiện tại",
      });
    } else {
      setNewValues({
        ...newValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClosePassword = () => {
    setIsChangePassword(false);

    if (newValues?.password) {
      const { password, ...filterValues } = newValues;
      setNewValues(filterValues);
    }
  };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));

  useEffect(() => {
    dispatch(fetchAdminTypeUser()).unwrap();
  }, [checked]);
  return (
    <>
      <div className="user_form mt-5">
        {/* <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-4">
      Tạo tài khoản
    </h3> */}
        <Card
          style={{
            width: "800px",
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <h3 className="text-lg font-bold mb-2 text-3xl">
            Thông tin tài khoản
          </h3>
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={updateValues}
          >
            <Form.Item className="mt-5">
              <Avatar
                imgData={imgData?.imagePreviewUrl}
                handleChangeAvatar={handleChangeAvatar}
              />
            </Form.Item>
            {error && error.user_name ? (
              <Form.Item
                name="user_name"
                rules={rules.user_name}
                validateStatus={"error"}
                help={error.user_name}
              >
                <Input
                  onChange={handleChangeInput}
                  name="user_name"
                  onFocus={() => handleFocusPlaceHolder("user_name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.user_name}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="user_name" rules={rules.user_name}>
                <Input
                  onChange={handleChangeInput}
                  name="user_name"
                  onFocus={() => handleFocusPlaceHolder("user_name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.user_name}
                  className="font-medium"
                />
              </Form.Item>
            )}

            <Form.Item name="fullname" rules={rules.fullname}>
              <Input
                onChange={handleChangeInput}
                name="fullname"
                onFocus={() => handleFocusPlaceHolder("fullname")}
                onBlur={handleBlurPlaceHolder}
                placeholder={placeHolder.fullname}
                className="font-medium"
              />
            </Form.Item>

            <Form.Item>
              <h3 className="text-xl font-semibold mb-3">Giới tính</h3>
              <Radio.Group
                defaultValue={updateValues?.gender ?? "Nam"}
                onChange={handleChangeGender}
              >
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
                <Radio value={"Khác"}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="phone_number" rules={rules.phone_number}>
              <Input
                onChange={handleChangeInput}
                name="phone_number"
                onFocus={() => handleFocusPlaceHolder("phone_number")}
                onBlur={handleBlurPlaceHolder}
                placeholder={placeHolder.phone_number}
                className="font-medium"
              />
            </Form.Item>

            <AddressForm
              values={updateValues}
              newValues={newValues}
              handleValues={setNewValues}
              error={error}
              clearError={clearErrors}
              // status={status}
            />
            <h3 className="text-lg font-bold mb-2">Cấp quyền admin</h3>

            {adminTypes.map((item) => {
              const fetchChecked = updateValues?.detail_type_user.some(
                (value) => value.type_user_id == item.type_user_id
              );

              return (
                <div key={item.type_user_id} className="ml-5 mt-5">
                  <h4 className="text-red-700 font-semibold">
                    {item.type_user_name}
                  </h4>
                  <GreenSwitch
                    label="Admin"
                    onChange={() =>
                      handleUpdatePermission(item.type_user_id, fetchChecked)
                    }
                    checked={checked?.[item.type_user_id] ?? fetchChecked}
                  />
                </div>
              );
            })}

            <h3 className="text-lg font-bold mb-2">Bảo mật tài khoản</h3>
            {error && error.email ? (
              <Form.Item
                validateStatus={"error"}
                name="email"
                help={error.email}
                rules={rules.email}
                onChange={handleChangeInput}
              >
                <Input
                  onChange={handleChangeInput}
                  name="email"
                  onFocus={() => handleFocusPlaceHolder("email")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.email}
                  className="font-medium mb-3"
                />
              </Form.Item>
            ) : (
              <Form.Item name="email" rules={rules.email}>
                <Input
                  onChange={handleChangeInput}
                  name="email"
                  onFocus={() => handleFocusPlaceHolder("email")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.email}
                  className="font-medium"
                />
              </Form.Item>
            )}
            {!isChangePassword ? (
              <div
                className="rounded-xl cursor-pointer p-4 border w-[200px] background-active text-white text-2xl font-semibold font-quicksand text-center"
                onClick={() => setIsChangePassword(true)}
              >
                <p>Thay đổi mật khẩu</p>
              </div>
            ) : (
              <>
                <div
                  className="rounded-xl flex items-center cursor-pointer p-4 border w-[100px] mb-5 background-active text-white text-2xl font-semibold font-quicksand text-center"
                  onClick={handleClosePassword}
                >
                  <AiOutlineCloseCircle className="text-3xl" />
                  <p className="ml-3">Đóng</p>
                </div>
                <Form.Item name="password" rules={rules.password}>
                  <Input.Password
                    onChange={handleChangeInput}
                    name="password"
                    onFocus={() => handleFocusPlaceHolder("password")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.password}
                    className="font-medium"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmpassword"
                  dependencies={["password"]}
                  rules={rules.confirmpassword}
                >
                  <Input.Password
                    onFocus={() => handleFocusPlaceHolder("confirmpassword")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.confirmpassword}
                    className="font-medium"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`ml-auto rounded-xl p-10 text-2xl flex items-center justify-center font-bold ${
                  !isChange
                    ? "bg-slate-500 pointer-events-none"
                    : "bg-red-600 hover:bg-red-800"
                }`}
              >
                Cập nhật tài khoản
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
