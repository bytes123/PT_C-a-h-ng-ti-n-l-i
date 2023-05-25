import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CATEGORY_URL,
  ADD_CATEGORY_URL,
  UPDATE_CATEGORY_URL,
  DELETE_CATEGORY_URL,
  CATEGORY_CHILDREN_URL,
  SEARCH_CATEGORY_URL,
} from "../../static/API";
import axios from "axios";

const initialState = {
  categories: [],
  category_children: [],
  errors: {},
  add_status: "",
  update_status: "",
  delete_status: "",
  search_status: "",
  fetch_search_status: "",
  search_category: [],
};

export const fetchCategory = createAsyncThunk(
  "category/all_category",
  async () => {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
  }
);

export const fetchCategoryAndChildren = createAsyncThunk(
  "category/category_childrens",
  async () => {
    const response = await axios.get(CATEGORY_CHILDREN_URL);
    return response.data;
  }
);

export const addCategory = createAsyncThunk("category/add", async (data) => {
  const response = await axios.post(ADD_CATEGORY_URL, data);

  return response.data;
});

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data) => {
    const response = await axios.post(UPDATE_CATEGORY_URL, data);

    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (data) => {
    const response = await axios.post(DELETE_CATEGORY_URL, data);

    return response.data;
  }
);

export const searchCategory = createAsyncThunk(
  "category/search",
  async (value) => {
    const response = await axios.post(SEARCH_CATEGORY_URL, {
      value: value,
    });

    return response.data;
  }
);

export const fetchSearchCategory = createAsyncThunk(
  "user/fetch_search",
  async (value) => {
    const response = await axios.post(SEARCH_CATEGORY_URL, {
      value: value,
    });

    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(addCategory.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          state.add_status = "failed";
        }

        if (action.payload == "ADD_SUCCESS") {
          state.add_status = "succeeded";
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload == "CATEGORY_EXISTS") {
          state.errors.name = "Tên danh mục đã tồn tại";
          console.log("lỗi");
          state.update_status = "failed";
        }

        if (action.payload == "UPDATE_SUCCESS") {
          state.update_status = "succeeded";
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.update_status = "failed";

        console.log(action.error);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.delete_status = "failed";
        console.log(action.error);
      })
      .addCase(fetchCategoryAndChildren.pending, (state, action) => {})
      .addCase(fetchCategoryAndChildren.fulfilled, (state, action) => {
        if (action.payload.length) {
          state.category_children = action.payload;
        }
      })
      .addCase(fetchCategoryAndChildren.rejected, (state, action) => {})
      .addCase(searchCategory.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_category = action.payload;
      })
      .addCase(searchCategory.rejected, (state, action) => {
        state.search_status = "failed";
      })
      .addCase(fetchSearchCategory.pending, (state, action) => {
        state.fetch_search_status = "loading";
      })
      .addCase(fetchSearchCategory.fulfilled, (state, action) => {
        state.fetch_search_status = "succeeded";
        state.search_category = action.payload;
      })
      .addCase(fetchSearchCategory.rejected, (state, action) => {
        state.fetch_search_status = "failed";
      });
  },
});

export const getErrors = (state) => state.category.errors;
export const getAddStatus = (state) => state.category.add_status;
export const getUpdateStatus = (state) => state.category.update_status;
export const getDeleteStatus = (state) => state.category.delete_status;
export const getCategories = (state) => state.category.categories;
export const getSearchStatus = (state) => state.category.search_status;
export const getSearchCategory = (state) => state.category.search_category;
export const getFetchSearchStatus = (state) =>
  state.category.fetch_search_status;
export const getCategoryAndChildren = (state) =>
  state.category.category_children;
export const {
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetError,
  resetSearchStatus,
} = categorySlice.actions;
export default categorySlice.reducer;
