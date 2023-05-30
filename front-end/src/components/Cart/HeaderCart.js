import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { loginedUser } from "../../utils/hooks/useAccessUser";

export default function HeaderCart({ cart, onFetchCart, cartPrice }) {
  useEffect(() => {
    if (loginedUser) {
      onFetchCart(loginedUser);
    }
  }, [loginedUser]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="header_cart-list p-5 border-1 rounded-xl bg-white absolute top-[100%] right-0 font-quicksand">
      <ul className="mt-2 pb-5 border-b-2 max-h-[300px] overflow-y-auto">
        {cart?.length
          ? cart.map((item) => (
              <li className="mb-5">
                <div className="flex">
                  <div>
                    <img
                      className="w-[100px] object-contain"
                      src={
                        item.image1 !== "default.jpg"
                          ? `http://localhost:8000/resources/product/${item.product_id}/${item.image1}`
                          : `http://localhost:8000/resources/product/${item.image1}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="mx-10 ">
                    <Link
                      to={`/thuc-don/${item.category_id}/${item.product_id}`}
                      className="text-brand text-3xl mb-5"
                    >
                      {item.name}
                    </Link>

                    <p className="text-2xl mb-5">
                      {item.quantity} x{" "}
                      {item?.newPrice?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              </li>
            ))
          : ""}
      </ul>
      <div>
        <div className="grid grid-cols-2 my-10 font-semibold text-3xl min-w-[330px]">
          <h3>Tổng thanh toán</h3>
          <span className="text-right text-brand">
            {cartPrice.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
      <div>
        <div className="flex justify-between my-2 ">
          <Link to="/gio-hang">
            <button className="background-secondary p-3 rounded-xl font-semibold">
              Xem giỏ hàng{" "}
            </button>
          </Link>

          <Link to="/thanh-toan/check-all">
            <button className="background-active p-3 rounded-xl text-white font-semibold">
              Thanh toán
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
