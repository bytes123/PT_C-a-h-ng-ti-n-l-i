import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
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
import useAdminArea from "../../../utils/hooks/Admin/useAdminArea";

export default function AddForm({ handleChangeInput }) {
  const dispatch = useDispatch();
  const signUpSubmit = async (values) => {
    dispatch(addBrand(values)).unwrap();
  };
  const [isSelectedBranch, setIsSelectecBranch] = useState(false);

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
    setNewValues,
  } = useForm(signUpSubmit, getErrors, brandPlaceHolder);

  const handleSubmitBranch = (data) => {
    setNewValues({
      ...newValues,
      branch_id: data.branch_id,
    });

    setIsSelectecBranch(true);
  };

  const { branches } = useAdminArea();
  let { Option } = Select;

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
          {isSelectedBranch ? (
            <div>
              <h3 className=" font-bold mb-5 text-3xl">Thông tin hãng</h3>
              <Form form={form} onFinish={handleSubmit}>
                <h3 className="font-quicksand font-semibold mb-2">Tên hãng</h3>
                {errors?.name ? (
                  <Form.Item
                    name="name"
                    rules={rules.name}
                    validateStatus={"error"}
                    help={errors.name}
                  >
                    <Input
                      handleChangeInput={handleChangeInput}
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

                <h3 className="font-quicksand font-semibold mb-2">
                  Số điện thoại
                </h3>
                {errors?.phone_number ? (
                  <Form.Item
                    onChange={() => clearErrors("phone_number")}
                    name="phone_number"
                    rules={rules.phone_number}
                    validateStatus={"error"}
                    help={errors.phone_number}
                  >
                    <Input
                      handleChangeInput={handleChangeInput}
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
                      handleChangeInput={handleChangeInput}
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
                    Thêm hãng
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <Form form={form} onFinish={handleSubmitBranch}>
              <h3 className="font-quicksand font-semibold mb-2">Chi nhánh</h3>
              <Form.Item name="branch_id" rules={rules.branch_id}>
                <Select placeholder="Chọn chi nhánh" allowClear>
                  {branches.map((item) => (
                    <Option value={item?.id}>{item?.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
                >
                  Chọn
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
}
