import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
import { rulesCategory as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  addCategory,
  getErrors,
  resetError,
  resetAllErrors,
} from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { categoryPlaceHolder } from "../../../static/UserForm";
import useAdminArea from "../../../utils/hooks/Admin/useAdminArea";
export default function AddForm() {
  const dispatch = useDispatch();
  const signUpSubmit = async (values) => {
    dispatch(addCategory(values)).unwrap();
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
  } = useForm(signUpSubmit, getErrors, categoryPlaceHolder);

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
          <h3 className=" font-bold mb-5 text-3xl">Thông tin danh mục</h3>
          {isSelectedBranch ? (
            <Form form={form} onFinish={handleSubmit}>
              {errors?.name ? (
                <Form.Item
                  onChange={() => clearErrors("name")}
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

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
                >
                  Thêm danh mục
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Form form={form} onFinish={handleSubmitBranch}>
              <h3 className="font-quicksand font-semibold mb-2">
                Chi nhánh phân tán
              </h3>
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
