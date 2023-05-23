import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
import { rulesDetailProduct as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import Cookies from "js-cookie";
import {
  getErrors,
  addDetailProduct,
} from "../../../features/detail_product/detailProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { detailProductPlaceHolder } from "../../../static/UserForm";
import Spinner from "../../../utils/components/Spinner";

export default function AddForm({ products }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const clearErrors = (name) => {};

  const signUpSubmit = async (values) => {
    values.discount = values.discount ?? "0";

    dispatch(addDetailProduct(values)).unwrap();
  };

  const { Option } = Select;

  const {
    form,
    newValues,
    handleChangeValue,
    placeHolder,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
  } = useForm(signUpSubmit, getErrors, detailProductPlaceHolder);

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
          <h3 className=" font-bold mb-10 text-3xl">Thông tin loại sản phẩm</h3>

          <Form form={form} onFinish={handleSubmit}>
            <Form.Item>
              <h3 className="font-quicksand font-semibold mb-2">Sản phẩm</h3>
              <Form.Item name="product_id" rules={rules.product_id}>
                <Select placeholder="Tìm kiếm sản phẩm" showSearch allowClear>
                  {products.length &&
                    products.map((item) => (
                      <Option value={item.id}>{item.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <h3 className="font-quicksand font-semibold mb-2">Kích thước</h3>
              <Form.Item name="size" rules={rules.size}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("size")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.size}
                  className="font-medium"
                />
              </Form.Item>

              <h3 className="font-quicksand font-semibold mb-2">
                Hàng tồn kho
              </h3>
              <Form.Item name="quantity" rules={rules.quantity}>
                <Input
                  defaultValue={0}
                  onFocus={() => handleFocusPlaceHolder("quantity")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.quantity}
                  className="font-medium"
                />
              </Form.Item>

              <h3 className="font-quicksand font-semibold mb-2">Giá gốc</h3>
              <Form.Item name="price" rules={rules.price}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("price")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.price}
                  className="font-medium"
                />
              </Form.Item>

              <h3 className="font-quicksand font-semibold mb-2">Giảm giá(%)</h3>
              <Form.Item name="discount" rules={rules.discount}>
                <Input
                  defaultValue={0}
                  value={0}
                  onFocus={() => handleFocusPlaceHolder("discount")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.discount}
                  className="font-medium"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
              >
                Thêm chi tiết sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
