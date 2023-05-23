import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Upload } from "antd";
import { rulesBrand as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  addBrand,
  getErrors,
  resetError,
  resetAllErrors,
} from "../../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { brandPlaceHolder } from "../../../static/UserForm";

export default function AddForm() {
  const dispatch = useDispatch();
  const signUpSubmit = async (values) => {
    dispatch(addBrand(values)).unwrap();
  };
  const clearErrors = (name) => {
    dispatch(resetError(name));
  };
  const {
    form,
    newValues,
    placeHolder,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    errors,
  } = useForm(signUpSubmit, getErrors, brandPlaceHolder);

  return (
    <>
      <div className="user_form mt-5 h-screen">
        <Card
          style={{
            width: "800px",
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <h3 className=" font-bold mb-5 text-3xl">Thông tin nhãn hàng</h3>
          <Form form={form} onFinish={handleSubmit}>
            <h3 className="font-quicksand font-semibold mb-2">Tên nhãn hàng</h3>
            {errors?.name ? (
              <Form.Item
                name="name"
                rules={rules.name}
                validateStatus={"error"}
                help={errors.name}
              >
                <Input
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="name" rules={rules.name}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
            )}

            <h3 className="font-quicksand font-semibold mb-2">Số điện thoại</h3>
            {errors?.phone_number ? (
              <Form.Item
                onChange={() => clearErrors("phone_number")}
                name="phone_number"
                rules={rules.phone_number}
                validateStatus={"error"}
                help={errors.phone_number}
              >
                <Input
                  onFocus={() => handleFocusPlaceHolder("phone_number")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.phone_number}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="phone_number" rules={rules.phone_number}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("phone_number")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.phone_number}
                  className="font-medium"
                />
              </Form.Item>
            )}

            <h3 className="font-quicksand font-semibold mb-2">Email</h3>
            {errors?.email ? (
              <Form.Item
                onChange={() => clearErrors("email")}
                name="email"
                rules={rules.email}
                validateStatus={"error"}
                help={errors.email}
              >
                <Input
                  onFocus={() => handleFocusPlaceHolder("email")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.email}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="email" rules={rules.email}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("email")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.email}
                  className="font-medium"
                />
              </Form.Item>
            )}

            <h3 className="font-quicksand font-semibold mb-2">Địa chỉ</h3>
            <Form.Item name="address" rules={rules.address}>
              <Input
                onFocus={() => handleFocusPlaceHolder("address")}
                onBlur={handleBlurPlaceHolder}
                placeholder={placeHolder.address}
                className="font-medium"
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
              >
                Thêm nhãn hàng
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
