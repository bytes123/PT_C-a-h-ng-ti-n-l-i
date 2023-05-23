import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import StarpointSection from "../../components/Utils/StarpointSection";
import useCart from "../../utils/hooks/useCart";

export default function ItemList({
  currentItems,
  isHiddenBtn,
  className,
  gridCol = "5",
}) {
  const { handleAddCart } = useCart();
  let col = gridCol;

  return (
    <div className={`item_list-wrapper  ${className}`}>
      <ul className={`item_list grid lg:grid-cols-5 grid-cols-2 gap-10`}>
        {currentItems.map((item) => (
          <li className="item">
            <Link to={`/thuc-don/${item.category_id}/${item.product_id}`}>
              <div className="label pink">
                <p>Hot</p>
              </div>
              <div className="item_img-wrapper ">
                <img
                  className="w-[300px] h-[250px] object-contain"
                  src={
                    item.image1 !== "default.jpg"
                      ? `http://localhost:8000/resources/product/${item.product_id}/${item.image1}`
                      : `http://localhost:8000/resources/product/${item.image1}`
                  }
                  alt=""
                />
              </div>
              <div className="item_information mt-4">
                <p className="item_category-label  my-5  text-2xl">
                  {item.category_name}
                </p>
                <Link
                  className="item_name block my-5 font-quicksand text-4xl min-h-[80px] flex items-center"
                  to={`/thuc-don/${item.category_id}/${item.product_id}`}
                >
                  {item.name}
                </Link>
                <StarpointSection starpoint={item.starpoint} />
                <div className="item_card flex-wrap mt-5 flex items-center">
                  <div className="item_price">
                    {item?.newPrice?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div className="item_price-discount">
                    {item?.price?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  {/* {!isHiddenBtn ? (
                    <div className="btn-wrapper mt-5">
                      <button
                        className="item_btn "
                        onClick={(e) => handleAddCart(e, item)}
                      >
                        <MdOutlineShoppingCart className="text-2xl mr-1" />
                        Thêm
                      </button>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
