import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, Checkbox } from "antd";
import {
  userPlaceHolder,
  rulesLogin as rules,
  userLogin as defaultUser,
} from "../../static/UserForm";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  loginRequest,
  getError,
  getLoginStatus,
  resetLoginStatus,
  loginFB,
} from "../../features/user/userSlice";
import { getSignUpStatus } from "../../features/authen/authenSlice";

export default function LoginForm() {
  const [form] = Form.useForm();
  let status = useSelector(getSignUpStatus);
  let error = useSelector(getError);
  const dispatch = useDispatch();
  const [placeHolder, setPlaceHolder] = useState(userPlaceHolder);
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    console.log(status);
    if (status == "succeeded") {
      setIsAuthenticating(true);
    }
  }, [status]);

  const handleSubmit = async (values) => {
    setUser(user);
    await dispatch(loginRequest(values)).unwrap();
  };

  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(userPlaceHolder);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="user_form">
      <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-16">
        Đăng nhập hoặc tạo tài khoản
      </h3>

      <Card
        style={{
          width: "420px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        {isAuthenticating ? (
          <div className="authenticating mb-5 font-bold">
            Vui lòng xác nhận tài khoản đã đăng ký qua mail
          </div>
        ) : (
          ""
        )}
        {/* <div className="login_fb-btn">
          <GoogleLoginButton
            text="Đăng nhập bằng Google"
            className="h-[30px] text-xl my-0 mb-[1.2rem]"
            iconSize="1.6rem"
          />
          <LoginSocialFacebook
            appId="177094665300279"
            onResolve={(res) => dispatch(loginFB(res.data)).unwrap()}
            onReject={(err) => console.log(err)}
          >
            <FacebookLoginButton
              text="Đăng nhập bằng Facebook"
              className="h-[30px] text-xl my-0"
              iconSize="1.6rem"
            />
          </LoginSocialFacebook>
        </div> */}
        {/* <p className="text-center py-4">Hoặc</p> */}
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <Form.Item name="user_name" rules={rules.user_name}>
            <Input
              onFocus={() => handleFocusPlaceHolder("user_name")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.user_name}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="password" rules={rules.password}>
            <Input.Password
              onFocus={() => handleFocusPlaceHolder("password")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.password}
              className="font-medium"
            />
          </Form.Item>
          {error == "USER_NOT_CONFIRMED" ? (
            <p className="error mb-5">
              Vui lòng xác thực tài khoản qua mail đã đăng ký
            </p>
          ) : error == "FAILED_LOGIN" ? (
            <p className="error mb-5">Tài khoản hoặc mật khẩu không hợp lệ !</p>
          ) : (
            ""
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form_btn py-6 text-xl flex items-center justify-center"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
