import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDetailProducts,
  getDetailProducts,
  getAddStatus,
  getUpdateStatus,
  resetAddStatus,
  getDeleteStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  getSearchStatus,
  getSearchDetailProducts,
  resetSearchStatus,
  getFetchSearchStatus,
  fetchSearchDetailProduct,
  resetSearchDetailProduct,
} from "../../../features/detail_product/detailProductSlice";
import {
  fetchProducts,
  getProducts,
} from "../../../features/product/productSlice";
import { useLocation } from "react-router-dom";
export default function useAdminDetailProduct(
  handleCloseDelete,
  handleCloseEdit,
  handleCloseAdd
) {
  const dispatch = useDispatch();
  const fetch_detail_products = useSelector(getDetailProducts);
  const fetch_products = useSelector(getProducts);
  const [detailProducts, setDetailProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const add_status = useSelector(getAddStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const [currentSearch, setCurrentSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const search_detail_product = useSelector(getSearchDetailProducts);
  const search_status = useSelector(getSearchStatus);
  const fetch_search_status = useSelector(getFetchSearchStatus);
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
    setIsToast({
      style: "success",
      value: true,
      body: "Thêm chi tiết sản phẩm thành công",
    });
    setIsLoading(false);
    handleCloseAdd();
  };

  const updateSuccess = () => {
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật chi tiết sản phẩm thành công",
    });
    setIsLoading(false);
    handleCloseEdit();
  };

  const deleteSuccess = () => {
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa sản phẩm thành công",
    });
    setIsLoading(false);
    handleCloseDelete();
  };

  useEffect(() => {
    if (fetch_products.length) {
      setProducts(fetch_products);
    }
  }, [fetch_products]);

  useEffect(() => {
    setDetailProducts(fetch_detail_products);
  }, [fetch_detail_products]);

  useEffect(() => {
    if (fetch_search_status == "succeeded") {
      setDetailProducts(search_detail_product);
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
    setIsLoadingAll(true);
    setTimeout(async () => {
      await dispatch(fetchDetailProducts()).unwrap();
      setIsLoadingAll(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAll(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setDetailProducts(search_detail_product);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    } else {
      setIsLoadingSearch(false);
      dispatch(resetSearchStatus());
    }
  }, [search_status]);

  useEffect(() => {
    dispatch(fetchDetailProducts()).unwrap();
    dispatch(fetchProducts()).unwrap();
  }, []);

  useEffect(() => {
    if (add_status == "loading") {
      setIsLoading(true);
    } else if (add_status == "succeeded") {
      const reset = async () => {
        await dispatch(fetchDetailProducts()).unwrap();
        setTimeout(() => {
          addSuccess();
        }, 2000);
      };

      reset();
    } else if (add_status == "failed") {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      const reset = async () => {
        setIsLoading(true);
        await dispatch(fetchDetailProducts()).unwrap();
        setTimeout(() => {
          updateSuccess();
        }, 2000);
      };
      reset();
    } else if (currentSearch && update_status == "succeeded") {
      const reset = async () => {
        setIsLoading(true);
        await dispatch(fetchSearchDetailProduct(currentSearch)).unwrap();
        setTimeout(() => {
          updateSuccess();
        }, 2000);
      };
      reset();
    } else if (update_status == "failed") {
      setTimeout(() => {
        setIsLoading(false);
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
        await dispatch(fetchDetailProducts()).unwrap();
        deleteSuccess();
      }, 2000);
    } else if (currentSearch && delete_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchSearchDetailProduct(currentSearch)).unwrap();
        deleteSuccess();
      }, 2000);
    } else if (delete_status == "failed") {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      dispatch(resetDeleteStatus());
      resetToast();
    };
  }, [delete_status]);

  return {
    detailProducts,
    products,
    isLoading,
    handleSearch,
    isLoadingSearch,
    isSearch,
    handleOutSearch,
    isLoadingAll,
    isToast,
    setIsToast,
  };
}
