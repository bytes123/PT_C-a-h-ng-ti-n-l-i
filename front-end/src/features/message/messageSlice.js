import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  MSG_BY_ROOM_URL,
  MSG_LIST_BY_USER_URL,
  CONTACT_USER_URL,
  CUSTOMER_ROOM_URL,
  MSG_LIST_ALL,
  DROP_ROOM_URL,
} from "../../static/API";
import { useNavigate } from "react-router-dom";
import { loginedUser } from "../../utils/hooks/useAccessUser";

const initialState = {
  messages: "",
  chat_list: [],
  contact_user: "",
  status: "loading", // 'loading' | 'succeeded' | 'failed',
};

export const dropRoom = createAsyncThunk(
  "message/dropRoom",
  async (room_id) => {
    const response = await axios.post(DROP_ROOM_URL, {
      room_id: room_id,
    });
    return response.data;
  }
);

export const createCustomerRoom = createAsyncThunk(
  "message/createCustomerRoom",
  async () => {
    const response = await axios.post(CUSTOMER_ROOM_URL, {
      room_name: "chat-room-" + loginedUser.user_name + "-admin",
      participant: loginedUser.user_name,
    });
    return response.data;
  }
);

export const fetchMessagesByRoom = createAsyncThunk(
  "message/messageByRoom",
  async (room_id) => {
    const response = await axios.post(MSG_BY_ROOM_URL, {
      room_id: room_id,
    });
    return response.data;
  }
);

export const fetchMessageListByUser = createAsyncThunk(
  "message/messageListByUser",
  async (user_name) => {
    const response = await axios.post(MSG_LIST_BY_USER_URL, {
      user_name: user_name,
    });
    return response.data;
  }
);

export const fetchMessageListAll = createAsyncThunk(
  "message/messageListAll",
  async () => {
    const response = await axios.get(MSG_LIST_ALL);
    return response.data;
  }
);

export const fetchContactUser = createAsyncThunk(
  "message/contactUser",
  async (data) => {
    const response = await axios.post(CONTACT_USER_URL, data);

    return response.data;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMessagesByRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMessagesByRoom.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchMessagesByRoom.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(fetchMessageListByUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMessageListByUser.fulfilled, (state, action) => {
        state.chat_list = action.payload;
      })
      .addCase(fetchMessageListByUser.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(fetchContactUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchContactUser.fulfilled, (state, action) => {
        state.contact_user = action.payload[0];
        console.log(action.payload[0]);
      })
      .addCase(fetchContactUser.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(createCustomerRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createCustomerRoom.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(createCustomerRoom.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(fetchMessageListAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMessageListAll.fulfilled, (state, action) => {
        console.log(action.payload);
        state.chat_list = action.payload;
      })
      .addCase(fetchMessageListAll.rejected, (state, action) => {
        console.log("err");
      })
      .addCase(dropRoom.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(dropRoom.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(dropRoom.rejected, (state, action) => {
        console.log("err");
      });
  },
});

export const getMessages = (state) => state.message.messages;
export const getStatus = (state) => state.message.status;
export const getChatList = (state) => state.message.chat_list;
export const getContactUser = (state) => state.message.contact_user;
export default messageSlice.reducer;
