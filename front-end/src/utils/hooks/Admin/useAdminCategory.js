import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategory,
  getCategories,
  getAddStatus,
  getUpdateStatus,
  getDeleteStatus,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  getSearchStatus,
  getSearchCategory,
  resetSearchStatus,
  getFetchSearchStatus,
  fetchSearchCategory,
} from "../../../features/category/categorySlice";
import { useLocation } from "react-router-dom";
export default function useAdminCategory(
  handleCloseEdit,
  handleCloseDelete,
  handleCloseAdd
) {
  const dispatch = useDispatch();
  const fetchCategories = useSelector(getCategories);
  const add_status = useSelector(getAddStatus);
  const update_status = useSelector(getUpdateStatus);
  const delete_status = useSelector(getDeleteStatus);
  const [currentSearch, setCurrentSearch] = useState();
  const [categories, setCategories] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const [isLoadingAllCategory, setIsLoadingAllCategory] = useState(false);
  const search_category = useSelector(getSearchCategory);
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
      body: "Thêm danh mục thành công",
    });
    setIsLoading(false);
  };

  const updateSuccess = () => {
    handleCloseEdit();
    setIsToast({
      style: "success",
      value: true,
      body: "Cập nhật danh mục thành công",
    });
    setIsLoading(false);
  };

  const deleteSuccess = () => {
    handleCloseDelete();
    setIsToast({
      style: "success",
      value: true,
      body: "Xóa danh mục thành công",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setCategories(search_category);
  }, [fetch_search_status]);

  const handleSearch = (value, callback) => {
    if (value !== "") {
      setCurrentSearch(value);
    }
    callback();
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllCategory(true);
    setTimeout(async () => {
      await dispatch(fetchCategory()).unwrap();
      setIsLoadingAllCategory(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllCategory(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setCategories(search_category);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    }
  }, [search_status]);

  useEffect(() => {
    console.log(1);
    dispatch(fetchCategory()).unwrap();
  }, []);

  useEffect(() => {
    if (add_status == "loading") {
      setIsLoading(true);
    } else if (add_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchCategory()).unwrap();
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
        await dispatch(fetchCategory()).unwrap();
        updateSuccess();
      }, 2000);
    } else if (currentSearch && update_status == "succeeded") {
      setTimeout(async () => {
        dispatch(fetchSearchCategory(currentSearch)).unwrap();
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
        await dispatch(fetchCategory()).unwrap();
        deleteSuccess();
        setIsLoading(false);
      }, 2000);
    } else if (currentSearch && delete_status == "succeeded") {
      setTimeout(async () => {
        await dispatch(fetchSearchCategory(currentSearch)).unwrap();
        deleteSuccess();
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      dispatch(resetDeleteStatus());
      resetToast();
    };
  }, [delete_status]);

  useEffect(() => {
    setCategories(fetchCategories);
  }, [fetchCategories]);

  return {
    categories,
    handleSearch,
    isLoadingSearch,
    isSearch,
    isLoadingAllCategory,
    handleOutSearch,
    isLoading,
    isToast,
    setIsToast,
  };
}
