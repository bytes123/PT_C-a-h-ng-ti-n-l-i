import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loginedUser } from "./useAccessUser";
import {
  checkout,
  getCheckoutStatus,
  getBillInfor,
  resetCheckoutStatus,
  getDetailBill,
} from "../../features/bill/billSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useCheckout(cart) {
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [checkoutCartPrice, setCheckoutCartPrice] = useState(0);
  const [checkoutCartSubPrice, setCheckoutCartSubPrice] = useState(0);
  const [shipPrice, setShipPrice] = useState(30000);
  const location = useLocation();
  const dispatch = useDispatch();
  const [billInfor, setBillInfor] = useState({
    checkout_method: "COD",
  });
  const [isSuccessCheckout, setIsSuccessCheckout] = useState(false);
  const checkout_status = useSelector(getCheckoutStatus);
  const bill_infor = useSelector(getBillInfor);
  const detail_bill = useSelector(getDetailBill);
  const [newBillInfor, setNewBillInfor] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [isChange, setIsChange] = useState();
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
  useEffect(() => {
    if (checkout_status == "succeeded") {
      setTimeout(() => {
        setIsloading(false);
        setIsSuccessCheckout(true);
      }, 2000);
    } else if (checkout_status == "loading") {
      setIsloading(true);
    } else if (checkout_status == "failed") {
      setIsloading(false);
    }

    return () => {
      dispatch(resetCheckoutStatus());
    };
  }, [checkout_status]);

  useEffect(() => {
    return () => {
      setIsSuccessCheckout(false);
    };
  }, [location]);

  useEffect(() => {
    if (loginedUser) {
      setBillInfor({
        ...billInfor,
        user_name: loginedUser.user_name,
        phone_number: loginedUser.phone_number,
        fullname: loginedUser.fullname,
        address:
          loginedUser.address +
          "," +
          loginedUser.ward_name +
          "," +
          loginedUser.district_name +
          "," +
          loginedUser.province_name,
      });
    } else {
      setBillInfor({
        ...billInfor,
        user_name: null,
        phone_number: "",
        fullname: "",
        address: "",
      });
    }
  }, [loginedUser]);

  useEffect(() => {
    if (cart?.length) {
      setCheckoutCart(cart.filter((item) => item?.checked));
    }
  }, [cart, location]);

  useEffect(() => {
    if (checkoutCart.length) {
      let checkoutCartPrice = checkoutCart.reduce(
        (init, item) => init + item.quantity * item.newPrice,
        0
      );
      setBillInfor({
        ...billInfor,
        bill_price: checkoutCartPrice + shipPrice,
      });
      setCheckoutCartSubPrice(checkoutCartPrice);
      setCheckoutCartPrice(checkoutCartPrice + shipPrice);
    }
  }, [checkoutCart]);

  const handleCheckoutMethod = (value) => {
    setBillInfor({
      ...billInfor,
      checkout_method: value,
    });
  };

  const handleChange = (name) => {
    setNewBillInfor();
    setIsChange({
      [name]: name,
    });
  };

  const handleCancelChange = () => {
    setNewBillInfor();
    setIsChange();
  };

  const handleChangeNewBillInfor = (e) => {
    setNewBillInfor({
      ...newBillInfor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveNewBillInfor = () => {
    setIsChange();
    setBillInfor({
      ...billInfor,
      ...newBillInfor,
    });
  };

  useEffect(() => {
    console.log(billInfor);
  }, [billInfor]);

  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    return () => resetToast();
  }, [isReset]);

  const handleCheckout = (bill) => {
    if (!checkoutCart.length) {
      setIsToast({
        position: "top-center",
        style: "failed",
        value: true,
        body: "Giỏ hàng rỗng!",
      });
    } else if (!bill.fullname.trim() || !bill.phone_number || !bill.address) {
      setIsReset(!isReset);
      setIsToast({
        position: "top-center",
        style: "failed",
        value: true,
        body: "Vui lòng nhập đầy đủ thông tin cá nhân",
      });
    } else {
      console.log(checkoutCart);
      dispatch(
        checkout({
          bill: bill,
          detail_bill: checkoutCart,
        })
      ).unwrap();
    }
  };

  return {
    checkoutCart,
    checkoutCartPrice,
    checkoutCartSubPrice,
    shipPrice,
    billInfor,
    loginedUser,
    billInfor,
    handleCheckoutMethod,
    handleChange,
    isChange,
    handleCancelChange,
    handleChangeNewBillInfor,
    newBillInfor,
    handleSaveNewBillInfor,
    handleCheckout,
    isSuccessCheckout,
    bill_infor,
    isLoading,
    detail_bill,
    isToast,
  };
}
