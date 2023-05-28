import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
import { rulesProduct as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import Cookies from "js-cookie";
import {
  getErrors,
  resetError,
  addProduct,
} from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { productPlaceHolder } from "../../../static/UserForm";
import ImageUploading from "react-images-uploading";
import { UploadOutlined } from "@ant-design/icons";
import useProductImage from "../../../utils/hooks/Admin/useProductImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddForm({ categories, brands, branches }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { images, onChange } = useProductImage();
  const [description, setDescription] = useState("");
  const [isSelectedBranch, setIsSelectecBranch] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const signUpSubmit = async (values) => {
    const fileList = images.length && images.map((item) => item.file);
    values.images = fileList;
    values.description = description;

    await dispatch(addProduct(values)).unwrap();
  };

  const handleSubmitBranch = (data) => {
    setSelectedBranch(data.branch_id);
    setIsSelectecBranch(true);
  };

  const clearErrors = (name) => {
    dispatch(resetError(name));
  };

  const { Option } = Select;

  const {
    form,
    newValues,
    placeHolder,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    setNewValues,
  } = useForm(signUpSubmit, getErrors, productPlaceHolder);

  useEffect(() => {
    console.log(description);
  }, [description]);

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
              <h3 className=" font-bold mb-10 text-3xl">Thông tin sản phẩm</h3>

              <Form form={form} onFinish={handleSubmit}>
                {errors?.name ? (
                  <>
                    <h3 className="font-quicksand font-semibold mb-2">
                      Tên sản phẩm
                    </h3>
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
                  </>
                ) : (
                  <>
                    <h3 className="font-quicksand font-semibold mb-2">
                      Tên sản phẩm
                    </h3>
                    <Form.Item name="name" rules={rules.name}>
                      <Input
                        onFocus={() => handleFocusPlaceHolder("name")}
                        onBlur={handleBlurPlaceHolder}
                        placeholder={placeHolder.name}
                        className="font-medium"
                      />
                    </Form.Item>
                  </>
                )}

                <h3 className="font-quicksand font-semibold mb-2">Danh mục</h3>
                <Form.Item name="category_id" rules={rules.category_id}>
                  <Select placeholder="Chọn danh mục" showSearch allowClear>
                    {categories
                      ?.filter((item) => item.branch_id == selectedBranch)
                      .map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <h3 className="font-quicksand font-semibold mb-2">
                  Nhà sản xuất
                </h3>
                <Form.Item name="brand_id" rules={rules.brand_id}>
                  <Select placeholder="Chọn nhà sản xuất" showSearch allowClear>
                    {brands
                      ?.filter((item) => item.branch_id == selectedBranch)
                      .map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <h3 className="font-quicksand font-semibold mb-2">
                  Giới thiệu sản phẩm
                </h3>
                <Form.Item name="introduction">
                  <Input
                    onFocus={() => handleFocusPlaceHolder("introduction")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.introduction}
                    className="font-medium"
                  />
                </Form.Item>

                <Form.Item>
                  <h3 className="font-quicksand font-semibold mb-2">
                    Mô tả sản phẩm
                  </h3>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </Form.Item>

                <Form.Item>
                  <h3 className="font-quicksand font-semibold mb-2">
                    Hình sản phẩm (Chọn tối đa 3 hình)
                  </h3>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={3}
                    dataURLKey="data_url"
                    acceptType={["jpg", "png"]}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <button
                          className="border-4 border-dashed p-6 rounded-xl"
                          style={isDragging ? { color: "red" } : null}
                          onClick={(e) => {
                            e.preventDefault();
                            onImageUpload();
                          }}
                          {...dragProps}
                        >
                          <UploadOutlined className="text-4xl mr-4 opacity-80" />
                          <span className="text-2xl font-quicksand opacity-90">
                            {" "}
                            Nhấn hoặc kéo để chọn hình sản phẩm
                          </span>
                        </button>
                        &nbsp;
                        {imageList.length ? (
                          <button
                            onClick={onImageRemoveAll}
                            className="delete-btn "
                          >
                            Xóa tất cả hình ảnh
                          </button>
                        ) : (
                          ""
                        )}
                        <div className="flex mt-10  ">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item ml-10 ">
                              <p>Hình {index + 1}</p>
                              <img
                                src={image.data_url}
                                className="object-fit h-[200px] w-[200px]"
                              />
                              <div className="flex justify-between mt-10">
                                <button
                                  className="edit-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onImageUpdate(index);
                                  }}
                                >
                                  Cập nhật
                                </button>
                                <button
                                  className="delete-btn "
                                  onClick={() => onImageRemove(index)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="btn-primary border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
                  >
                    Thêm sản phẩm
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
