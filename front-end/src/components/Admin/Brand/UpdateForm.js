import React from "react";
import { Card, Input, Form, Button, Radio } from "antd";
import { rulesBrand as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  updateBrand,
  getErrors,
  resetError,
} from "../../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { brandPlaceHolder } from "../../../static/UserForm";

export default function UpdateForm({ updateValues }) {
  const dispatch = useDispatch();

  const updateSubmit = async (values) => {
    console.log(newValues);
    await dispatch(
      updateBrand({
        brand: newValues,
        branch_id: updateValues.branch_id,
        current_id: updateValues.id,
      })
    ).unwrap();
  };

  const clearErrors = (name) => {
    dispatch(resetError(name));
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
  } = useForm(updateSubmit, getErrors, brandPlaceHolder, true);

  const handleChangeInput = (e) => {
    clearErrors(e.target.name);
    setNewValues({
      ...newValues,
      [e.target.name]: e.target.value,
    });
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
          <h3 className=" font-bold mb-5 text-3xl">Thông tin nhãn hàng</h3>
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={updateValues}
          >
            <h3 className="font-quicksand font-semibold mb-2">Tên nhãn hàng</h3>
            {errors?.name ? (
              <Form.Item
                onChange={handleChangeInput}
                name="name"
                rules={rules.name}
                validateStatus={"error"}
                help={errors.name}
              >
                <Input
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
                  name="name"
                  onChange={handleChangeInput}
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
                  name="phone_number"
                  onChange={handleChangeInput}
                  onFocus={() => handleFocusPlaceHolder("phone_number")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.phone_number}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="phone_number" rules={rules.phone_number}>
                <Input
                  name="phone_number"
                  onChange={handleChangeInput}
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
                  name="email"
                  onChange={handleChangeInput}
                  onFocus={() => handleFocusPlaceHolder("email")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.email}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="email" rules={rules.email}>
                <Input
                  name="email"
                  onChange={handleChangeInput}
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
                type="primary"
                htmlType="submit"
                className={`ml-auto rounded-xl p-10 text-2xl flex items-center justify-center font-bold ${
                  !isChange
                    ? "bg-slate-500 pointer-events-none"
                    : "bg-red-600 hover:bg-red-800"
                }`}
              >
                Cập nhật nhãn hàng
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
