import React, { useState, useEffect } from "react";
import {
  getCategories,
  fetchCategory,
} from "../../features/category/categorySlice";
import {
  fetchTopProducts,
  getTopProducts,
  getSellestProducts,
} from "../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
export default function useFilterProducts(type, quantity) {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const top_products = useSelector(getTopProducts);
  const sellest_products = useSelector(getSellestProducts);
  const categories = useSelector(getCategories);
  const [categoryList, setCategoryList] = useState([
    {
      id: "all",
      name: "All",
    },
  ]);

  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [sellestProducts, setSellestProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchCategory()).unwrap();
  }, []);

  useEffect(() => {
    if (type && activeCategory) {
      console.log(type);
      dispatch(
        fetchTopProducts({
          category_id: activeCategory,
          type: type,
          quantity: quantity,
        })
      ).unwrap();
    }
  }, [type, activeCategory]);

  useEffect(() => {
    setTopProducts(top_products);
  }, [top_products]);

  useEffect(() => {
    setSellestProducts(sellest_products);
  }, [sellest_products]);

  useEffect(() => {
    setCategoryList([
      {
        id: "all",
        name: "All",
      },
      ...categories,
    ]);
  }, [categories]);

  const handleActiveCategory = (id) => {
    setActiveCategory(id);
  };

  return {
    handleActiveCategory,
    activeCategory,
    products,
    categoryList,
    topProducts,
    sellestProducts,
  };
}
