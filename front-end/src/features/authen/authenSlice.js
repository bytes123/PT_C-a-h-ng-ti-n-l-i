import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SIGNUP_URL,
  AUTH_URL,
  SIGNUP_STAFF_URL,
  UPDATE_ONLINE_URL,
} from "../../static/API";
import { useNavigate } from "react-router-dom";

const initialState = {
  message: "", // '' | 'Xác thực mail thành công' | 'Mã token không hợp lệ'
  status: "loading", // 'loading' | 'succeeded' | 'failed',
  errors: {
    user_name: "",
    email: "",
  },
  signup_status: "none",
};

export const updateOnline = createAsyncThunk(
  "auth/updateonline",
  async (data) => {
    const response = await axios.post(UPDATE_ONLINE_URL, data);
    return response.data;
  }
);

export const fetchAuthSignup = createAsyncThunk(
  "auth/authtokensignup",
  async (auth_token) => {
    const response = await axios.post(AUTH_URL, {
      auth_token: auth_token,
    });
    return response.data;
  }
);

export const signUpRequest = createAsyncThunk("auth/signup", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  delete data.avatar;
  formData.append("data", JSON.stringify(data));
  const response = await axios({
    method: "post",
    url: SIGNUP_URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

export const addStaff = createAsyncThunk("auth/addstaff", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  delete data.avatar;
  formData.append("data", JSON.stringify(data));
  const response = await axios({
    method: "post",
    url: SIGNUP_STAFF_URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

const authenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignUpStatus(state, action) {
      state.signup_status = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthSignup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAuthSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = "Xác thực mail thành công";
        console.log(action.payload);
      })
      .addCase(fetchAuthSignup.rejected, (state, action) => {
        state.status = "failed";
        state.message = "Mã token không hợp lệ";
      })
      .addCase(signUpRequest.fulfilled, (state, action) => {
        state.errors.user_name = "";
        state.errors.email = "";
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("SIGNUP_SUCCESS")) {
          state.errors.user_name = "";
          state.errors.email = "";
          alert("Vui lòng xác nhận mail để tiếp tục đăng nhập");
          state.signup_status = "succeeded";
        }

        // if (action.payload == "USER_EXISTS") {
        //   state.errors.user_name = "Tài khoản đã tồn tại";
        //   state.signup_status = "failed";
        // } else if(action.payload == "SIGNUP_SUCCESS") {
        //   state.errors.user_name = "";
        //   state.signup_status = "succeeded";
        // }
      })
      .addCase(signUpRequest.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.errors.user_name = "";
        state.errors.email = "";
        console.log(action.payload);
        if (action.payload.includes("USER_EXISTS")) {
          state.errors.user_name = "Tài khoản đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("EMAIL_EXISTS")) {
          state.errors.email = "Email đã tồn tại";
          state.signup_status = "failed";
        }

        if (action.payload.includes("SIGNUP_SUCCESS")) {
          state.errors.user_name = "";
          state.errors.email = "";
          state.signup_status = "succeeded";
        }
      })
      .addCase(addStaff.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateOnline.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateOnline.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const getMessage = (state) => state.auth.message;
export const getStatus = (state) => state.auth.status;
export const getErrors = (state) => state.auth.errors;
export const getSignUpStatus = (state) => state.auth.signup_status;

export const { resetSignUpStatus } = authenSlice.actions;

export default authenSlice.reducer;
