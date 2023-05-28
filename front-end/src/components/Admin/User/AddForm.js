import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Radio, Select } from "antd";
import {
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../../static/UserForm";
import useSignUp from "../../../utils/hooks/useSignUp";
import AddressForm from "../../../utils/components/AddressForm";
import Cookies from "js-cookie";
import {
  addStaff,
  getErrors,
  getSignUpStatus,
  resetSignUpStatus,
} from "../../../features/authen/authenSlice";
import {
  fetchAdminTypeUser,
  getAdminType,
} from "../../../features/user/userSlice";
import { fetchAllUser } from "../../../features/user/userSlice";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Utils/Avatar";
import useUploadImage from "../../../utils/hooks/useUploadImage";
import Toast from "../../../utils/components/Toast";
import useAdminArea from "../../../utils/hooks/Admin/useAdminArea";

export default function AddForm() {
  const [isToast, setIsToast] = useState(false);

  let newrules = useSelector(getErrors);
  let status = useSelector(getSignUpStatus);
  let adminTypes = useSelector(getAdminType);

  const [error, setError] = useState(newrules);
  const dispatch = useDispatch();

  const { setSelectedFile, imgData, clearImage } = useUploadImage();
  const signUpSubmit = async (values) => {
    if (
      !values.user_province ||
      !values.user_district ||
      !values.user_ward ||
      !values.address
    ) {
      setError({
        ...error,
        address: "Vui lòng nhập đầy đủ địa chỉ",
      });
    } else {
      await dispatch(addStaff(values)).unwrap();
      dispatch(fetchAllUser()).unwrap();
    }
  };

  const clearError = () => {
    setError({});
  };

  const { branches } = useAdminArea();

  const {
    form,
    newValues,
    setNewValues,
    handlePermission,
    checked,
    placeHolder,
    clearChecked,
    clearUser,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    handleChangeGender,
  } = useSignUp(imgData, signUpSubmit);

  const handleChangeAvatar = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setError(newrules);
  }, [newrules]);

  const handleUserNameChange = () => {
    if ((error && error.user_name) || (error && error.email)) {
      setError({});
    }
  };

  useEffect(() => {
    if (status == "succeeded") {
      form.resetFields();
      clearChecked();
      clearUser();
      clearImage();
      setIsToast(true);
      setTimeout(() => {
        setIsToast(false);
      }, 5000);
    }

    return () => dispatch(resetSignUpStatus());
  }, [status]);

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
    console.log(newValues);
  }, [newValues]);

  useEffect(() => {
    dispatch(fetchAdminTypeUser()).unwrap();
  }, []);

  const { Option } = Select;

  return (
    <>
      <Toast body="Thêm tài khoản thành công" isSuccess={isToast} />
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
          <div>
            <h3 className="text-lg font-bold mb-2 text-3xl">
              Thông tin tài khoản
            </h3>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item className="mt-5">
                <Avatar
                  imgData={imgData.imagePreviewUrl}
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
                    onChange={handleUserNameChange}
                    onFocus={() => handleFocusPlaceHolder("user_name")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.user_name}
                    className="font-medium"
                  />
                </Form.Item>
              ) : (
                <Form.Item name="user_name" rules={rules.user_name}>
                  <Input
                    onChange={handleUserNameChange}
                    onFocus={() => handleFocusPlaceHolder("user_name")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.user_name}
                    className="font-medium"
                  />
                </Form.Item>
              )}

              <Form.Item name="fullname" rules={rules.fullname}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("fullname")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.fullname}
                  className="font-medium"
                />
              </Form.Item>
              <Form.Item name="phone_number" rules={rules.phone_number}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("phone_number")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.phone_number}
                  className="font-medium"
                />
              </Form.Item>
              <Form.Item>
                <h3 className="text-xl font-semibold mb-3">Giới tính</h3>
                <Radio.Group defaultValue={"Nam"} onChange={handleChangeGender}>
                  <Radio value={"Nam"}>Nam</Radio>
                  <Radio value={"Nữ"}>Nữ</Radio>
                  <Radio value={"Khác"}>Khác</Radio>
                </Radio.Group>
              </Form.Item>

              <AddressForm
                values={newValues}
                handleValues={setNewValues}
                error={error}
                clearError={clearError}
                status={status}
              />

              <h3 className="text-lg font-bold mb-2">Cấp quyền admin</h3>

              {adminTypes.map((item) => (
                <Form.Item>
                  <div key={item.type_user_id} className="ml-5 mt-5">
                    <h4 className="text-red-700 font-semibold">
                      {item.type_user_name}
                    </h4>
                    <GreenSwitch
                      label="Admin"
                      onChange={() => handlePermission(item.type_user_id)}
                      checked={checked?.[item.type_user_id]}
                    />
                  </div>
                </Form.Item>
              ))}

              <h3 className="text-lg font-bold mb-2">Bảo mật tài khoản</h3>
              {error && error.email ? (
                <Form.Item
                  validateStatus={"error"}
                  name="email"
                  help={error.email}
                  rules={rules.email}
                >
                  <Input
                    onChange={handleUserNameChange}
                    onFocus={() => handleFocusPlaceHolder("email")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.email}
                    className="font-medium"
                  />
                </Form.Item>
              ) : (
                <Form.Item name="email" rules={rules.email}>
                  <Input
                    onChange={handleUserNameChange}
                    onFocus={() => handleFocusPlaceHolder("email")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.email}
                    className="font-medium"
                  />
                </Form.Item>
              )}

              <Form.Item name="password" rules={rules.password}>
                <Input.Password
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
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
                >
                  Thêm tài khoản
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </>
  );
}
