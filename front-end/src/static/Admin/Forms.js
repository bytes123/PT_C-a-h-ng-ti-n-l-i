import React from "react";

const userForm = [
  {
    label: "Ảnh đại diện",
    type: "file",
    name: "user_image",
  },
  {
    label: "Tên tài khoản",
    type: "text",
    name: "user_name",
  },
  {
    label: "Mật khẩu",
    type: "password",
    name: "user_password",
  },
  {
    label: "Họ tên",
    type: "text",
    name: "user_fullname",
  },
  {
    label: "Địa chỉ",
    type: "text",
    name: "user_address",
  },
];

const catalogForm = [
  {
    label: "Tên danh mục",
    type: "text",
    name: "catalog_name",
  },
];

const detailProductForm = [
  {
    label: "Hình loại sản phẩm",
    type: "file",
    name: "detail_product_image",
  },
  {
    label: "Tên sản phẩm",
    type: "list",
    value_name: "product_id",
    label_name: "product_name",
    list: [
      {
        value: 1,
        label: "Cà chua",
      },
      {
        value: 2,
        label: "Dưa leo",
      },
    ],
  },
  {
    label: "Trọng lượng",
    type: "text",
    name: "detail_product_size",
  },
  {
    label: "Số lượng",
    type: "text",
    name: "detail_product_storage",
  },
];

const productForm = [
  {
    label: "Tên sản phẩm",
    type: "text",
    name: "product_name",
  },
  {
    label: "Danh mục",
    type: "list",
    value_name: "catalog_id",
    label_name: "catalog_name",
    list: [
      {
        value: 1,
        label: "Thực phẩm",
      },
      {
        value: 2,
        label: "Bánh",
      },
    ],
  },
];

const brandForm = [
  {
    label: "Tên hãng",
    type: "text",
    name: "brand_name",
  },
  {
    label: "Số điện thoại hãng",
    type: "text",
    name: "brand_phone_number",
  },
  {
    label: "Email hãng",
    type: "email",
    name: "brand_email",
  },
  {
    label: "Địa chỉ hãng",
    type: "text",
    name: "brand_address",
  },
];

export { userForm, catalogForm, productForm, detailProductForm, brandForm };
