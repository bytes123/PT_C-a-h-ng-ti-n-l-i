import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "../features/authen/authenSlice";
import userSlice from "../features/user/userSlice";
import messageSlice from "../features/message/messageSlice";
import categorySlice from "../features/category/categorySlice";
import productSlice from "../features/product/productSlice";
import brandSlice from "../features/brand/brandSlice";
import zoneSlice from "../features/zone/zoneSlice";
import detailProductSlice from "../features/detail_product/detailProductSlice";
import storageSlice from "../features/storage/storageSlice";
import branchSlice from "../features/branch/branchSlice";
import cartSlice from "../features/cart/cartSlice";
import billSlice from "../features/bill/billSlice";
import rateSlice from "../features/rate/rateSlice";

export const store = configureStore({
  reducer: {
    auth: authenSlice,
    user: userSlice,
    message: messageSlice,
    category: categorySlice,
    product: productSlice,
    brand: brandSlice,
    zone: zoneSlice,
    detail_product: detailProductSlice,
    storage: storageSlice,
    branch: branchSlice,
    cart: cartSlice,
    bill: billSlice,
    rate: rateSlice,
  },
});
