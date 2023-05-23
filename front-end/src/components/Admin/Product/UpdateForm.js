import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Select } from "antd";
import { rulesCategory as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import Cookies from "js-cookie";
import {
  getErrors,
  addProduct,
  updateProduct,
} from "../../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { productPlaceHolder } from "../../../static/UserForm";
import ImageUploading from "react-images-uploading";
import { UploadOutlined } from "@ant-design/icons";
import useProductImage from "../../../utils/hooks/Admin/useProductImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddForm({ categories, brands, updateValues }) {
  //   let newrules = useSelector(getErrors);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [newImageList, setNewImageList] = useState([]);

  const signUpSubmit = async (values) => {
    values.id = updateValues.id;
    await dispatch(updateProduct(values)).unwrap();
  };

  const {
    form,
    newValues,
    placeHolder,
    isChange,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    setNewValues,
  } = useForm(signUpSubmit, getErrors, productPlaceHolder, true);

  const { images, setImages, onChange } = useProductImage(
    newImageList,
    setNewImageList,
    newValues,
    setNewValues,
    true
  );

  useEffect(() => {
    const newList = [
      {
        file_name: updateValues.image1,
        data_url:
          updateValues.image1 !== "default.jpg"
            ? `http://localhost:8000/resources/product/${updateValues.id}/${updateValues.image1}`
            : `http://localhost:8000/resources/product/${updateValues.image1}`,
      },
      {
        file_name: updateValues.image2,
        data_url:
          updateValues.image2 !== "default.jpg"
            ? `http://localhost:8000/resources/product/${updateValues.id}/${updateValues.image2}`
            : `http://localhost:8000/resources/product/${updateValues.image2}`,
      },
      {
        file_name: updateValues.image3,
        data_url:
          updateValues.image3 !== "default.jpg"
            ? `http://localhost:8000/resources/product/${updateValues.id}/${updateValues.image3}`
            : `http://localhost:8000/resources/product/${updateValues.image3}`,
      },
    ];
    setNewImageList(newList);
  }, [updateValues]);

  useEffect(() => {}, [newImageList]);

  //   useEffect(() => {
  //     setErrors(newrules);
  //   }, [newrules]);

  const clearErrors = (name) => {
    setErrors({});
    // dispatch(resetError(name));
  };

  const { Option } = Select;

  const handleChangeInput = (e) => {
    if (e.target.value == updateValues.name) {
      setErrors({
        name: "Vui lòng nhập tên sản phẩm khác sản phẩm hiện tại",
      });
    } else {
      setNewValues({
        ...newValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeDescription = (value) => {
    setNewValues({
      ...newValues,
      description: value,
    });
  };

  const handleChangeCategory = (value) => {
    setNewValues({
      ...newValues,
      category_id: value,
    });
  };

  const handleChangeBrand = (value) => {
    setNewValues({
      ...newValues,
      brand_id: value,
    });
  };

  const onRemoveNewImage = (index) => {
    const newList = newImageList.map((item, i) =>
      i == index
        ? {
            data_url: `http://localhost:8000/resources/product/default.jpg`,
            file_name: item?.file_name,
            isDelete: true,
          }
        : item
    );
    const newArray = [...images];
    newArray[index] = { default: "default.jpg" };
    setImages(newArray);

    setNewValues({
      ...newValues,
      images: newArray,
      old_images: newList,
    });
    setNewImageList(newList);
  };

  useEffect(() => {
    console.log(newValues);
  }, [newValues]);

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
          <h3 className=" font-bold mb-10 text-3xl">Thông tin sản phẩm</h3>

          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={updateValues}
          >
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
                    name="name"
                    onChange={handleChangeInput}
                    onFocus={() => handleFocusPlaceHolder("name")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.name}
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
                    name="name"
                    onChange={handleChangeInput}
                    onFocus={() => handleFocusPlaceHolder("name")}
                    onBlur={handleBlurPlaceHolder}
                    placeholder={placeHolder.name}
                  />
                </Form.Item>
              </>
            )}

            <h3 className="font-quicksand font-semibold mb-2">Danh mục</h3>
            <Form.Item name="category_id" rules={rules.category_id}>
              <Select
                showSearch
                onChange={(value) => handleChangeCategory(value)}
                placeholder="Chọn danh mục"
                allowClear
              >
                {categories.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <h3 className="font-quicksand font-semibold mb-2">Nhà sản xuất</h3>
            <Form.Item name="brand_id" rules={rules.brand_id}>
              <Select
                showSearch
                placeholder="Chọn nhà sản xuất"
                allowClear
                onChange={(value) => handleChangeBrand(value)}
              >
                {brands.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <h3 className="font-quicksand font-semibold mb-2">
              Giới thiệu sản phẩm
            </h3>
            <Form.Item name="introduction">
              <Input
                name="introduction"
                onChange={handleChangeInput}
                onFocus={() => handleFocusPlaceHolder("introduction")}
                onBlur={handleBlurPlaceHolder}
                placeholder={placeHolder.introduction}
              />
            </Form.Item>

            <Form.Item>
              <h3 className="font-quicksand font-semibold mb-2">
                Mô tả sản phẩm
              </h3>
              <ReactQuill
                theme="snow"
                onChange={handleChangeDescription}
                defaultValue={updateValues?.description}
              />
            </Form.Item>

            <Form.Item>
              <h3 className="font-quicksand font-semibold mb-2">
                Hình sản phẩm
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
                    {/* <button
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
                    &nbsp; */}

                    <div className="flex mt-10  ">
                      {newImageList.length &&
                        newImageList.map((image, index) => (
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  onRemoveNewImage(index);
                                }}
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
                type="primary"
                htmlType="submit"
                className={`ml-auto rounded-xl p-10 text-2xl flex items-center justify-center font-bold ${
                  !isChange
                    ? "bg-slate-500 pointer-events-none"
                    : "bg-red-600 hover:bg-red-800"
                }`}
              >
                Cập nhật sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
