import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
import { rulesDetailProduct as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  getErrors,
  addDetailProduct,
} from "../../../features/detail_product/detailProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { detailProductPlaceHolder } from "../../../static/UserForm";
import useAdminArea from "../../../utils/hooks/Admin/useAdminArea";

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

  const [isSelectedBranch, setIsSelectecBranch] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleSubmitBranch = (data) => {
    setSelectedBranch(data.branch_id);
    setIsSelectecBranch(true);
  };

  const { branches } = useAdminArea();

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
              <h3 className=" font-bold mb-10 text-3xl">
                Thông tin loại sản phẩm
              </h3>

              <Form form={form} onFinish={handleSubmit}>
                <Form.Item>
                  <h3 className="font-quicksand font-semibold mb-2">
                    Sản phẩm
                  </h3>
                  <Form.Item name="product_id" rules={rules.product_id}>
                    <Select
                      placeholder="Tìm kiếm sản phẩm"
                      showSearch
                      allowClear
                    >
                      {products.length &&
                        products
                          .filter((item) => item.branch_id == selectedBranch)
                          .map((item) => (
                            <Option value={item.id}>{item.name}</Option>
                          ))}
                    </Select>
                  </Form.Item>

                  <h3 className="font-quicksand font-semibold mb-2">
                    Kích thước
                  </h3>
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

                  <h3 className="font-quicksand font-semibold mb-2">
                    Giảm giá(%)
                  </h3>
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
