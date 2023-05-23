import React, { useEffect, useState } from "react";
import {
  getBills,
  fetchDetailBill,
  fetchBillByUserId,
  getDetailBillStatus,
  getBill,
  getDetailBill,
  resetBillStatus,
  updateStamentBill,
  resetUpdateStatement,
  getUpdateStamentStatus,
  resetDetailBillStatus,
  searchBill,
  getSearchStatus,
  getSearchBills,
  resetSearchStatus,
} from "../../features/bill/billSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginedUser } from "../hooks/useAccessUser";
import { useLocation } from "react-router-dom";
export default function useHistoryBill() {
  const location = useLocation();
  const dispatch = useDispatch();
  const fetch_bills = useSelector(getBills);
  const [bills, setBills] = useState([]);
  const [billId, setBillId] = useState();
  const [bill, setBill] = useState({});
  const [detailBill, setDetailBill] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetch_bill = useSelector(getBill);
  const detail_bill_status = useSelector(getDetailBillStatus);
  const fetch_detail_bill = useSelector(getDetailBill);
  const update_statement_status = useSelector(getUpdateStamentStatus);
  const [currentSearch, setCurrentSearch] = useState();
  const search_status = useSelector(getSearchStatus);
  const search_bills = useSelector(getSearchBills);
  const [isToggle, setIsToggle] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoadingAllBill, setIsLoadingAllBill] = useState(false);
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

  const onSearch = (value) => {
    if (value !== "") {
      setCurrentSearch(value);
      console.log(value);
      dispatch(searchBill(value)).unwrap();
    } else {
      setIsToggle(!isToggle);

      setIsToast({
        style: "failed",
        value: true,
        body: "Vui lòng nhập mã đơn hàng hoặc số điện thoại để tìm kiếm",
      });
    }
  };

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllBill(true);
    setTimeout(async () => {
      if (loginedUser) {
        dispatch(fetchBillByUserId(loginedUser.user_name)).unwrap();
      } else {
        dispatch(fetchBillByUserId("")).unwrap();
      }
      setIsLoadingAllBill(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    if (search_status == "loading") {
      setIsLoadingSearch(true);
    } else if (search_status == "succeeded") {
      setTimeout(() => {
        setBills(search_bills);
        setIsLoadingSearch(false);
        setIsSearch(true);
        dispatch(resetSearchStatus());
      }, 2000);
    } else if (search_status == "failed") {
      setIsLoadingSearch(false);
      dispatch(resetSearchStatus());
    }
  }, [search_status]);

  useEffect(() => {
    setIsSearch(false);
    setCurrentSearch();
    setIsLoadingAllBill(false);
    setIsLoadingSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      resetToast();
    };
  }, [isToggle]);

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  useEffect(() => {
    if (!currentSearch) {
      if (update_statement_status == "success") {
        setTimeout(() => {
          dispatch(fetchDetailBill(billId)).unwrap();
          dispatch(fetchBillByUserId(loginedUser.user_name)).unwrap();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Nhận hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "canceled") {
        setTimeout(() => {
          dispatch(fetchDetailBill(billId)).unwrap();
          dispatch(fetchBillByUserId(loginedUser.user_name)).unwrap();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Hủy đơn thành công",
          });
        }, 2000);
      } else if (update_statement_status == "failed") {
        setIsLoading(false);
        setIsToast({
          style: "error",
          value: true,
          body: "Có lỗi xãy ra",
        });
      }
    } else {
      if (update_statement_status == "success") {
        setTimeout(() => {
          dispatch(fetchDetailBill(billId)).unwrap();
          dispatch(searchBill(currentSearch)).unwrap();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Nhận hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "canceled") {
        setTimeout(() => {
          dispatch(fetchDetailBill(billId)).unwrap();
          dispatch(searchBill(currentSearch)).unwrap();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Hủy đơn thành công",
          });
        }, 2000);
      } else if (update_statement_status == "failed") {
        setIsLoading(false);
        setIsToast({
          style: "error",
          value: true,
          body: "Có lỗi xãy ra",
        });
      }
    }

    return () => {
      dispatch(resetUpdateStatement());
      resetToast();
    };
  }, [update_statement_status]);

  const handleUpdateStatement = async (data) => {
    setIsLoading(true);
    await dispatch(updateStamentBill(data)).unwrap();
  };

  useEffect(() => {
    if (fetch_bill) {
      setBill(fetch_bill);
    }
  }, [fetch_bill]);

  useEffect(() => {
    if (fetch_detail_bill?.length) {
      setDetailBill(fetch_detail_bill);
    }
  }, [fetch_detail_bill]);

  useEffect(() => {
    if (loginedUser) {
      dispatch(fetchBillByUserId(loginedUser.user_name)).unwrap();
    }
  }, []);

  useEffect(() => {
    if (fetch_bills.length) {
      setBills(fetch_bills);
    }
  }, [fetch_bills]);

  const [isDetailBill, setIsDetailBill] = useState(false);

  const handleOpenDetailBill = (bill_id) => {
    setBillId(bill_id);
    setIsLoading(true);
    dispatch(fetchDetailBill(bill_id)).unwrap();
  };

  const handleCloseDetailBill = () => {
    setIsDetailBill(false);
  };

  useEffect(() => {
    if (detail_bill_status == "succeeded") {
      setTimeout(() => {
        setIsDetailBill(true);
        setIsLoading(false);
      }, 2000);
    } else if (detail_bill_status == "failed") {
      setIsLoading(false);
    }

    return () => dispatch(resetDetailBillStatus());
  }, [detail_bill_status]);

  return {
    isDetailBill,
    handleOpenDetailBill,
    handleCloseDetailBill,
    bills,
    billId,
    bill,
    detailBill,
    isLoading,
    handleUpdateStatement,
    isToast,
    onSearch,
    isLoadingSearch,
    handleOutSearch,
    isSearch,
    isLoadingAllBill,
  };
}
