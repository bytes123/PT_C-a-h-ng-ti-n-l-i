import React, { useState, useEffect } from "react";
import {
  fetchTopProducts,
  getTopProducts,
  fetchProductById,
  getFetchProductStatus,
  getProduct,
  getDetailProduct,
  getRates,
} from "../../features/product/productSlice";

import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
export default function useProducts() {
  const { menuid, productid } = useParams();

  const [products, setProducts] = useState([]);
  const top_products = useSelector(getTopProducts);
  const fetch_product_status = useSelector(getFetchProductStatus);
  const fetch_product = useSelector(getProduct);
  const fetch_detail_products = useSelector(getDetailProduct);
  const fetch_rates = useSelector(getRates);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [detailProduct, setDetailProduct] = useState([]);
  const [rates, setRates] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchTopProducts({
        type: "newest",
        quantity: 20,
      })
    ).unwrap();
  }, []);
  useEffect(() => {
    dispatch(
      fetchProductById({
        product_id: productid,
      })
    ).unwrap();
  }, [productid]);

  useEffect(() => {
    if (fetch_product_status == "loading") {
      setIsLoading(true);
      console.log(1);
    } else if (fetch_product_status == "succeeded") {
      if (fetch_product && fetch_detail_products && fetch_rates) {
        setProduct(fetch_product);
        setDetailProduct(fetch_detail_products);
        setRates(fetch_rates);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else if (fetch_product_status == "failed") {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [fetch_product_status]);

  useEffect(() => {
    if (top_products.length) {
      setProducts(top_products);
    }
  }, [top_products]);

  return {
    products,
    isLoading,
    product,
    detailProduct,
    rates,
  };
}
