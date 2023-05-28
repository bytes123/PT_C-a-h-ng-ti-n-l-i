import React, { useEffect, useState, useRef } from "react";
import { Card, Input, Form, Button, Radio } from "antd";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";
import useSignUp from "../../utils/hooks/useSignUp";
import AddressForm from "../../utils/components/AddressForm";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  signUpRequest,
  getErrors,
  getSignUpStatus,
  resetSignUpStatus,
} from "../../features/authen/authenSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Utils/Avatar";
import useUploadImage from "../../utils/hooks/useUploadImage";

export default function SignUpForm() {
  let newrules = useSelector(getErrors);
  let status = useSelector(getSignUpStatus);
  const [error, setError] = useState(newrules);
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookieSet, setCookieSet] = useState(false);
  const { setSelectedFile, imgData } = useUploadImage();

  const handleChangeAvatar = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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
      dispatch(signUpRequest(values)).unwrap();
    }
  };

  useEffect(() => {
    setError(newrules);
  }, [newrules]);

  const clearError = () => {
    setError({});
  };

  const handleUserNameChange = () => {
    if ((error && error.user_name) || (error && error.email)) {
      setError({});
    }
  };

  useEffect(() => {
    if (status == "succeeded") {
      const handleAuthentication = async () => {
        var inThirtySeconds = new Date(new Date().getTime() + 0.5 * 60 * 1000);
        await Cookies.set("isAuthenticating", true, {
          expires: inThirtySeconds,
          path: "/dang-nhap",
        });
      };

      handleAuthentication();
      navigate("/dang-nhap");
    }

    return () => dispatch(resetSignUpStatus());
  }, [status]);

  const {
    form,
    newValues,
    setNewValues,
    placeHolder,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
  } = useSignUp(imgData, signUpSubmit);

  return (
    <div className="user_form my-5">
      {/* <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-4">
        Tạo tài khoản
      </h3> */}
      <Card
        style={{
          width: "500px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <Form.Item className="mt-5">
            <Avatar
              imgData={imgData.imagePreviewUrl}
              handleChangeAvatar={handleChangeAvatar}
            />
          </Form.Item>
          <h3 className="font-quicksand font-semibold mb-2">Tài khoản</h3>
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
          <h3 className="font-quicksand font-semibold mb-2">Họ và tên</h3>
          <Form.Item name="fullname" rules={rules.fullname}>
            <Input
              onFocus={() => handleFocusPlaceHolder("fullname")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.fullname}
              className="font-medium"
            />
          </Form.Item>
          <h3 className="font-quicksand font-semibold mb-2">Số điện thoại</h3>
          <Form.Item name="phone_number" rules={rules.phone_number}>
            <Input
              onFocus={() => handleFocusPlaceHolder("phone_number")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.phone_number}
              className="font-medium"
            />
          </Form.Item>

          <h3 className="text-xl font-semibold mb-3">Giới tính</h3>
          <Form.Item>
            <Radio.Group defaultValue={"Nam"}>
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
          />
          <h3 className="text-xl font-semibold mb-3">Email</h3>
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

          <h3 className="text-xl font-semibold mb-3">Mật khẩu</h3>
          <Form.Item name="password" rules={rules.password}>
            <Input.Password
              onFocus={() => handleFocusPlaceHolder("password")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.password}
              className="font-medium"
            />
          </Form.Item>

          <h3 className="text-xl font-semibold mb-3">Xác nhận mật khẩu</h3>
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
          {/* <Form.Item name="subscribe" valuePropName="checked">
            <Checkbox size="large">Tôi muốn nhận mail từ Tan's Coffe</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="background-active w-full py-6 text-2xl flex items-center justify-center font-quicksand"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
