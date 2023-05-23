import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BRANCH_URL } from "../../static/API";
import axios from "axios";

const initialState = {
  branches: [],
};

export const fetchBranch = createAsyncThunk("branch/all_branch", async () => {
  const response = await axios.get(BRANCH_URL);
  return response.data;
});

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBranch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBranch.fulfilled, (state, action) => {
        console.log(action.payload);
        state.branches = action.payload;
      })
      .addCase(fetchBranch.rejected, (state, action) => {
        console.log("err");
      });
  },
});

export const getBranch = (state) => state.branch.branches;
export const {} = branchSlice.actions;
export default branchSlice.reducer;
