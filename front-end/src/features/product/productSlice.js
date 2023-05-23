import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  PRODUCT_URL,
  ADD_PRODUCT_URL,
  UPDATE_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  SEARCH_PRODUCT_URL,
  TOP_PRODUCT_URL,
  PRODUCT_BY_ID_URL,
} from "../../static/API";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";

const initialState = {
  products: [],
  errors: {},
  add_status: "",
  update_status: "",
  delete_status: "",
  search_status: "",
  fetch_search_status: "",
  search_products: [],
  top_products: [],
  sellest_products: [],
  fetch_product_status: "",
  product: {},
  detail_products: [],
  rates: [],
};

export const fetchProducts = createAsyncThunk(
  "product/all_product",
  async () => {
    const response = await axios.get(PRODUCT_URL);
    return response.data;
  }
);

export const fetchTopProducts = createAsyncThunk(
  "product/top-products",
  async (data) => {
    const response = await axios.post(TOP_PRODUCT_URL, data);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/product-by-id",
  async (data) => {
    const response = await axios.post(PRODUCT_BY_ID_URL, data);
    return response.data;
  }
);

function removeVietnameseAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const addProduct = createAsyncThunk("product/add", async (data) => {
  const formData = new FormData();
  const id = uuidv1();
  const productId =
    id +
    "-" +
    removeVietnameseAccents(data.name.slice(-10)).replaceAll(" ", "-");
  data.id = productId;
  data?.images.length &&
    data.images.forEach((item) => {
      formData.append("images", item);
    });
  delete data.images;
  formData.append("data", JSON.stringify(data));
  const response = await axios({
    method: "post",
    url: ADD_PRODUCT_URL + "/" + productId,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

export const updateProduct = createAsyncThunk(
  "product/update",
  async (data) => {
    const formData = new FormData();

    data?.images?.length &&
      data.images.forEach((item, index) => {
        let filename = "";
        if (item?.name) {
          const id = uuidv1();
          const productId =
            id +
            "-" +
            removeVietnameseAccents(item.name.slice(-10)).replaceAll(" ", "-");
          filename = productId;
        }
        if (item?.default) {
          filename = item?.default;
        }

        if (filename !== "default.jpg") {
          const newFile = new File([item], filename, { type: item?.type });

          formData.append("images", newFile);
        }
        formData.append("new_images", filename);
      });
    delete data.images;
    formData.append("data", JSON.stringify(data));
    const response = await axios({
      method: "post",
      url: UPDATE_PRODUCT_URL + "/" + data.id,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const response = await axios.post(DELETE_PRODUCT_URL, id);

  return response.data;
});

export const searchProduct = createAsyncThunk(
  "product/search",
  async (value) => {
    const response = await axios.post(SEARCH_PRODUCT_URL, {
      value: value,
    });

    return response.data;
  }
);

export const fetchSearchProduct = createAsyncThunk(
  "product/fetch_search",
  async (value) => {
    const response = await axios.post(SEARCH_PRODUCT_URL, {
      value: value,
    });

    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
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
    resetFetchProductStatus(state, action) {
      state.fetch_product_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("err");
      })

      .addCase(fetchTopProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.type == "newest") {
          state.top_products = action.payload.products;
        }
        if (action.payload.type == "sellest") {
          state.sellest_products = action.payload.products;
        }
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(addProduct.pending, (state, action) => {
        state.add_status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        if (action.payload == "ADD_SUCCESS") {
          state.add_status = "succeeded";
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.add_status = "failed";
        console.log(action.error);
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.update_status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.update_status = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.update_status = "failed";
        console.log(action.error);
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.delete_status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.delete_status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.delete_status = "failed";
        console.log(action.error);
      })
      .addCase(searchProduct.pending, (state, action) => {
        state.search_status = "loading";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.search_status = "succeeded";
        state.search_products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.search_status = "failed";
      })
      .addCase(fetchSearchProduct.pending, (state, action) => {
        state.fetch_search_status = "loading";
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.fetch_search_status = "succeeded";
        state.search_products = action.payload;
      })
      .addCase(fetchSearchProduct.rejected, (state, action) => {
        state.fetch_search_status = "failed";
      })
      .addCase(fetchProductById.pending, (state, action) => {
        state.fetch_product_status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.fetch_product_status = "succeeded";
        state.product = action.payload.product;
        state.detail_products = action.payload.detail_products;
        state.rates = action.payload.rates;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.fetch_product_status = "failed";
      });
  },
});

export const getErrors = (state) => state.product.errors;
export const getAddStatus = (state) => state.product.add_status;
export const getUpdateStatus = (state) => state.product.update_status;
export const getDeleteStatus = (state) => state.product.delete_status;
export const getProducts = (state) => state.product.products;
export const getSearchStatus = (state) => state.product.search_status;
export const getSearchProducts = (state) => state.product.search_products;
export const getFetchSearchStatus = (state) =>
  state.product.fetch_search_status;
export const getTopProducts = (state) => state.product.top_products;
export const getSellestProducts = (state) => state.product.sellest_products;
export const getFetchProductStatus = (state) =>
  state.product.fetch_product_status;
export const getProduct = (state) => state.product.product;
export const getDetailProduct = (state) => state.product.detail_products;
export const getRates = (state) => state.product.rates;
export const {
  resetAddStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetAllErrors,
  resetError,
  resetSearchStatus,
} = productSlice.actions;
export default productSlice.reducer;
