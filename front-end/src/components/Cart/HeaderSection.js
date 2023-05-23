import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../../utils/hooks/useCart";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import HeaderCart from "./HeaderCart";
export default function HeaderSection() {
  const { cart, onFetchCart, cartSubPrice } = useCart();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="header_section flex mr-5  block ">
      <div className="header_wishlist mr-3">
        <Link to="/yeu-thich" className="relative">
          <AiOutlineHeart className="text-5xl mx-2 opacity-70" />
          <span className="quanity-wishlist-card">0</span>
        </Link>
      </div>
      <div className="header_cart relative">
        <Link to="/gio-hang" className="relative">
          <AiOutlineShoppingCart className="text-5xl mx-2 opacity-70" />
          <span className="quanity-wishlist-card">{cart.length}</span>
        </Link>

        <HeaderCart
          cart={cart}
          onFetchCart={onFetchCart}
          cartPrice={cartSubPrice}
        />
      </div>
    </div>
  );
}
