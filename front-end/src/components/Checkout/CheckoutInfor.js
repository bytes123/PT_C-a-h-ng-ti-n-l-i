import React from "react";
import useCart from "../../utils/hooks/useCart";
import useCheckout from "../../utils/hooks/useCheckout";
import { Input } from "antd";

export default function CheckoutInfor({ handleCheckout }) {
  const { cart } = useCart();

  const {
    checkoutCartPrice,
    checkoutCartSubPrice,
    shipPrice,
    billInfor = {},
    isChange,
    newBillInfor,
    handleCheckoutMethod,
    handleChange,
    handleCancelChange,
    handleChangeNewBillInfor,
    handleSaveNewBillInfor,
  } = useCheckout(cart);

  return (
    <div>
      <div className="p-8 mt-20">
        <div className="border-3 p-10 max-w-[700px] rounded-2xl mx-auto font-quicksand">
          <div className="text-2xl font-semibold mb-5">
            <div className="flex items-center justify-between">
              {isChange?.fullname ? (
                <>
                  <Input
                    name="fullname"
                    placeholder={"Nhập họ và tên"}
                    className="mr-10"
                    onChange={handleChangeNewBillInfor}
                  />
                  <button
                    className="edit-btn px-10 mr-5"
                    disabled={newBillInfor?.fullname ? false : true}
                    onClick={handleSaveNewBillInfor}
                  >
                    Lưu
                  </button>
                  <button
                    className="delete-btn px-10"
                    onClick={handleCancelChange}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <span>Người nhận: {billInfor?.fullname}</span>
                  <button
                    className="btn-primary"
                    onClick={() => handleChange("fullname")}
                  >
                    Thay đổi họ và tên
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="text-2xl font-semibold mb-5">
            <div className="flex items-center justify-between">
              {isChange?.phone_number ? (
                <>
                  <Input
                    name="phone_number"
                    type="number"
                    placeholder={"Nhập số điện thoại"}
                    className="mr-10"
                    onChange={handleChangeNewBillInfor}
                  />
                  <button
                    className="edit-btn px-10  mr-5"
                    disabled={newBillInfor?.phone_number ? false : true}
                    onClick={handleSaveNewBillInfor}
                  >
                    Lưu
                  </button>
                  <button
                    className="delete-btn px-10"
                    onClick={handleCancelChange}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <span>Số điện thoại: {billInfor?.phone_number}</span>
                  <button
                    className="btn-primary"
                    onClick={() => handleChange("phone_number")}
                  >
                    Thay đổi số điện thoại
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="text-2xl font-semibold mb-5">
            <div className="flex items-center justify-between">
              {isChange?.address ? (
                <>
                  <Input
                    name="address"
                    type="text"
                    placeholder={"Nhập địa chỉ"}
                    className="mr-10"
                    onChange={handleChangeNewBillInfor}
                  />
                  <button
                    className="edit-btn px-10  mr-5"
                    disabled={newBillInfor?.address ? false : true}
                    onClick={handleSaveNewBillInfor}
                  >
                    Lưu
                  </button>
                  <button
                    className="delete-btn px-10"
                    onClick={handleCancelChange}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <span>Địa chỉ: {billInfor?.address}</span>
                  <button
                    className="btn-primary"
                    onClick={() => handleChange("address")}
                  >
                    Thay đổi địa chỉ
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="text-2xl font-semibold mb-5">
            <div className="flex items-center justify-between">
              {isChange?.note ? (
                <>
                  <Input
                    name="note"
                    type="text"
                    placeholder={"Nhập ghi chú"}
                    className="mr-10"
                    onChange={handleChangeNewBillInfor}
                  />
                  <button
                    className="edit-btn px-10  mr-5"
                    disabled={newBillInfor?.note ? false : true}
                    onClick={handleSaveNewBillInfor}
                  >
                    Lưu
                  </button>
                  <button
                    className="delete-btn px-10"
                    onClick={handleCancelChange}
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <span>Ghi chú: {billInfor?.note}</span>
                  <button
                    className="btn-primary"
                    onClick={() => handleChange("note")}
                  >
                    Thay đổi ghi chú
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="border p-12 max-w-[700px] rounded-2xl mx-auto">
          <div className="border rounded-xl font-quicksand ">
            <div className=" flex justify-between p-5">
              <h4 className="text-3xl font-semibold opacity-70">Đơn giá</h4>
              <p className="text-4xl font-bold text-brand">
                {checkoutCartSubPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div className="border-t p-8">
              <div className="border"></div>
            </div>
            <div className=" flex justify-between border-t p-4">
              <h4 className="text-3xl font-semibold opacity-70">Tiền Ship</h4>
              <p className="text-4xl font-bold text-brand">
                {shipPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <div className="border-t p-8">
              <div className="border"></div>
            </div>
            <div className=" flex justify-between border-t py-4 px-10">
              <h4 className="text-3xl font-semibold opacity-70">Thành tiền</h4>
              <p className="text-4xl font-bold text-brand">
                {checkoutCartPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
          <h3 className="my-5 text-3xl font-quicksand font-semibold">
            Phương thức thanh toán
          </h3>
          <div className="border-1 rounded-xl mt-5 text-2xl font-medium font-quicksand">
            <div
              className="border-b-2 p-10 cursor-pointer"
              onClick={() => handleCheckoutMethod("COD")}
            >
              <input
                type="radio"
                name="COD"
                value="COD"
                checked={billInfor.checkout_method == "COD"}
              />
               <label>Thanh toán khi giao hàng (COD) </label>
            </div>
            <div
              className={`border-b-2 p-10 cursor-pointer`}
              onClick={() => handleCheckoutMethod("ATM")}
            >
              <div>
                <input
                  type="radio"
                  name="ATM"
                  value="ATM"
                  checked={billInfor.checkout_method == "ATM"}
                />
                 <label>Chuyển khoản qua ngân hàng </label>
              </div>

              {billInfor.checkout_method == "ATM" ? (
                <div className="p-5">
                  <p>* Quý khách vui lòng thanh toán qua tài khoản:</p>
                  <p>- Chủ tài khoản: Dao Tri Minh Tan</p>
                  <p>- Tài khoản số: 1234562792001</p>
                  <p>- Mở tại ngân hàng: Quân đội MB - CN Vĩnh Long</p>
                  <p>
                    * NV CSKH sẽ gọi điện thoại xác nhận với khách hàng sau khi
                    khách hàng đặt hàng.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className=" p-10 cursor-pointer"
              onClick={() => handleCheckoutMethod("PAYPAL")}
            >
              <input
                type="radio"
                name="PAYPAL"
                value="PAYPAL"
                checked={billInfor.checkout_method == "PAYPAL"}
              />
               <label>Thanh toán PAYPAL </label>
            </div>
          </div>
          <button
            onClick={() => handleCheckout(billInfor)}
            className="background-active text-white font-semibold text-3xl w-100 py-5 px-10 mt-10 rounded-lg flex justify-center items-center"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
