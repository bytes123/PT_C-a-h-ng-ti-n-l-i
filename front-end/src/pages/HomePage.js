import React, { useEffect, useState } from "react";
import BannerSection from "../utils/components/BannerSection";
import ContentSectionFirst from "../components/Home/ContentSectionFirst";
import FeatureSwiper from "../components/Home/FeatureSwiper";
import FeatureProduct from "../components/Home/FeatureProduct";
import useFilterProducts from "../utils/hooks/useFilterProducts";
import Toast from "../utils/components/Toast";
import { useSelector, useDispatch } from "react-redux";

import { nanoid } from "nanoid";
import useCart from "../utils/hooks/useCart";
export default function HomePage() {
  const dispatch = useDispatch();

  const { isToast } = useCart();
  const { topProducts, sellestProducts } = useFilterProducts();
  return (
    <div className="home_page  h-full my-10 caret-transparent">
      <Toast
        position={isToast?.position}
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <FeatureSwiper />
      <FeatureProduct
        type="newest"
        title="Sản phẩm mới nhất"
        gridCol={"5"}
        quantity={10}
        products={topProducts}
      />

      <ContentSectionFirst />
      <FeatureProduct
        type="sellest"
        title="Sản phẩm bán chạy"
        gridCol={"5"}
        quantity={10}
        products={sellestProducts}
      />
    </div>
  );
}
