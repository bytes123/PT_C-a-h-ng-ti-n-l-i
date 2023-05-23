import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_CART_URL, GET_CART_URL, UPDATE_CART_URL } from "../../static/API";
import axios from "axios";

const initialState = {
  cart: [],
  add_cart_status: "",
  update_cart_status: "",
};

export const updateCart = createAsyncThunk("cart/update", async (data) => {
  const response = await axios.post(UPDATE_CART_URL, data);
  return response.data;
});

export const addCart = createAsyncThunk("cart/add", async (data) => {
  const response = await axios.post(ADD_CART_URL, data);
  return response.data;
});

export const fetchCart = createAsyncThunk("cart/get", async (data) => {
  const response = await axios.post(GET_CART_URL, data);
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetAddCartStatus(state, action) {
      state.add_cart_status = "";
    },
    resetUpdateCartStatus(state, action) {
      state.update_cart_status = "";
    },
    addLocalCart(state, action) {
      console.log(action);
      state.cart = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addCart.pending, (state, action) => {
        state.add_cart_status = "loading";
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.add_cart_status = "succeeded";
        console.log("thành công");
      })
      .addCase(addCart.rejected, (state, action) => {
        state.add_cart_status = "failed";
      })
      .addCase(updateCart.pending, (state, action) => {
        state.update_cart_status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.update_cart_status = "succeeded";
        console.log("thành công");
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.update_cart_status = "failed";
      })
      .addCase(fetchCart.pending, (state, action) => {})
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        console.log("thành công");
      })
      .addCase(fetchCart.rejected, (state, action) => {});
  },
});

export const getCart = (state) => state.cart.cart;
export const getAddCartStatus = (state) => state.cart.add_cart_status;
export const getUpdateCartStatus = (state) => state.cart.update_cart_status;
export const { resetAddCartStatus, resetUpdateCartStatus, addLocalCart } =
  cartSlice.actions;
export default cartSlice.reducer;
