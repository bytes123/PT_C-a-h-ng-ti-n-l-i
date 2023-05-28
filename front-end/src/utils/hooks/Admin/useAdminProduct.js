import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getProducts,
  getAddStatus,
  getUpdateStatus,
  getDeleteStatus,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  getSearchStatus,
  getSearchProducts,
  resetSearchStatus,
  getFetchSearchStatus,
  fetchSearchProduct,
} from "../../../features/product/productSlice";
import { useLocation } from "react-router-dom";
import {
  fetchCategory,
  getCategories,
} from "../../../features/category/categorySlice";
import { fetchBranch, getBranch } from "../../../features/branch/branchSlice";
import { fetchBrands, getBrands } from "../../../features/brand/brandSlice";

export default function useAdminProduct(
  handleCloseEdit,
  handleCloseDelete,
  handleCloseAdd
) {
  const dispatch = useDispatch();
  const fetch_products = useSelector(getProducts);
  const fetch_category = useSelector(getCategories);
  const fetch_brands = useSelector(getBrands);
  const fetch_branches = useSelector(getBranch);
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [branches, setBranches] = useState([]);
  const [brands, setBrands] = useState([]);
  const add_status = useSelector(getAddStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const [currentSearch, setCurrentSearch] = useState();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
  const search_products = useSelector(getSearchProducts);
  const search_status = useSelector(getSearchStatus);
  const fetch_search_status = useSelector(getFetchSearchStatus);
  const [isLoading, setIsLoading] = useState(false);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  const addSuccess = () => {
    handleCloseAdd();
    setIsToast({
      style: "success",
      value: true,
      body: "Thêm sản phẩm thành công",
    });
    setIsLoading(false);
  };

  const updateSuccess = () => {
    handleCloseEdit();
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật sản phẩm thành công",
    });
    setIsLoading(false);
  };

  const deleteSuccess = () => {
    handleCloseDelete();
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa sản phẩm thành công",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (fetch_search_status == "succeeded") {
      setProducts(search_products);
    }
  }, [fetch_search_status]);

  const handleSearch = (value, callback) => {
    if (value !== "") {
      setCurrentSearch(value);
    }
    callback();
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllProducts(true);
    setTimeout(async () => {
      await dispatch(fetchProducts()).unwrap();
      setIsLoadingAllProducts(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllProducts(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setProducts(search_products);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    console.log(1);
    dispatch(fetchProducts()).unwrap();
    dispatch(fetchCategory()).unwrap();
    dispatch(fetchBrands()).unwrap();
    dispatch(fetchBranch()).unwrap();
  }, []);

  useEffect(() => {
    setProducts(fetch_products);
  }, [fetch_products]);

  useEffect(() => {
    if (fetch_category?.length) {
      setCategories(fetch_category);
    }
  }, [fetch_category]);

  useEffect(() => {
    if (fetch_brands?.length) {
      setBrands(fetch_brands);
    }
  }, [fetch_brands]);

  useEffect(() => {
    if (fetch_branches?.length) {
      setBranches(fetch_branches);
    }
  }, [fetch_branches]);

  useEffect(() => {
    if (add_status == "loading") {
      setIsLoading(true);
    } else if (add_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchProducts()).unwrap();
        addSuccess();
      }, 2000);
    } else if (add_status == "failed") {
      setIsLoading(false);
    }

    return () => {
      dispatch(resetAddStatus());
      resetToast();
    };
  }, [add_status]);

  useEffect(() => {
    if (update_status == "loading") {
      setIsLoading(true);
    }
    if (!currentSearch && update_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchProducts()).unwrap();
        updateSuccess();
      }, 2000);
    } else if (currentSearch && update_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchSearchProduct(currentSearch)).unwrap();
        updateSuccess();
      }, 2000);
    }

    return () => {
      dispatch(resetUpdateStatus());
      resetToast();
    };
  }, [update_status]);

  useEffect(() => {
    if (delete_status == "loading") {
      setIsLoading(true);
    }
    if (!currentSearch && delete_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchProducts()).unwrap();
        deleteSuccess();
        setIsLoading(false);
      }, 2000);
    } else if (currentSearch && delete_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchSearchProduct(currentSearch)).unwrap();
        deleteSuccess();
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      dispatch(resetDeleteStatus());
      resetToast();
    };
  }, [delete_status]);

  return {
    products,
    categories,
    branches,
    brands,
    handleSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllProducts,
    handleOutSearch,
    isLoading,
    isToast,
    setIsToast,
  };
}
