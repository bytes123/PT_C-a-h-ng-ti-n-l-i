import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBill,
  getBills,
  updateStamentBill,
  resetUpdateStatement,
  getUpdateStamentStatus,
  searchBill,
  getSearchBills,
  getSearchStatus,
  resetSearchStatus,
  updatePayedBill,
  getUpdatePayedStatus,
  resetUpdatePayedStatus,
  fetchDetailBill,
  getDetailBillStatus,
  getDetailBill,
  resetDetailBillStatus,
  getBill,
  sortBill,
  getSortBillStatus,
  getSortBill,
  resetSortBillStatus,
} from "../../../features/bill/billSlice";
import { useLocation } from "react-router-dom";
export default function useAdminBill(activeSortIndex) {
  const location = useLocation();
  const fetch_bills = useSelector(getBills);
  const fetch_bill = useSelector(getBill);
  const detail_bill_status = useSelector(getDetailBillStatus);
  const fetch_detail_bill = useSelector(getDetailBill);
  const sort_bill = useSelector(getSortBill);
  const sort_bill_status = useSelector(getSortBillStatus);
  const update_statement_status = useSelector(getUpdateStamentStatus);
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState([]);
  const [isLoadingAllBill, setIsLoadingAllBill] = useState(false);
  const [currentSearch, setCurrentSearch] = useState();
  const search_status = useSelector(getSearchStatus);
  const search_bills = useSelector(getSearchBills);
  const update_payed_status = useSelector(getUpdatePayedStatus);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [detailBill, setDetailBill] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [billId, setBillId] = useState();

  const [isDetailBill, setIsDetailBill] = useState(false);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBill()).unwrap();
  }, []);

  const onFetchBill = async () => await dispatch(fetchBill()).unwrap();

  const onSearch = (value) => {
    if (value !== "") {
      setCurrentSearch(value);
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

  useEffect(() => {
    console.log(activeSortIndex);
    if (activeSortIndex) {
      dispatch(sortBill(activeSortIndex)).unwrap();
    }
  }, [activeSortIndex]);

  useEffect(() => {
    if (sort_bill_status == "loading") {
      setIsLoading(true);
    } else if (sort_bill_status == "succeeded") {
      setTimeout(() => {
        console.log(sort_bill);
        setBills(sort_bill);
        setIsLoading(false);
      }, 2000);
    } else if (sort_bill_status == "failed") {
      setIsLoading(false);
    }

    return () => dispatch(resetSortBillStatus());
  }, [sort_bill_status]);

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

  useEffect(() => {
    if (fetch_bill) {
      setBill(fetch_bill);
    }
  }, [fetch_bill]);

  const handleOpenDetailBill = (bill_id) => {
    setBillId(bill_id);
    setIsLoading(true);
    dispatch(fetchDetailBill(bill_id)).unwrap();
  };

  useEffect(() => {
    if (fetch_detail_bill?.length) {
      setDetailBill(fetch_detail_bill);
    }
  }, [fetch_detail_bill]);

  useEffect(() => {
    return () => {
      resetToast();
    };
  }, [isToggle]);

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

  const handleOutSearch = () => {
    setCurrentSearch();
    setIsLoadingAllBill(true);
    setTimeout(async () => {
      await dispatch(fetchBill()).unwrap();
      setIsLoadingAllBill(false);
      setIsSearch(false);
    }, 2000);
  };

  useEffect(() => {
    if (fetch_bills.length) {
      setBills(fetch_bills);
    }
  }, [fetch_bills]);

  const handleUpdateStatement = async (data) => {
    setIsLoading(true);
    await dispatch(updateStamentBill(data)).unwrap();
  };
  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  useEffect(() => {
    if (!currentSearch) {
      if (update_statement_status == "confirmed") {
        setTimeout(() => {
          onFetchBill();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Duyệt đơn hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "ship_success") {
        setTimeout(() => {
          onFetchBill();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Giao hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "canceled") {
        setTimeout(() => {
          onFetchBill();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Hủy đơn thành công",
          });
        }, 2000);
      } else if (update_statement_status == "failed") {
        setIsLoading(false);
      }
    } else {
      if (update_statement_status == "confirmed") {
        setTimeout(() => {
          onSearch(currentSearch);
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Duyệt đơn hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "ship_success") {
        setTimeout(() => {
          onSearch(currentSearch);
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Giao hàng thành công",
          });
        }, 2000);
      } else if (update_statement_status == "canceled") {
        setTimeout(() => {
          onSearch(currentSearch);
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Hủy đơn thành công",
          });
        }, 2000);
      } else if (update_statement_status == "failed") {
        setIsLoading(false);
      }
    }

    return () => {
      dispatch(resetUpdateStatement());
      resetToast();
    };
  }, [update_statement_status]);

  useEffect(() => {
    if (!currentSearch) {
      if (update_payed_status == "succeeded") {
        setTimeout(() => {
          onFetchBill();
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Xác nhận thanh toán thành công",
          });
        }, 2000);
      } else if (update_payed_status == "failed") {
        setTimeout(() => {
          setIsLoading(false);
          setIsToast({
            style: "error",
            value: true,
            body: "Xác nhận thanh toán thất bại",
          });
        }, 2000);
      }
    } else {
      if (update_payed_status == "succeeded") {
        setTimeout(() => {
          onSearch(currentSearch);
          setIsLoading(false);
          setIsToast({
            style: "success",
            value: true,
            body: "Xác nhận thanh toán thành công",
          });
        }, 2000);
      } else if (update_payed_status == "failed") {
        setTimeout(() => {
          setIsLoading(false);
          setIsToast({
            style: "error",
            value: true,
            body: "Xác nhận thanh toán thất bại",
          });
        }, 2000);
      }
    }

    return () => {
      dispatch(resetUpdatePayedStatus());
      resetToast();
    };
  }, [update_payed_status]);

  const handleUpdatePayed = (id) => {
    setIsLoading(true);
    dispatch(
      updatePayedBill({
        id: id,
      })
    ).unwrap();
  };

  const handleCloseDetailBill = () => {
    setIsDetailBill(false);
  };

  return {
    bills,
    handleUpdateStatement,
    isToast,
    isLoading,
    onSearch,
    isLoadingAllBill,
    isSearch,
    isLoadingSearch,
    handleOutSearch,
    handleUpdatePayed,
    handleOpenDetailBill,
    isDetailBill,
    detailBill,
    handleCloseDetailBill,
    billId,
    bill,
  };
}
