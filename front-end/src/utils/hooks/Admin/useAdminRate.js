import React, { useState, useEffect } from "react";
import {
  fetchRates,
  getFetchStatus,
  getRates,
  getSearchStatus,
  getSearchRates,
  resetSearchStatus,
  searchRate,
  getUpdateStatus,
  updateStatement,
} from "../../../features/rate/rateSlice";

import { useDispatch, useSelector } from "react-redux";
export default function useRate() {
  const [errors, setErrors] = useState({});
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const fetch_status = useSelector(getFetchStatus);
  const fetch_rates = useSelector(getRates);
  const search_rates = useSelector(getSearchRates);
  const search_status = useSelector(getSearchStatus);
  const [rates, setRates] = useState([]);
  const [currentSearch, setCurrentSearch] = useState();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoadingAllRates, setIsLoadingAllRates] = useState(false);
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const update_status = useSelector(getUpdateStatus);

  useEffect(() => {
    dispatch(fetchRates());
  }, []);

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setRates(search_rates);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    } else if (search_status == "failed") {
      setIsLoadingSearch(false);
    }
  }, [search_status]);

  useEffect(() => {
    if (fetch_status == "succeeded") {
      setRates(fetch_rates);
    }
  }, [fetch_status]);

  const onSearch = async (value, callback) => {
    if (!value) {
      setIsToast({
        style: "failed",
        value: true,
        body: "Vui lòng nhập mã sản phẩm hoặc tên sản phẩm  để tìm kiếm",
      });
      setReset(!reset);
    } else {
      await dispatch(searchRate(value));
    }
  };

  useEffect(() => {
    return () =>
      setIsToast({
        style: "",
        value: false,
        body: "",
      });
  }, [reset]);

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllRates(true);
    setTimeout(async () => {
      await dispatch(fetchRates()).unwrap();
      setIsLoadingAllRates(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    if (update_status == "loading") {
      setIsLoading(true);
    } else if (update_status == "succeeded") {
      setTimeout(() => {
        setCurrentSearch();
        setIsLoadingAllRates(false);
        setIsSearch(false);
        setIsLoading(false);
        dispatch(fetchRates()).unwrap();
      }, 2000);
    } else if (update_status == "failed") {
      setIsLoading(false);
    }
  }, [update_status]);

  const handleUpdate = async (data) => {
    console.log(data);
    await dispatch(updateStatement(data)).unwrap();
  };

  return {
    rates,
    isToast,
    isLoadingAllRates,
    isSearch,
    isLoadingSearch,
    onSearch,
    handleOutSearch,
    handleUpdate,
    isLoading,
  };
}
