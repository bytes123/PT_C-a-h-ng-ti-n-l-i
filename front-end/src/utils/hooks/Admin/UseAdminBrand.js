import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrands,
  getBrands,
  getAddStatus,
  getUpdateStatus,
  getDeleteStatus,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  getSearchStatus,
  getSearchBrand,
  resetSearchStatus,
  getFetchSearchStatus,
  fetchSearchBrand,
  searchBrand,
  deleteBrand,
} from "../../../features/brand/brandSlice";
import { useLocation } from "react-router-dom";
export default function useAdminBrand(
  handleCloseAdd,
  handleCloseEdit,
  handleCloseDelete
) {
  const dispatch = useDispatch();
  const fetch_brands = useSelector(getBrands);
  const add_status = useSelector(getAddStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const [brands, setBrands] = useState([]);
  const [currentSearch, setCurrentSearch] = useState();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoadingAllBrand, setIsLoadingAllBrand] = useState(false);
  const location = useLocation();
  const search_brand = useSelector(getSearchBrand);
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
    handleCloseAdd();
    setIsLoading(false);
    setIsToast({
      style: "success",
      value: true,
      body: "Thêm danh mục thành công",
    });
  };

  const updateSuccess = () => {
    handleCloseEdit();
    setIsLoading(false);
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật danh mục thành công",
    });
  };

  const deleteSuccess = () => {
    setIsLoading(false);
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa danh mục thành công",
    });
  };

  useEffect(() => {
    setBrands(search_brand);
  }, [fetch_search_status]);

  const onSearch = async (value, callback) => {
    if (!value) {
      setIsToast({
        style: "failed",
        value: true,
        body: "Vui lòng nhập tên nhãn hàng để tìm kiếm",
      });
    } else {
      await dispatch(searchBrand(value));
    }
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllBrand(true);
    setTimeout(async () => {
      await dispatch(fetchBrands()).unwrap();
      setIsLoadingAllBrand(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllBrand(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setBrands(search_brand);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    console.log(1);
    dispatch(fetchBrands()).unwrap();
  }, []);

  useEffect(() => {
    if (add_status == "loading") {
      setIsLoading(true);
    } else if (add_status == "succeeded") {
      const reset = async () => {
        setTimeout(async () => {
          await dispatch(fetchBrands()).unwrap();
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
    } else if (!currentSearch && update_status == "succeeded") {
      const reset = async () => {
        setTimeout(async () => {
          await dispatch(fetchBrands()).unwrap();
          updateSuccess();
        }, 2000);
      };

      reset();
    } else if (currentSearch && update_status == "succeeded") {
      const reset = async () => {
        setTimeout(async () => {
          await dispatch(fetchSearchBrand(currentSearch)).unwrap();
          updateSuccess();
        }, 2000);
      };
      reset();
    } else if (update_status == "failed") {
      setIsLoading(false);
    }

    return () => {
      dispatch(resetUpdateStatus());
      resetToast();
    };
  }, [update_status]);

  useEffect(() => {
    if (delete_status == "loading") {
      setIsLoading(true);
    } else if (!currentSearch && delete_status == "succeeded") {
      const reset = async () => {
        setTimeout(async () => {
          await dispatch(fetchBrands()).unwrap();
          deleteSuccess();
        }, 2000);
      };
      reset();
    } else if (currentSearch && delete_status == "succeeded") {
      const reset = async () => {
        setTimeout(async () => {
          await dispatch(fetchSearchBrand(currentSearch)).unwrap();
          deleteSuccess();
        }, 2000);
      };
      reset();
    } else if (delete_status == "failed") {
      setIsLoading(false);
    }

    return () => {
      dispatch(resetDeleteStatus());
      resetToast();
    };
  }, [delete_status]);

  useEffect(() => {
    console.log(fetch_brands);
    if (fetch_brands?.length) {
      setBrands(fetch_brands);
    }
  }, [fetch_brands]);

  const handleConfirmDelete = async (id) => {
    setIsLoading(true);
    handleCloseDelete();
    await dispatch(deleteBrand({ id: id })).unwrap();
  };

  return {
    brands,
    onSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllBrand,
    handleOutSearch,
    isToast,
    handleConfirmDelete,
    isLoading,
  };
}
