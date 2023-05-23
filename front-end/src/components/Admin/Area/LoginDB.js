import React from "react";
import { Form, Button, Input } from "antd";

import { loginMysql } from "../../../features/zone/zoneSlice";
import { useDispatch } from "react-redux";
import { rulesArea as rules } from "../../../static/UserForm";
export default function LoginDB({ onLogin }) {
  const dispatch = useDispatch();

  const login = async (data) => {
    await dispatch(loginMysql(data)).unwrap();
    onLogin(data);
  };
  const [form] = Form.useForm();
  return (
    <div>
      {/* <h1 className="text-3xl font-semibold font-quicksand my-10">Đăng nhập</h1> */}
      <Form form={form} onFinish={login} className="w-[500px]">
        <Form.Item name="host" rules={rules.host}>
          <Input placeholder={"Nhập host"} className="font-medium" />
        </Form.Item>

        <Form.Item name="user" rules={rules.user}>
          <Input placeholder="Nhập user" className="font-medium" />
        </Form.Item>

        <Form.Item name="password" rules={rules.password}>
          <Input.Password placeholder="Nhập mật khẩu" className="font-medium" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
