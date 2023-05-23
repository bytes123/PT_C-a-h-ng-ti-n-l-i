import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STORAGE_URL } from "../../static/API";
import axios from "axios";

const initialState = {
  storages: [],
};

export const fetchStorage = createAsyncThunk(
  "storage/all_storage",
  async () => {
    const response = await axios.get(STORAGE_URL);
    return response.data;
  }
);

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStorage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStorage.fulfilled, (state, action) => {
        console.log(action.payload);
        state.storages = action.payload;
      })
      .addCase(fetchStorage.rejected, (state, action) => {
        console.log("err");
      });
  },
});

export const getStorage = (state) => state.storage.storages;
export const {} = storageSlice.actions;
export default storageSlice.reducer;
