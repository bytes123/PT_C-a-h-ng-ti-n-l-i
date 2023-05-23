import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Radio } from "antd";
import { rulesCategory as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  updateCategory,
  getErrors,
} from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { categoryPlaceHolder } from "../../../static/UserForm";

export default function UpdateForm({ updateValues }) {
  const dispatch = useDispatch();

  const updateSubmit = async (values) => {
    newValues.current_id = updateValues.id;
    await dispatch(updateCategory(newValues)).unwrap();
  };

  const {
    form,
    newValues,
    placeHolder,
    handleSubmit,
    setNewValues,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    isChange,
    errors,
    setErrors,
  } = useForm(updateSubmit, getErrors, categoryPlaceHolder);

  const handleChangeInput = (e) => {
    if (errors && errors.name) {
      setErrors({});
    }

    if (e.target.value == updateValues.name) {
      setErrors({
        name: "Vui lòng nhập danh mục khác danh mục hiện tại",
      });
    } else {
      setNewValues({
        ...newValues,
        [e.target.name]: e.target.value,
      });
    }
  };

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
            Thông tin danh mục
          </h3>
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={updateValues}
          >
            {errors && errors.name ? (
              <Form.Item
                name="name"
                rules={rules.name}
                validateStatus={"error"}
                help={errors.name}
              >
                <Input
                  onChange={handleChangeInput}
                  name="name"
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="name" rules={rules.name}>
                <Input
                  onChange={handleChangeInput}
                  name="name"
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
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
                Cập nhật danh mục
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
