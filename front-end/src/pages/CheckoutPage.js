import React, { useEffect } from "react";
import useCart from "../utils/hooks/useCart";
import useCheckout from "../utils/hooks/useCheckout";
import Spinner from "../utils/components/Spinner";
import { loginedUser } from "../utils/hooks/useAccessUser";
import CheckoutDetailBill from "../components/Checkout/CheckoutDetailBill";
import CheckoutInfor from "../components/Checkout/CheckoutInfor";
import CheckoutBill from "../components/Checkout/CheckoutBill";
import CheckoutCart from "../components/Checkout/CheckoutCart";
import Toast from "../utils/components/Toast";
import { useParams } from "react-router-dom";
export default function CheckoutPage() {
  const { cart } = useCart();
  const { select } = useParams();

  const {
    checkoutCart,
    isSuccessCheckout,
    handleCheckout,
    bill_infor,
    isLoading,
    detail_bill,
    isToast,
  } = useCheckout(cart);

  useEffect(() => {
    console.log(isSuccessCheckout);
  }, [isSuccessCheckout]);

  return (
    <div>
      <Toast
        position={isToast?.position}
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <Spinner isLoading={isLoading} />
      <div className="grid grid-cols-2">
        <div className="p-8 mt-20  lg:col-span-1 col-span-2">
          {isSuccessCheckout ? (
            <CheckoutDetailBill detail_bill={detail_bill} />
          ) : (
            <CheckoutCart
              checkoutCart={select == "check-all" ? cart : checkoutCart}
            />
          )}
        </div>
        <div className="lg:col-span-1 col-span-2">
          {isSuccessCheckout ? (
            <CheckoutBill bill_infor={bill_infor} />
          ) : (
            <CheckoutInfor handleCheckout={handleCheckout} />
          )}
        </div>
      </div>
    </div>
  );
}
