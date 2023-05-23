import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  RATE_URL,
  ADD_RATE_URL,
  SEARCH_RATE_URL,
  UPDATE_RATE_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  rates: [],
  errors: {},
  fetch_status: "",
  add_status: "",
  update_status: "",
  delete_status: "",
  search_rates: [],
  search_status: "",
  fetch_search_status: "",
};

export const fetchRates = createAsyncThunk("rate/all_rate", async () => {
  const response = await axios.get(RATE_URL);
  return response.data;
});

export const addRate = createAsyncThunk("rate/add", async (data) => {
  const response = await axios.post(ADD_RATE_URL, data);

  return response.data;
});

export const searchRate = createAsyncThunk("rate/search", async (value) => {
  const response = await axios.post(SEARCH_RATE_URL, {
    value: value,
  });

  return response.data;
});

export const updateStatement = createAsyncThunk("rate/update", async (data) => {
  const response = await axios.post(UPDATE_RATE_URL, data);

  return response.data;
});

const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    resetFetchStatus(state, action) {
      state.fetch_status = "";
    },
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
    resetSearchStatus(state, action) {
      state.search_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRates.pending, (state, action) => {
        state.fetch_status = "loading";
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.fetch_status = "succeeded";
        state.rates = action.payload;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.fetch_status = "failed";
        console.log("err");
      })
      .addCase(addRate.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addRate.fulfilled, (state, action) => {
        state.add_status = "succeeded";
      })
      .addCase(addRate.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(searchRate.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchRate.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_rates = action.payload;
      })
      .addCase(searchRate.rejected, (state, action) => {
        state.search_status = "failed";
        console.log(action.error);
      })
      .addCase(updateStatement.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateStatement.fulfilled, (state, action) => {
        state.update_status = "succeeded";
      })
      .addCase(updateStatement.rejected, (state, action) => {
        state.update_status = "failed";
        console.log(action.error);
      });
  },
});

export const getErrors = (state) => state.rate.errors;
export const getAddStatus = (state) => state.rate.add_status;
export const getUpdateStatus = (state) => state.rate.update_status;
export const getDeleteStatus = (state) => state.rate.delete_status;
export const getRates = (state) => state.rate.rates;
export const getFetchStatus = (state) => state.rate.fetch_status;
export const getSearchRates = (state) => state.rate.search_rates;
export const getSearchStatus = (state) => state.rate.search_status;
export const {
  resetFetchStatus,
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetSearchStatus,
} = rateSlice.actions;
export default rateSlice.reducer;
