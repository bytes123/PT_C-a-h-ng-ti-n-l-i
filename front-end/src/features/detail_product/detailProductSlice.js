import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DETAIL_PRODUCT_URL,
  ADD_DETAIL_PRODUCT_URL,
  UPDATE_DETAIL_PRODUCT_URL,
  DELETE_DETAIL_PRODUCT_URL,
  SEARCH_DETAIL_PRODUCT_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  detail_products: [],
  errors: {},
  add_status: "",
  update_status: "",
  delete_status: "",
  search_status: "",
  fetch_search_status: "",
  search_detail_products: [],
};

export const fetchDetailProducts = createAsyncThunk(
  "detail_product/all_detail_product",
  async () => {
    const response = await axios.get(DETAIL_PRODUCT_URL);
    return response.data;
  }
);

export const addDetailProduct = createAsyncThunk(
  "detail_product/add",
  async (data) => {
    const response = await axios.post(ADD_DETAIL_PRODUCT_URL, data);
    return response.data;
  }
);

export const updateDetailProduct = createAsyncThunk(
  "detail_product/update",
  async (data) => {
    const response = await axios.post(UPDATE_DETAIL_PRODUCT_URL, data);
    return response.data;
  }
);

export const deleteDetailProduct = createAsyncThunk(
  "detail_product/delete",
  async (id) => {
    const response = await axios.post(DELETE_DETAIL_PRODUCT_URL, id);

    return response.data;
  }
);

export const searchDetailProduct = createAsyncThunk(
  "detail_product/search",
  async (value) => {
    const response = await axios.post(SEARCH_DETAIL_PRODUCT_URL, {
      value: value,
    });

    return response.data;
  }
);

export const fetchSearchDetailProduct = createAsyncThunk(
  "detail_product/fetch_search",
  async (value) => {
    const response = await axios.post(SEARCH_DETAIL_PRODUCT_URL, {
      value: value,
    });

    return response.data;
  }
);

const detailProductSlice = createSlice({
  name: "detail_product",
  initialState,
  reducers: {
    resetAddStatus(state, action) {
      state.add_status = "";
    },
    resetUpdateStatus(state, action) {
      state.update_status = "";
    },
    resetDeleteStatus(state, action) {
      state.delete_status = "";
    },
    resetAllErrors(state, action) {
      state.errors = {};
    },
    resetError(state, action) {
      delete state.errors[action.payload];
    },
    resetSearchStatus(state, action) {
      state.search_status = "";
    },
    resetSearchDetailProduct(state, action) {
      state.search_detail_products = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDetailProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProducts.fulfilled, (state, action) => {
        state.detail_products = action.payload;
      })
      .addCase(fetchDetailProducts.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(addDetailProduct.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addDetailProduct.fulfilled, (state, action) => {
        if (action.payload == "ADD_SUCCESS") {
          state.add_status = "succeeded";
        }
      })
      .addCase(addDetailProduct.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(updateDetailProduct.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateDetailProduct.fulfilled, (state, action) => {
        state.update_status = "succeeded";
      })
      .addCase(updateDetailProduct.rejected, (state, action) => {
        state.update_status = "failed";
        console.log(action.error);
      })
      .addCase(deleteDetailProduct.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteDetailProduct.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteDetailProduct.rejected, (state, action) => {
        state.delete_status = "failed";
        console.log(action.error);
      })
      .addCase(searchDetailProduct.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchDetailProduct.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_detail_products = action.payload;
      })
      .addCase(searchDetailProduct.rejected, (state, action) => {
        state.search_status = "failed";
      })
      .addCase(fetchSearchDetailProduct.pending, (state, action) => {
        state.fetch_search_status = "loading";
      })
      .addCase(fetchSearchDetailProduct.fulfilled, (state, action) => {
        state.fetch_search_status = "succeeded";
        state.search_detail_products = action.payload;
      })
      .addCase(fetchSearchDetailProduct.rejected, (state, action) => {
        state.fetch_search_status = "failed";
      });
  },
});

export const getErrors = (state) => state.detail_product.errors;
export const getAddStatus = (state) => state.detail_product.add_status;
export const getUpdateStatus = (state) => state.detail_product.update_status;
export const getDeleteStatus = (state) => state.detail_product.delete_status;
export const getDetailProducts = (state) =>
  state.detail_product.detail_products;
export const getSearchStatus = (state) => state.detail_product.search_status;
export const getSearchDetailProducts = (state) =>
  state.detail_product.search_detail_products;
export const getFetchSearchStatus = (state) =>
  state.detail_product.fetch_search_status;

export const {
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetError,
  resetSearchStatus,
  resetSearchDetailProduct,
} = detailProductSlice.actions;
export default detailProductSlice.reducer;
