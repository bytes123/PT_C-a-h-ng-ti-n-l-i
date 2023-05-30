import React, { useState } from "react";

import Size from "../components/Product/Size";
import StarpointSection from "../components/Utils/StarpointSection";

import useInputNumber from "../utils/hooks/useInputNumber";
import usePickSection from "../utils/hooks/usePickSection";
import { AiOutlineHeart } from "react-icons/ai";
import DescriptionSection from "../components/Product/DescriptionSection";
import ReviewSection from "../components/Product/ReviewSection";
import ItemList from "../components/Product/ItemList";
import { nanoid } from "nanoid";

import ClassifyItemSection from "../components/Product/ClassifyItemSection";
import Quantity from "../utils/components/Quantity";
import useProducts from "../utils/hooks/useProducts";
import MainLoading from "../utils/components/MainLoading";
import useCart from "../utils/hooks/useCart";
import Toast from "../utils/components/Toast";

export default function ProductPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    inputNumberValue,
    handleUpInputNumber,
    handleDownInputNumber,
    handleChangeInputNumber,
  } = useInputNumber();

  const { activeIndexSection, handleActiveIndexSection } = usePickSection();

  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const [relatedItems, setRelatedItems] = useState([
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
    {
      key: nanoid(),
      catalog_name: "Bánh",
      product_name: "Bánh mì sữa bò tươi ngon",
      product_starpoint: 3,
      product_price: "5900000",
      product_discount: "200000",
    },
  ]);

  const [rateList, setRateList] = useState([
    {
      id: 1,
      avatar: "",
      fullname: "Minh Tân",
      starpoint: 5,
      body: "Hay",
    },
    {
      id: 1,
      avatar: "",
      fullname: "Minh Tân",
      starpoint: 5,
      body: "Hay",
    },
    {
      id: 1,
      avatar: "",
      fullname: "Minh Tân",
      starpoint: 5,
      body: "Hay",
    },
  ]);

  const { products, isLoading, product, detailProduct, rates } = useProducts();

  const { handleAddCart, isToast, setError } = useCart();

  return (
    <>
      <MainLoading isLoading={isLoading} />
      <Toast
        position={isToast?.position}
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <div className="lg:px-20 px-40  mx-auto py-20">
        <div className="wrapper ">
          <div className="product-wrapper mt-[2rem] lg:grid lg:grid-cols-8 ">
            <div className="product_image lg:col-span-3 flex justify-center ">
              <img
                className="product_img-single object-contain lg:max-h-[500px]  rounded-2xl"
                src={
                  product?.image1 !== "default.jpg"
                    ? `http://localhost:8000/resources/product/${product?.id}/${product?.image1}`
                    : `http://localhost:8000/resources/product/${product?.image1}`
                }
                alt=""
              />
            </div>
            <div className="product_detail lg:col-span-3 px-20 mt-10">
              <div className="stock-status out-stock mb-5">Sale Off</div>
              <div className="product_heading mb-7">
                <h2
                  className="font-quicksand text-6xl font-bold"
                  style={{ color: "#253D4E" }}
                >
                  {product?.name}
                </h2>
              </div>
              <div className="product_starpoint mb-7 ">
                <StarpointSection
                  starpoint={detailProduct[activeIndex]?.starpoint}
                  className="inline"
                />
                <span className="opacity-60 font-bold ml-5">
                  ({detailProduct[activeIndex]?.rate_quantity} lượt nhận xét ){" "}
                </span>
              </div>
              <div className="product_price-wrapper flex font-quicksand">
                <span className="current-price text-brand text-6xl">
                  {detailProduct[activeIndex]?.newPrice.toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </span>
                <div className="sale-price-wrapper ml-4 flex flex-col justify-center">
                  <span className="sale-price">
                    {detailProduct[activeIndex]?.discount}%
                  </span>
                  <span className="old-price text-3xl">
                    {detailProduct[activeIndex]?.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
              <div className="product_description-wrapper">
                <p className="text-2xl opacity-70 font-semibold">
                  {product?.introduction}
                </p>
              </div>

              <div className="product_section mt-10 flex">
                <Quantity
                  value={inputNumberValue}
                  handleChangeInputNumber={handleChangeInputNumber}
                  handleUpInputNumber={handleUpInputNumber}
                  handleDownInputNumber={handleDownInputNumber}
                />
                <div className="cart_wrapper-add ml-auto">
                  <button
                    className="text-2xl p-5 h-100 font-bold rounded-md text-white background-active"
                    onClick={(e) => {
                      handleAddCart(
                        e,
                        detailProduct[activeIndex],
                        Number(inputNumberValue)
                      );
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
                <div className="favorite-action updown-action ml-5 rounded-md px-6 cursor-pointer border flex items-center">
                  <AiOutlineHeart className="opacity-60 text-4xl" />
                </div>
                {/* <div className="favorite-action updown-action ml-5 rounded-md px-6 cursor-pointer border flex items-center">
                <AiOutlineHeart className="opacity-60 text-4xl" />
              </div> */}
              </div>
              <div className="product-details-wrapper mt-20 w-[80%]">
                <ul className="grid grid-rows-2 grid-cols-2 opacity-70">
                  <li>
                    Danh mục:{" "}
                    <span className="text-active">
                      {product?.category_name}
                    </span>
                  </li>
                  <li>
                    Hãng:{" "}
                    <span className="text-active"> {product?.brand_name}</span>
                  </li>
                  <li>
                    Mã sản phẩm:{" "}
                    <span className="text-active"> {product?.id}</span>
                  </li>
                  <li>
                    Số lượng:{" "}
                    <span className="text-active">
                      {" "}
                      {detailProduct[activeIndex]?.quantity}{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <ClassifyItemSection className={"lg:col-span-2 lg:block hidden"} />
          </div>
          <div className="product_section p-10 mt-20 w-full rounded-xl border">
            <ul className="product_information-list">
              {["Giới thiệu", "Reviews"].map((item, index) => (
                <li
                  key={index}
                  className={`${activeIndexSection == index ? "active" : ""}`}
                  onClick={() => handleActiveIndexSection(index)}
                >
                  <p>{item}</p>
                </li>
              ))}
            </ul>

            <div className="product_information-main">
              {[
                <DescriptionSection description={product?.description} />,
                <ReviewSection rateList={rates} />,
              ].map((item, index) =>
                activeIndexSection == index
                  ? React.cloneElement(item, {
                      className: "visible-transition",
                    })
                  : React.cloneElement(item, {
                      className: "hidden-transition",
                      markupClassName: "hidden",
                    })
              )}
            </div>
          </div>
          <div className="product_related-section">
            <div className="product_realted-heading border-collapse">
              <h2 className="font-semibold text-4xl pt-20 pb-10 ">
                Sản phẩm liên quan
              </h2>
            </div>
            <ItemList
              className={"py-20"}
              currentItems={products}
              isHiddenBtn={true}
            />
          </div>
          <ClassifyItemSection className={" block lg:hidden"} />
        </div>
      </div>
    </>
  );
}
