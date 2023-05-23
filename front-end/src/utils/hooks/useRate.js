import React, { useState, useEffect } from "react";
import {
  fetchRates,
  getFetchStatus,
  getRates,
  addRate,
  getAddStatus,
  resetAddStatus,
} from "../../features/rate/rateSlice";
import { fetchDetailBill } from "../../features/bill/billSlice";
import { loginedUser } from "./useAccessUser";
import { useDispatch, useSelector } from "react-redux";
export default function useRate() {
  const [isOpenRate, setIsOpenRate] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const [activeStar, setActiveStar] = useState(null);
  const [form, setForm] = useState({
    author: "",
    content: "",
  });
  const [isOpenRateForm, setIsOpenRateForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });
  const fetch_status = useSelector(getFetchStatus);
  const fetch_rates = useSelector(getRates);
  const add_status = useSelector(getAddStatus);

  const dispatch = useDispatch();

  const handleOpenRate = (item) => {
    setActiveItem(item);
    setIsOpenRate(true);
  };

  useEffect(() => {
    if (add_status == "loading") {
    } else if (add_status == "succeeded") {
      dispatch(fetchDetailBill(activeItem.bill_id)).unwrap();
      setIsToast({
        style: "success",
        value: true,
        body: "Đánh giá thành công & hãy chờ admin xét duyệt",
      });
    }

    return () => {
      setIsOpenRate(false);
      setIsToast({
        style: "",
        value: false,
        body: "",
      });
    };
  }, [add_status]);

  useEffect(() => {
    dispatch(resetAddStatus());
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenRateForm = (star) => {
    setIsOpenRateForm(true);
    setActiveStar(star);
  };

  const handleCloseRate = () => {
    setIsOpenRate(false);
  };

  useEffect(() => {
    console.log(isOpenRate);
  }, [isOpenRate]);

  const [reset, setReset] = useState(false);

  const handleSubmit = () => {
    if (!loginedUser) {
      return setErrors({
        ...errors,
        content: "Vui lòng đăng nhập để đánh giá",
      });
    }
    if (!form.author.trim().length || !form.content.trim().length) {
      setErrors({
        ...errors,
        form: "Vui lòng nhập đầy đủ thông tin",
      });
      setReset(!reset);
    } else {
      let data;
      loginedUser
        ? (data = {
            rate: {
              user_name: loginedUser.user_name,
              author: form.author,
              detail_bill_id: activeItem.detail_bill_id,
              detail_product_id: activeItem.detail_product_id,
              starpoint: activeStar,
              content: form.content,
              statement: "pending",
            },
          })
        : (data = {
            rate: {
              author: form.author,
              detail_bill_id: activeItem.detail_bill_id,
              detail_product_id: activeItem.detail_product_id,
              starpoint: activeStar,
              content: form.content,
              statement: "pending",
            },
          });
      dispatch(addRate(data));
    }
    console.log(activeItem);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsToast({
        style: "failed",
        value: true,
        body: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    return () =>
      setIsToast({
        style: "",
        value: false,
        body: "",
      });
  }, [errors]);

  useEffect(() => {
    return () => {
      setErrors({});
    };
  }, [reset]);

  useEffect(() => {
    return () => {
      setForm({
        author: "",
        content: "",
      });
      setActiveStar(null);
      setIsOpenRateForm(false);
    };
  }, [isOpenRate]);

  return {
    isOpenRate,
    handleOpenRate,
    activeItem,
    handleCloseRate,
    activeStar,
    handleOpenRateForm,
    handleChange,
    handleSubmit,
    form,
    isOpenRateForm,
    isToast,
  };
}
