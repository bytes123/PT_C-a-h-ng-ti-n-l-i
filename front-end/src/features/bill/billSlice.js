import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_BILL_URL,
  UPDATE_STATEMENT_BILL_URL,
  SEARCH_BILL_URL,
  CHECKOUT_URL,
  GET_BILL_USER_NAME_URL,
  GET_DETAIL_BILL,
  UPDATE_PAYED_BILL_URL,
  SORT_BILL_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  bills: [],
  errors: {},
  search_status: "",
  fetch_bill_status: "",
  update_statement: "",
  update_payed_status: "",
  search_bills: [],
  search_status: "",
  checkout_status: "",
  bill_infor: "",
  bill: {},
  detail_bill: [],
  detail_bill_status: "",
  sort_bill: [],
  sort_bill_status: "",
};

export const fetchBill = createAsyncThunk("bill/get", async () => {
  const response = await axios.get(GET_BILL_URL);

  return response.data;
});

export const fetchBillByUserId = createAsyncThunk(
  "bill/get-user-bill",
  async (user_name) => {
    const response = await axios.post(GET_BILL_USER_NAME_URL, {
      user_name: user_name,
    });

    return response.data;
  }
);

export const fetchDetailBill = createAsyncThunk(
  "bill/get-detail_bill",
  async (bill_id) => {
    const response = await axios.post(GET_DETAIL_BILL, {
      bill_id: bill_id,
    });

    return response.data;
  }
);

export const sortBill = createAsyncThunk("bill/sort-bill", async (index) => {
  const response = await axios.post(SORT_BILL_URL, {
    index: index,
  });

  return response.data;
});

export const updateStamentBill = createAsyncThunk(
  "bill/update_statement",
  async (data) => {
    const response = await axios.post(UPDATE_STATEMENT_BILL_URL, data);

    return response.data;
  }
);

export const updatePayedBill = createAsyncThunk(
  "bill/update_payed",
  async (data) => {
    console.log(data);
    const response = await axios.post(UPDATE_PAYED_BILL_URL, data);

    return response.data;
  }
);

export const searchBill = createAsyncThunk("bill/search", async (value) => {
  const response = await axios.post(SEARCH_BILL_URL, {
    value: value,
  });

  return response.data;
});

export const checkout = createAsyncThunk("bill/checkout", async (data) => {
  const response = await axios.post(CHECKOUT_URL, data);

  return response.data;
});

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    resetAllErrors(state, action) {
      state.errors = {};
    },
    resetBillStatus(state, action) {
      state.fetch_bill_status = "";
    },
    resetUpdateStatement(state, action) {
      state.update_statement = "";
    },
    resetSearchStatus(state, action) {
      state.search_status = "";
    },
    resetCheckoutStatus(state, action) {
      state.checkout_status = "";
    },
    resetDetailBillStatus(state, action) {
      state.detail_bill_status = "";
    },
    resetUpdatePayedStatus(state, action) {
      state.update_payed_status = "";
    },
    resetSortBillStatus(state, action) {
      state.sort_bill_status = "";
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchBill.pending, (state, action) => {
        state.fetch_bill_status = "loading";
      })
      .addCase(fetchBill.fulfilled, (state, action) => {
        console.log(action.payload);
        state.fetch_bill_status = "succeeded";
        state.bills = action.payload;
      })
      .addCase(fetchBill.rejected, (state, action) => {
        state.sort_bill_status = "failed";
      })
      .addCase(sortBill.pending, (state, action) => {
        state.sort_bill_status = "loading";
      })
      .addCase(sortBill.fulfilled, (state, action) => {
        state.sort_bill_status = "succeeded";
        state.sort_bill = action.payload;
      })
      .addCase(sortBill.rejected, (state, action) => {
        state.sort_bill_status = "failed";
      })
      .addCase(updateStamentBill.pending, (state, action) => {})
      .addCase(updateStamentBill.fulfilled, (state, action) => {
        console.log(action.payload);
        state.update_statement = action.payload;
      })
      .addCase(updateStamentBill.rejected, (state, action) => {
        state.update_statement = "failed";
      })
      .addCase(updatePayedBill.pending, (state, action) => {
        state.update_payed_status = "pending";
      })
      .addCase(updatePayedBill.fulfilled, (state, action) => {
        state.update_payed_status = "succeeded";
      })
      .addCase(updatePayedBill.rejected, (state, action) => {
        state.update_payed_status = "failed";
      })

      .addCase(searchBill.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchBill.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_bills = action.payload;
      })
      .addCase(searchBill.rejected, (state, action) => {
        state.search_status = "failed";
      })
      .addCase(checkout.pending, (state, action) => {
        state.checkout_status = "loading";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkout_status = "succeeded";
        state.bill_infor = action.payload.bill;
        state.detail_bill = action.payload.detail_bill;
        console.log(action.payload);
      })
      .addCase(checkout.rejected, (state, action) => {
        state.checkout_status = "failed";
      })
      .addCase(fetchBillByUserId.pending, (state, action) => {})
      .addCase(fetchBillByUserId.fulfilled, (state, action) => {
        state.bills = action.payload;
      })
      .addCase(fetchBillByUserId.rejected, (state, action) => {})
      .addCase(fetchDetailBill.pending, (state, action) => {
        state.detail_bill_status = "loading";
      })
      .addCase(fetchDetailBill.fulfilled, (state, action) => {
        state.detail_bill = action.payload.detail_bill;
        state.bill = action.payload.bill;
        state.detail_bill_status = "succeeded";
      })
      .addCase(fetchDetailBill.rejected, (state, action) => {
        state.detail_bill_status = "failed";
      });
  },
});

export const getErrors = (state) => state.detail_product.errors;
export const getBills = (state) => state.bill.bills;
export const getUpdateStamentStatus = (state) => state.bill.update_statement;
export const getSearchBills = (state) => state.bill.search_bills;
export const getSearchStatus = (state) => state.bill.search_status;
export const getCheckoutStatus = (state) => state.bill.checkout_status;
export const getBillInfor = (state) => state.bill.bill_infor;
export const getDetailBill = (state) => state.bill.detail_bill;
export const getBill = (state) => state.bill.bill;
export const getDetailBillStatus = (state) => state.bill.detail_bill_status;
export const getUpdatePayedStatus = (state) => state.bill.update_payed_status;
export const getSortBillStatus = (state) => state.bill.sort_bill_status;
export const getSortBill = (state) => state.bill.sort_bill;

export const {
  resetError,
  resetBillStatus,
  resetUpdateStatement,
  resetSearchStatus,
  resetCheckoutStatus,
  resetDetailBillStatus,
  resetUpdatePayedStatus,
  resetSortBillStatus,
} = billSlice.actions;
export default billSlice.reducer;
