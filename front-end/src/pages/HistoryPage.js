import React, { useState } from "react";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useHistoryBill from "../utils/hooks/useHistoryBill";
import DetailBill from "../components/HistoryBill/DetailBill";
import MainBill from "../components/HistoryBill/MainBill";
import Toast from "../utils/components/Toast";
import { Button, Input } from "antd";
export default function HistoryPage() {
  const { Search } = Input;

  const {
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
    isSearch,
    isLoadingAllBill,
    handleOutSearch,
  } = useHistoryBill();

  return (
    <div className="bill_history-wrapper">
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <div className="container">
        {isDetailBill ? (
          <DetailBill
            handleUpdateStatement={handleUpdateStatement}
            bill={bill}
            detailBill={detailBill}
            billId={billId}
            handleCloseDetailBill={handleCloseDetailBill}
          />
        ) : (
          <>
            <div>
              <Search
                className="w-[800px]  my-5 "
                placeholder="Nhập mã đơn hàng hoặc số điện thoại để tìm kiếm"
                enterButton="Tìm kiếm"
                size="large"
                onSearch={onSearch}
                loading={isLoadingSearch}
              />
              {isSearch ? (
                <div>
                  <Button
                    className="mb-5"
                    type="primary"
                    danger
                    loading={isLoadingAllBill}
                    onClick={!isLoadingAllBill && handleOutSearch}
                  >
                    Quay lại tất cả
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <MainBill
              bills={bills}
              handleOpenDetailBill={handleOpenDetailBill}
            />
          </>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
